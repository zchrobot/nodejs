const http = require('http');
const fs = require('fs');

http.createServer(function (req, res) {
    console.log('req.url: ', req.url);

    if (req.url === '/home' || req.url === '/') {
        res.writeHead(200, {'Content-Type': 'text/html'});
        fs.createReadStream(`${__dirname}/../public/indexStatic.html`).pipe(res);
    } else if (req.url === '/favicon.ico') {
        res.writeHead(200, {'Content-Type': 'image/x-icon'});
        fs.createReadStream(`${__dirname}/../public/images${req.url}`).pipe(res);
    } else if(req.url === '/scripts/main.js'){
        res.writeHead(200, {'Content-Type': 'text/javascript'});
        fs.createReadStream(`${__dirname}/../public${req.url}`).pipe(res);
    } else {
        res.writeHead(404, {'Content-Type': 'text/html'});
        fs.createReadStream(`${__dirname}/../public/404.html`).pipe(res);
    }

}).listen(3000);