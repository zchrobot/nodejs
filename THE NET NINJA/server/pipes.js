const http = require('http');
const fs = require('fs');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    fs.createReadStream(`${__dirname}/../public/big.txt`, 'utf8').pipe(res);
}).listen(3000);