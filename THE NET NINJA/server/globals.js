const fs = require('fs');  // node.js file server

// global object where is app.js
console.log('__dirname: ', __dirname);
console.log('__filename: ', __filename);

const utils = require('./utils');

console.log('[1,2,3]: ', utils.counter([1, 2, 3]));
console.log('[1,2,3]: ', utils.sum([1, 2, 3]));
console.log(utils.adder(2, 3));

// or
console.log('[1,2,3,4]: ', require('./utils').sum([1, 2, 3, 4]));

// EventsEmitter global module
const EventEmitter = require('events');
// util global module
const util = require('util');
const myEmmiter = new EventEmitter();

myEmmiter.on('someEvent', (msg) => console.log(msg));
myEmmiter.emit('someEvent', 'the event was emitted');

function Personal(name) {
    this.name = name;
}

// extends Person object with EventEmiter
util.inherits(Personal, EventEmitter);

const james = new Personal('James');

james.on('speak', function (msg) {
    console.log(`${this.name} is speaking ${msg}`)
});

james.emit('speak', 'hi everybody');

// better approach ES6 class
class Person extends EventEmitter {
    constructor(name) {
        super();
        this.name = name;

        this.on('speak', (msg) => {
            console.log(`${this.name} is speaking ${msg}`)
        });
    }
}

const kriss = new Person('Kriss');
kriss.emit('speak', 'hi');

const file = utils.readFileSync('text.txt');
utils.writeFileSync('writingFile.md', file);

// asynchronous
utils.readFile('text.txt', (err, data) => console.log(data));
utils.writeFile('text2.txt', file, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');

    utils.removeFile('text2.txt', (err) => {
        if (err) throw err;
        console.log('The file has been removed!');
    })
});

const directoryName = 'public';
utils.createDirectory(directoryName, (err) => {
    if (err)  {
        console.log('Warning ! ------------------------------------');
        console.warn(`${__dirname}\\${directoryName} already exists`);
        console.log('----------------------------------------------');
    }
    console.log(`Directory ${directoryName} has been created!`);
})

utils.readFile('package.json', (err, data) => {
    const {name, description, version, main, scripts, author, license} = JSON.parse(data);
    console.log('author: ', author);
    console.log('name: ', name);
});

const y = utils.readFileSync('lorem.txt');

// readable stream
// pliki o dużym rozmiarze warto odczytywać fragmentami (chunks) po zapełnieniu danymi całego buffora zostanie wysłana porcja danych itd
const myReadStream = fs.createReadStream(`${__dirname}/lorem.txt`, 'utf8');
const myWriteStream = fs.createWriteStream(`${__dirname}/loremWrite.txt`, 'utf8');

let chunks = 0;
myReadStream.on('data', (chunk) => {
    console.log('chunk: ', ++chunks);
    myWriteStream.write(chunk);
})

// is the same read and write
myReadStream.pipe(myWriteStream);

