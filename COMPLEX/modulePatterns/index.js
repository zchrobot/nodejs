const greet1 = require('./greet1');
greet1();
// or
require('./greet1')();


const greet2 = require('./greet2').greet;
greet2();
// or
require('./greet2').greet();
require('./greet2').greetSpeak();
// or
const greetModule2 = require('./greet2');
greetModule2.greet();

const greet3 = require('./greet3').greet;
greet3();
// or
require('./greet3').greet();
require('./greet3').greetSpeak(); /// the second execute require is getting from cache so is the same object
// or
const greetModule3 = require('./greet3');
greetModule3.greet();

// singleton pattern
// the second call require method return the object from cahce sa is the same object
const greet4 = require('./greet4');
const greet5 = require('./greet4');
greet5.greet = () => {
    console.log('greet method was overwrite');
}
console.log('greet4 === greet5: ', greet4 === greet5);
greet4.greet();

