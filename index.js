const http = require('http');
const url  = require('url');


const httpServer = http.createServer(function (req, res) {
    helloworld(req, res);
});
httpServer.listen(9090, function() {
    console.log(`The server is listening on port ${9090}.`);
});

var helloworld = function(req, res) {
    const parsedUrl = url.parse(req.url, true);

    const path  = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');
    const method = req.method;

    // Log
    console.log(`Request received: ${method} ${path}`);

    const wellcome = 'Wellcome my friend.';
    const notAllowed = 'Method Not Allowed';
    const notFound = 'Not Found';

    res.setHeader('Content-Type', 'application/json');

    if (trimmedPath != 'hello') {
        res.writeHead(404);
        res.end(JSON.stringify({message: notFound}));
        return;
    }

    if (method !== 'GET') {
        res.writeHead(405);
        res.end(JSON.stringify({message: notAllowed}));
        return;
    }
    
    res.writeHead(200);
    res.end(JSON.stringify({message: wellcome}));
};