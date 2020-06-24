// start mongod
var spawn = require('child_process').spawn;
var pipe = null;

// https://automattic.github.io/monk/docs/GETTING_STARTED.html
var urlToDataBase = 'localhost:27017/nodeblog';
var connectionToDataBase = null;

function run() {
    pipe = spawn('mongod', ['--dbpath=./data/db', '--port', '27017']);
    connectionToDataBase = require('monk')(urlToDataBase, function(err, db) {
        if(err) {
            console.error("Mongo DB is not connected", err.message);
        } else {
            console.info("Mongo DB is not connected");
        }
    });

    pipe.stdout.on('data', function (data) {
        //printback(data.toString('utf8'));
    });

    pipe.stderr.on('data', function(data) {
        //printback(data.toString('utf8'));
    });

    pipe.on('close', function (code) {
        console.log('Process exited with code: '+ code);
    });

    return connectionToDataBase;
}

function kill() {
    pipe && pipe.kill('SIGINT');
}

module.exports = {
    run: run,
    kill: kill
};
