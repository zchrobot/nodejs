const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');
const finalhandler = require('finalhandler');
const favicon = require('serve-favicon')(path.join(__dirname, '../public/images', 'favicon.ico'));

const mimeTypes = {
    '.html': 'text/html',
    '.txt': 'text/plain',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.jpg': 'image/jpeg',
    '.png': 'image/png',
    '.ico': 'image/x-icon',
    '.svg': 'image/svg+xml',
    '.eot': 'appliaction/vnd.ms-fontobject',
    '.ttf': 'aplication/font-sfnt',
    '.json': 'application/json'
};

http.createServer(function (req, res) {
    let pathName = url.parse(req.url).path;

    if (pathName === '/') {
        pathName = 'indexStatic.html';
    }
    let extName = '.' + (pathName.match(/\.([^.]*?)(?=\?|#|$)/) || [])[1];
    let staticFiles = `${__dirname}/../public/${pathName}`;

    if (extName == '.jpg' || extName == '.png' || extName == '.ico' || extName == '.eot' || extName == '.ttf' || extName == '.svg') {
        const file = fs.readFileSync(`${__dirname}/../public/images/${pathName}`);
        res.writeHead(200, {'Content-Type': mimeTypes[extName]});
        res.write(file, 'binary');
        res.end();
    } else {
        fs.readFile(staticFiles, 'utf8', function (err, data) {
            if (!err) {
                res.writeHead(200, {'Content-Type': mimeTypes[extName]});
                res.end(data);
            } else {
                res.writeHead(404, {'Content-Type': 'text/html;charset=utf8'});
                res.write(`<strong>${staticFiles}</strong>File is not found.`);
            }
            res.end();
        });
    }
}).listen(3000);

// const server = http.createServer((req, res) => {
//     const done = finalhandler(req, res);
//
//     console.log(`request was made: ${req.url}`);
//
//     favicon(req, res, (err) => {
//         if (err) return done(err)
//
//         // continue to process the request here, etc.
//         // res.writeHead(200, {'Content-Type': 'text/plain'});
//         // fs.createReadStream(`${__dirname}/../text.txt`, 'utf8').pipe(res);
//
//         if (req.url === '/') {
//
//             fs.readFile(path.join(__dirname, '../public/', 'indexStatic.html'), (err, data) => {
//                 res.writeHead(200, {
//                     'Content-Type': 'text/html',
//                     'Content-Length': data.length
//                 });
//                 res.write(data);
//                 res.end();
//             });
//         } else {
//             res.end();
//         }
//     })
//
// });
//
// server.listen(3000);

const createFile = () => {

    const file = fs.createWriteStream('./public/big.txt', 'utf8');
    const loops = 3000 || 1e6; // 1e6 - about 400mb

    for (let i = 0; i <= loops; i++) {
        file.write('Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n');
    }
    file.end();
}

// createFile();