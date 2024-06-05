document.addEventListener("DOMContentLoaded", function() {
    const profileIcon = document.getElementById('profile-icon');
    const sidebar = document.getElementById('sidebar');
    const closeSidebar = document.getElementById('close-sidebar');
    const overlay = document.getElementById('overlay');
    const userProfile = document.getElementById('userProfile');
    const recyclingForm = document.getElementById('recyclingForm');
    const entriesList = document.getElementById('entries');

    function setupSidebar() {
        if (profileIcon && sidebar && closeSidebar && overlay) {
            profileIcon.addEventListener('click', () => {
                sidebar.classList.toggle('active');
                overlay.style.display = 'block';
            });

            closeSidebar.addEventListener('click', () => {
                sidebar.classList.remove('active');
                overlay.style.display = 'none';
            });

            overlay.addEventListener('click', () => {
                sidebar.classList.remove('active');
                overlay.style.display = 'none';
            });
        } else {
            console.error('One or more sidebar elements are missing.');
        }
    }

    function setupUserInfoAndLogout() {
        const token = sessionStorage.getItem('authToken');
        if (!token) {
            window.location.href = '../index.html'; // Redirect to login if no token is found
            return;
        }

        fetch('http://localhost:3000/api/auth/details', {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error('Error:', data.error);
                alert('Error fetching data. Please try again.');
                sessionStorage.removeItem('authToken');
                window.location.href = '../index.html';
            } else {
                userProfile.innerHTML = `
                    <p><strong>Name:</strong> ${data.firstname} ${data.lastname}</p>
                    <p><strong>Email:</strong> ${data.email}</p>
                    <p><strong>Address:</strong> ${data.address}</p>
                `;
            }
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
            alert('Error fetching data. Please try again.');
        });

        document.getElementById('logout').addEventListener('click', function() {
            sessionStorage.removeItem('authToken');
            window.location.href = '../index.html';
        });
    }

    function fetchRecyclingEntries() {
        const token = sessionStorage.getItem('authToken');
        if (!token) {
            window.location.href = '../index.html'; // Redirect to login if no token is found
            return;
        }

        fetch('http://localhost:3000/api/recycling', {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error('Error:', data.error);
                alert('Error fetching recycling entries. Please try again.');
            } else {
                entriesList.innerHTML = data.map(entry => `
                    <li>${entry.date} - ${entry.material} - ${entry.amount} kg</li>
                `).join('');
            }
        })
        .catch(error => {
            console.error('Error fetching recycling entries:', error);
            alert('Error fetching recycling entries. Please try again.');
        });
    }

    recyclingForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(recyclingForm);
        const data = {
            date: formData.get('date'),
            material: formData.get('material'),
            amount: formData.get('amount')
        };

        const token = sessionStorage.getItem('authToken');
        if (!token) {
            window.location.href = '../index.html'; // Redirect to login if no token is found
            return;
        }

        fetch('http://localhost:3000/api/recycling', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error('Error:', data.error);
                alert('Error logging recycling activity. Please try again.');
            } else {
                alert('Recycling activity logged successfully!');
                fetchRecyclingEntries(); // Refresh the list of recycling entries
            }
        })
        .catch(error => {
            console.error('Error logging recycling activity:', error);
            alert('Error logging recycling activity. Please try again.');
        });
    });

    setupSidebar();
    setupUserInfoAndLogout();
    fetchRecyclingEntries();
});
