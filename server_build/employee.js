const http = require('http');  // Create an HTTP server and handle HTTP requests and responses.
const url = require('url');   // Built-in Node.js function, for working with URLs.

const port = 3000;

let employees = [
    { id: 1, name: 'John Doe', phoneNumber: '1234567890' },
    { id: 2, name: 'Jane Smith', phoneNumber: '9876543210' },
    { id: 3, name: 'Bob John', phoneNumber: '5555555555' }
];

const server = http.createServer((req, res) => {   //whenever a new HTTP request is received
    const parsedUrl = url.parse(req.url, true);   // extracts various components of the URL such as pathname, query parameters

    if (parsedUrl.pathname === '/employees' && req.method === 'GET') {
        if (parsedUrl.query.id) { // checks if there is id query parameter in the request URL.
            const employeeId = parseInt(parsedUrl.query.id);
            const employee = employees.find(emp => emp.id === employeeId);

            if (employee) {
                res.writeHead(200, { 'Content-Type': 'application/json' }); //writeHead used to send an HTTP response header to the client
                res.end(JSON.stringify(employee));
            } 
            else {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Employee not found' }));
            }
        } 
        else {
            res.writeHead(200, { 'Content-Type': 'application/json' }); // return all employees
            res.end(JSON.stringify(employees));
        }
    } 
    else if (parsedUrl.pathname === '/employees' && req.method === 'POST') {
        let body = '';
        req.on('data', (queue) => { //when new http request received in chunk this event is triggered
            body += queue.toString(); //after converting chunk data into string it stored into body
        });

        req.on('end', () => {     // Processing the received data when all data has been received
            try {
                const newEmployee = JSON.parse(body); //convert json data into js object

                // Check if exactly 2 fields are provided
                const numFields = Object.keys(newEmployee).length;
                if (numFields !== 2) {
                    throw new Error('Exactly 2 fields are required');
                }

                const { name, phoneNumber } = newEmployee;  // Validate and extract the fields

                if (!name || !phoneNumber) {
                    throw new Error('Name and phone number are required fields');
                }
                if (phoneNumber.length !== 10 || isNaN(phoneNumber)) {
                    throw new Error('Phone number must be a 10-digit number');
                }
                const id = employees.length + 1;
                const updatedEmployee = { id, name, phoneNumber };
                employees.push(updatedEmployee);

                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(updatedEmployee));
            } 
            catch (error) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: error.message }));
            }
        });
    } 
    else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Invalid endpoint' }));
    }
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
