const http = require('http');

const hostname = '127.0.0.1';
//const hostname = 'localhost';
const port = 3000;

// Create the HTTP server
const server = http.createServer((req, res) => {
    // Set the response header
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');

    // Send the response to the browser
    res.end('<h1>Hello World!</h1>');
});

// Start the server
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});