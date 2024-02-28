function submitEditForm(event) {
    event.preventDefault(); // Prevent default form submission

    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const updatedEmployeeData = {
        email: email,
        username: username,
        password: password
    };

    // Send a PUT request to update the employee details on the server
    fetch('http://localhost:3000/updateEmployee', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedEmployeeData)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.success) {
                alert(data.message);
                window.location.href = '../employeeList/empList.html';
            } else {
                alert(data.message);
            }
        })
        .catch(error => {
            console.error('Error updating employee details:', error);
        });
}

document.getElementById("editEmployeeForm").addEventListener("submit", submitEditForm);
