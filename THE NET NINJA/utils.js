const fs = require('fs');  // node.js file server

const counter = (arr) => {
    return `There are ${arr.length} elements in this array`;
}

const sum = (arr) => {
    const sum = arr.reduce((previousValue, currentValue, index, array) => previousValue + currentValue);
    return `Sum elements in this array is: ${sum}`;
}

const readFileSync = (fileName) => {
    return fs.readFileSync(fileName, 'utf8');
}

const writeFileSync = (fileName, data) => {
    return fs.writeFileSync(fileName, data);
}

const readFile = (fileName, callback) => {
    fs.readFile(fileName, 'utf8', (err, data) => {
        callback(err, data);
    });
}

const removeFile = (fileName, callback) => {
    fs.unlink(fileName, (err) => callback(err));
}

const writeFile = (fileName, data, callback) => {
    return fs.writeFile(fileName, data, 'utf8', (err) => callback(err));
}

const createDirectory = (directoryName, callback) => {
    return fs.mkdir(directoryName, (err) => callback(err));
}


module.exports = {
    counter,
    sum,
    readFile,
    readFileSync,
    writeFile,
    writeFileSync,
    removeFile,
    createDirectory
};

module.exports.adder = (a, b) => {
    return `Sum ${a} + ${b} = ${a + b}`;
}
