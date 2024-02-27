
const http = require('http');
const PORT = 3000;

// Array to store signup form data
const users = [];

// Create a server
const server = http.createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    // Handle preflight requests for CORS
    if (req.method === "OPTIONS") {
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type");
        res.writeHead(200);
        res.end();
        return;
    }

    if (req.method === 'POST' && req.url === '/signup') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString(); // Convert Buffer to string
        });
        req.on('end', () => {
            const userData = JSON.parse(body);
            console.log('Signup form data received:', userData);

            // Push user data into the users array
            users.push(userData);

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true, message: 'User signed up successfully!' }));
        });
    }
    else if (req.method === 'POST' && req.url === '/login') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString(); // Convert Buffer to string
        });
        req.on('end', () => {
            const loginData = JSON.parse(body);
            //  console.log('Login form data received:', loginData);

            // Check if user exists in the users array
            const foundUser = users.find(user => user.username === loginData.username && user.password === loginData.password);
            if (foundUser) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, message: 'Login successful!' }));
            } else {
                res.writeHead(401, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, message: 'Invalid username or password' }));
            }
        });
    }
    else if (req.method === 'GET' && req.url === '/employees') {
        // Return the list of users as employees
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(users));
    }
    else if (req.method === 'POST' && req.url === '/addEmployee') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString(); // Convert Buffer to string
        });
        req.on('end', () => {
            const employeeData = JSON.parse(body);
            console.log('Employee data received:', employeeData);

            // Push employee data into the users array
            users.push(employeeData);

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true, message: 'Employee added successfully!' }));
        });
    }
    // Handle PUT request to update employee details based on email ID
    else if (req.method === 'PUT' && req.url === '/updateEmployee') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString(); // Convert Buffer to string
        });
        req.on('end', () => {
            const updatedEmployeeData = JSON.parse(body);
           // console.log('Updated employee data received:', updatedEmployeeData);

            // Find the employee with the provided email in the users array
            const employeeIndex = users.findIndex(user => user.email === updatedEmployeeData.email);
           // console.log('Updated employee data received:', updatedEmployeeData);

            if (employeeIndex !== -1) {
                // Update the employee details
                users[employeeIndex] = updatedEmployeeData;
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, message: 'Employee details updated successfully!' }));
            } else {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, message: 'Employee not found with the provided email' }));
            }
        });
    }
   
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Page not found');
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
