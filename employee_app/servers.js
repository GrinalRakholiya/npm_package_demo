const http = require('http');
const url = require('url');
const querystring = require('querystring');

let formData = []; // Store form data

const server = http.createServer((req, res) => {
    const { method, url: reqUrl } = req;
    const parsedUrl = url.parse(reqUrl, true);

    res.setHeader("Access-Control-Allow-Origin", "*");
    if (req.method === "OPTIONS") {
        res.setHeader("Access-Control-Allow-Methods", "POST");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type");
        res.writeHead(200);
        res.end();
        return;
    }

    if (method === 'POST' && parsedUrl.pathname === '/submit') {
        let body = '';

        req.on('data', (chunk) => {
            body += chunk.toString();
        });
    
    req.on('end', () => {
        const { username, email, password, confirmPassword } = querystring.parse(body);
        formData.push({ username, email, password, confirmPassword });  // Store form data in the server

        console.log('Form data received:', formData);  // Log the received form data to the terminal

        const responseMessage = 'successfully signed up!';   // Send response message to the client
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: responseMessage }));
    });
    } 
    else if (method === 'GET' && parsedUrl.pathname === '/viewData') {  // Handle GET request to view stored data
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(formData));
    } 
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
