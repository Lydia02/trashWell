document.addEventListener("DOMContentLoaded", function() {
    const profileIcon = document.getElementById('profile-icon');
    const sidebar = document.getElementById('sidebar');
    const closeSidebar = document.getElementById('close-sidebar');
    const overlay = document.getElementById('overlay');
    const userProfile = document.getElementById('userProfile');
    const recyclingForm = document.getElementById('recyclingForm');
    const entriesTable = document.getElementById('entries');
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

    function fetchEntries() {
        const token = sessionStorage.getItem('authToken');
        if (!token) {
            window.location.href = '../index.html'; // Redirect to login if no token is found
            return;
        }

        fetch('https://trashwell-1.onrender.com/api/recycling', {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error('Error:', data.error);
                alert('Error fetching recycling entries. Please try again.');
            } else {
                entriesTable.innerHTML = data.map(entry => `
                    <tr>
                        <td>${entry.date}</td>
                        <td>${entry.material}</td>
                        <td>${entry.amount}</td>
                        <td>
                            <button class="edit-btn" data-id="${entry.id}" data-date="${entry.date}" data-material="${entry.material}" data-amount="${entry.amount}">Edit</button>
                            <button class="delete-btn" data-id="${entry.id}">Delete</button>
                        </td>
                    </tr>
                `).join('');
                setupEditAndDeleteButtons();
            }
        })
        .catch(error => {
            console.error('Error fetching recycling entries:', error);
            alert('Error fetching recycling entries. Please try again.');
        });
    }

    function setupEditAndDeleteButtons() {
        document.querySelectorAll('.edit-btn').forEach(button => {
            button.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                const date = this.getAttribute('data-date');
                const material = this.getAttribute('data-material');
                const amount = this.getAttribute('data-amount');

                // Populate form with existing data
                document.getElementById('date').value = date;
                document.getElementById('material').value = material;
                document.getElementById('amount').value = amount;
                currentEditId = id;

                // Update the form submission to handle updates
                recyclingForm.removeEventListener('submit', createEntry);
                recyclingForm.addEventListener('submit', updateEntry);
            });
        });

        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                deleteEntry(id);
            });
        });
    }

    function createEntry(event) {
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

        fetch('https://trashwell-1.onrender.com/api/recycling', {
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
                fetchEntries(); // Refresh the list of entries
                recyclingForm.reset();
            }
        })
        .catch(error => {
            console.error('Error logging recycling activity:', error);
            alert('Error logging recycling activity. Please try again.');
        });
    }

    function updateEntry(event) {
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

        fetch(`https://trashwell-1.onrender.com/api/recycling/${currentEditId}`, {
            method: 'PUT',
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
                alert('Error updating recycling entry. Please try again.');
            } else {
                alert('Recycling entry updated successfully!');
                recyclingForm.removeEventListener('submit', updateEntry);
                recyclingForm.addEventListener('submit', createEntry);
                fetchEntries(); // Refresh the list of entries
                recyclingForm.reset();
                currentEditId = null;
            }
        })
        .catch(error => {
            console.error('Error updating recycling entry:', error);
            alert('Error updating recycling entry. Please try again.');
        });
    }

    function deleteEntry(id) {
        const token = sessionStorage.getItem('authToken');
        if (!token) {
            window.location.href = '../index.html'; // Redirect to login if no token is found
            return;
        }

        fetch(`https://trashwell-1.onrender.com/api/recycling/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error('Error:', data.error);
                alert('Error deleting recycling entry. Please try again.');
            } else {
                alert('Recycling entry deleted successfully!');
                fetchEntries(); // Refresh the list of entries
            }
        })
        .catch(error => {
            console.error('Error deleting recycling entry:', error);
            alert('Error deleting recycling entry. Please try again.');
        });
    }

    recyclingForm.addEventListener('submit', createEntry);

    setupSidebar();
    setupUserInfoAndLogout();
    fetchEntries();
});
