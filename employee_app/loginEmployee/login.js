// login.js

function submitLoginForm(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Retrieve form input values
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    var userData = {
        email: email,
        password: password
    };

    fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            alert(data.message); // You can handle the response message accordingly
            if (data.success) {
                // If login is successful, redirect to the employee table page
                window.location.href = "../employeeList/empList.html";
            }
        })
        .catch(error => {
            console.error("Error occurred during login:", error);
            alert("An error occurred. Please try again later.");
        });
}

document.getElementById("loginForm").addEventListener("submit", submitLoginForm);
