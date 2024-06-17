document.addEventListener("DOMContentLoaded", function() {
    const profileIcon = document.getElementById('profile-icon');
    const sidebar = document.getElementById('sidebar');
    const closeSidebar = document.getElementById('close-sidebar');
    const overlay = document.getElementById('overlay');
    const userProfile = document.getElementById('userProfile');
    const scheduleForm = document.getElementById('scheduleForm');
    const collectionsTable = document.getElementById('collections');
    let currentEditId = null;

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

        fetch('https://trashwell-1.onrender.com/api/auth/details', {
            method: 'GET',
            hheaders: {
                'Content-Type': 'application/json'
            },
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

        fetch('https://trashwell-1.onrender.com/api/schedules', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error('Error:', data.error);
                alert('Error fetching schedules. Please try again.');
            } else {
                collectionsTable.innerHTML = data.map(collection => `
                    <tr>
                        <td>${collection.date}</td>
                        <td>${collection.time}</td>
                        <td>
                            <button class="edit-btn" data-id="${collection.id}" data-date="${collection.date}" data-time="${collection.time}">Edit</button>
                            <button class="delete-btn" data-id="${collection.id}">Delete</button>
                        </td>
                    </tr>
                `).join('');
                setupEditAndDeleteButtons();
            }
        })
        .catch(error => {
            console.error('Error fetching schedules:', error);
            alert('Error fetching schedules. Please try again.');
        });
    }

    function setupEditAndDeleteButtons() {
        document.querySelectorAll('.edit-btn').forEach(button => {
            button.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                const date = this.getAttribute('data-date');
                const time = this.getAttribute('data-time');

                // Populate form with existing data
                document.getElementById('date').value = date;
                document.getElementById('time').value = time;
                currentEditId = id;

                // Update the form submission to handle updates
                scheduleForm.removeEventListener('submit', createSchedule);
                scheduleForm.addEventListener('submit', updateSchedule);
            });
        });

        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                deleteSchedule(id);
            });
        });
    }

    function createSchedule(event) {
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

        fetch('https://trashwell-1.onrender.com/api/schedules', {
            method: 'POST',
            headers: {
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
                scheduleForm.reset();
            }
        })
        .catch(error => {
            console.error('Error scheduling collection:', error);
            alert('Error scheduling collection. Please try again.');
        });
    }

    function updateSchedule(event) {
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

        fetch(`https://trashwell-1.onrender.com/api/schedules/${currentEditId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error('Error:', data.error);
                alert('Error updating schedule. Please try again.');
            } else {
                alert('Schedule updated successfully!');
                scheduleForm.removeEventListener('submit', updateSchedule);
                scheduleForm.addEventListener('submit', createSchedule);
                fetchSchedules(); // Refresh the list of schedules
                scheduleForm.reset();
                currentEditId = null;
            }
        })
        .catch(error => {
            console.error('Error updating schedule:', error);
            alert('Error updating schedule. Please try again.');
        });
    }

    function deleteSchedule(id) {
        const token = sessionStorage.getItem('authToken');
        if (!token) {
            window.location.href = '../index.html'; // Redirect to login if no token is found
            return;
        }

        fetch(`https://trashwell-1.onrender.com/api/schedules/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error('Error:', data.error);
                alert('Error cancelling schedule. Please try again.');
            } else {
                alert('Schedule cancelled successfully!');
                fetchSchedules(); // Refresh the list of schedules
            }
        })
        .catch(error => {
            console.error('Error cancelling schedule:', error);
            alert('Error cancelling schedule. Please try again.');
        });
    }

    scheduleForm.addEventListener('submit', createSchedule);

    setupSidebar();
    setupUserInfoAndLogout();
    fetchSchedules();
});
