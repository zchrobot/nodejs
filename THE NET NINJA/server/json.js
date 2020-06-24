const http = require('http');

http.createServer(function (req, res) {
    const obj = {
        name: 'Zenon',
        job: 'developer',
        age: '35'
    };
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(obj));

}).listen(3000);