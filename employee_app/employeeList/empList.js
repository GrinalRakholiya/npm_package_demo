function fetchEmployees() {
    fetch('http://localhost:3000/employees')
        .then(response => response.json())
        .then(data => {
            const tbody = document.querySelector('#employeeTable tbody');

            data.forEach(employee => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${employee.username}</td>
                    <td>${employee.email}</td>                        
                    <td class="action-buttons"><button onclick="editEmployee('${employee.email}')">Edit</button>
                    <button onclick="deleteEmployee('${employee.email}', event)">Delete</button></td>
                `;
                tbody.appendChild(row);
            });
        })
}
fetchEmployees(); // Initial fetch

function addEmployee() {
    window.location.href = '../addEmployee/addEmp.html';
}

function editEmployee(email) {
    window.location.href = '../editEmployee/editEmp.html?email=' + email;
}

function deleteEmployee(email) {
    fetch('http://localhost:3000/deleteEmployee', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log(data);
                alert(data.message);
                window.location.href = 'empList.html';
            } else {
                console.error('Failed to delete employee:', data.message);
            }
        })
        .catch(error => {
            console.error('Error deleting employee:', error);
        });
}
function logout() {
    window.location.href = '../loginEmployee/login.html';
}
