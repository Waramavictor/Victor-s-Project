

function collectCustomerInfoAndSendNotification(foodName) {

    const username = document.getElementById('inlineFormInputGroupUsername').value;
    const preference = document.getElementById('inlineFormSelectPref').value;
    const rememberMe = document.getElementById('inlineFormCheck').checked;

    
    const data = {
        foodName: foodName,
        username: username,
        preference: preference,
        rememberMe: rememberMe
    };

    fetch('https://localhost:3000/sendNotification', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to send notification');
        }
        return response.json();
    })
    .then(responseData => {
    
        console.log('Notification sent successfully:', responseData);
        alert('Notification sent successfully!');
    })
    .catch(error => {
        
        console.error('Error sending notification:', error);
        alert('Failed to send notification. Please try again later.');
    });
}


function handleOrderButtonClick() {
    const foodName = this.dataset.food;
    
    collectCustomerInfoAndSendNotification(foodName);
}


function handleDeleteButtonClick() {
    const foodName = this.dataset.food;
    const confirmDelete = confirm(`Are you sure you want to delete ${foodName} from your order?`);
    if (confirmDelete) {
        this.parentElement.remove();
        alert(`${foodName} removed from your order.`);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    
    const orderButtons = document.querySelectorAll('.order-btn');
    orderButtons.forEach(button => {
        button.addEventListener('click', handleOrderButtonClick);
    });


    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', handleDeleteButtonClick);
    });
});
