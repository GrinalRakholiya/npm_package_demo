// signup.js
import { validatePassword, validatePasswordMatch } from '../validation/passwordValidator.js';

function submitForm(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Retrieve form input values
    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;

    // Validate password
    var lengthError = validatePassword(password);
    if (!validatePassword(password)) {
        alert(lengthError);
        return;
    }

    // Validate password match
    var matchError = validatePasswordMatch(password, confirmPassword);
    if (matchError) {
        alert(matchError);
        return;
    }

    var userData = {
        username: username,
        email: email,
        password: password,
        confirmPassword: confirmPassword
    };

    fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            if (data.success) {
                window.location.href = "../loginEmployee/login.html";
            }
        })
        .catch(error => {
            console.error("Error occurred during form data submission:", error);
            alert("An error occurred. Please try again later.");
        });
}

document.getElementById("signupForm").addEventListener("submit", submitForm);
