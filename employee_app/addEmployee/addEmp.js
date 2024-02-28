// submitEmployeeForm.js
import { validatePassword } from '../validation/passwordValidator.js';

function submitEmployeeForm(event) {
    event.preventDefault(); // Prevent the default form submission

    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    // Validate password
    var passwordError = validatePassword(password);
    if (passwordError) {
        alert(passwordError);
        return;
    }

    // Create employee data object
    var employeeData = {
        username: username,
        email: email,
        password: password
    };

    // Make POST request to server to add employee
    fetch("http://localhost:3000/addEmployee", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(employeeData)
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
            console.error("Error occurred while adding employee:", error);
            alert("An error occurred. Please try again later.");
        });
}

document.getElementById("addEmployeeForm").addEventListener("submit", submitEmployeeForm);
