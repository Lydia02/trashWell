document.addEventListener("DOMContentLoaded", function() {
    const profileIcon = document.getElementById('profile-icon');
    const sidebar = document.getElementById('sidebar');
    const closeSidebar = document.getElementById('close-sidebar');
    const overlay = document.getElementById('overlay');
    const userProfile = document.getElementById('userProfile');
    const scheduleForm = document.getElementById('scheduleForm');
    const collectionsList = document.getElementById('collections');

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

    function fetchSchedules() {
        const token = sessionStorage.getItem('authToken');
        if (!token) {
            window.location.href = '../index.html'; // Redirect to login if no token is found
            return;
        }

        fetch('http://localhost:3000/api/schedules', {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error('Error:', data.error);
                alert('Error fetching schedules. Please try again.');
            } else {
                collectionsList.innerHTML = data.map(collection => `
                    <li>${collection.date} at ${collection.time}</li>
                `).join('');
            }
        })
        .catch(error => {
            console.error('Error fetching schedules:', error);
            alert('Error fetching schedules. Please try again.');
        });
    }

    scheduleForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(scheduleForm);
        const data = {
            date: formData.get('date'),
            time: formData.get('time')
        };

        const token = sessionStorage.getItem('authToken');
        if (!token) {
            window.location.href = '../index.html'; // Redirect to login if no token is found
            return;
        }

        fetch('http://localhost:3000/api/schedules', {
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
                alert('Error scheduling collection. Please try again.');
            } else {
                alert('Collection scheduled successfully!');
                fetchSchedules(); // Refresh the list of schedules
            }
        })
        .catch(error => {
            console.error('Error scheduling collection:', error);
            alert('Error scheduling collection. Please try again.');
        });
    });

    setupSidebar();
    setupUserInfoAndLogout();
    fetchSchedules();
});
