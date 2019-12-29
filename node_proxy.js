#!/usr/bin/env node

var http = require('http');

http.createServer(function (request, response) {

    var proxyRequest = http.request({
        port: 9000,
        host: '127.0.0.1',
        method: request.method,
        path: request.url,
        headers: request.headers
    });
    proxyRequest.on('response', function (proxyResponse) {
        console.log('inside response')
        proxyResponse.pipe(response);
    });
    request.pipe(proxyRequest);
}).listen(8080);

http.createServer(function (req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    res.write('request successfully proxied to port 9000!' + '\n' + JSON.stringify(req.headers, true, 2));
    res.end();
}).listen(9000);
