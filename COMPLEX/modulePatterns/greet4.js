function Greeter() {
    const greeting = 'hello from constructor greet';
    this.greet = () => {
        console.log(greeting);
    }
}

module.exports = new Greeter();