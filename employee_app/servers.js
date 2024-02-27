const http = require('http');
const PORT = 3000;

const users = []; // Array to store signup form data

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
            
            const existingUser = users.find(user => user.email === userData.email);
            if (existingUser) {
                res.writeHead(409, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, message: 'Email already exists. Please use a different email.' }));
                return;
            }
            users.push(userData);  // Push user data into the users array
            console.log('Signup form data received:', userData);
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

            // Check if user exists in the users array
            const foundUser = users.find(user => user.email === loginData.email && user.password === loginData.password);
            if (foundUser) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, message: 'Login successful!' }));
            } else {
                res.writeHead(401, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, message: 'Invalid email-id or password' }));
            }
        });
    }
    else if (req.method === 'GET' && req.url === '/employees') {    
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

            // Check if the email already exists in the users array
            const existingEmployee = users.find(user => user.email === employeeData.email);
            if (existingEmployee) {
                res.writeHead(409, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, message: 'Email already exists. Please use a different email.' }));
                return;
            }

            console.log('Employee data received:', employeeData);
            users.push(employeeData); // Push employee data into the users array
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true, message: 'Employee added successfully!' }));
        });
    }

    else if (req.method === 'PUT' && req.url === '/updateEmployee') {  // Handle PUT request to update employee details based on email ID
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString(); // Convert Buffer to string
        });
        req.on('end', () => {
            const updatedEmployeeData = JSON.parse(body);

            // Find the employee with the provided email in the users array
            const employeeIndex = users.findIndex(user => user.email === updatedEmployeeData.email);

            if (employeeIndex !== -1) {
                users[employeeIndex] = updatedEmployeeData;
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, message: 'Employee details updated successfully!' }));
            } else {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, message: 'Employee not found with the provided email' }));
            }
        });
    }
    else if (req.method === 'DELETE' && req.url === '/deleteEmployee') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString(); // Convert Buffer to string
        });
        req.on('end', () => {
            const deleteData = JSON.parse(body);

            // Find the index of the employee with the provided email in the users array
            const employeeIndex = users.findIndex(user => user.email === deleteData.email);

            if (employeeIndex !== -1) {
                // Remove the employee from the users array
                users.splice(employeeIndex, 1);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, message: 'Employee deleted successfully!' }));
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
