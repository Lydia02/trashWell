document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('error-message');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const email = loginForm.email.value;
        const password = loginForm.password.value;

        fetch('https://trashwell-1.onrender.com/api/adminauth/login', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                errorMessage.textContent = data.error;
            } else {
                sessionStorage.setItem('authToken', data.token);
                window.location.href = 'index.html';
            }
        })
        .catch(error => {
            console.error('Error logging in:', error);
            errorMessage.textContent = 'An error occurred. Please try again.';
        });
    });
});
