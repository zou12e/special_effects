var http = require('http');

http.createServer(function (req, res) {

    res.writeHead(200, {'Content-Type': 'text/plain','Access-Control-Allow-Origin':'*'});
    res.end('Hello');
    console.log(req.method)
    // console.log(req.headers)
}).listen(8888);

console.log('Server running at http://127.0.0.1:8888/');