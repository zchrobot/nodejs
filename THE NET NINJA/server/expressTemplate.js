const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');

// set in Request Headers Content-Type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

/**
 * middleware is the that code runs between the request and the response
 * zwraca wszystkie statyczne zasoby takie jak pliki.js pliki.css images
 */
// app.use(express.static('public'));

/**
 * To create a virtual path prefix (where the path does not actually exist in the file system)
 * for files that are served by the express.static function, specify a mount path for the static directory, as shown below:
 * app.use('/static', express.static('public'))
 */
// można też dla dowolnej ścieżki virtualnej zwracać zasoby statyczne
// '/assets' it is routes
// 'public' it is linking up the directory to where it's stored static files
app.use('/assets', express.static('public'));

app.use('/', (req, res, next) => {
    console.log('req.url: ', req.url);
    // globalny middleware każdy reqest aplikacji tutaj wpadnie
    // np:
    // '/'
    // '/contact'
    // '/profile'
    // '/profile/kriss'
    // '/scripts/main.js'
    // '/css/styles.css'

    // przekaż kontrolę do kolejnego middleware
    next();
});

app.get('/', (req, res) => {
    // res.send('this is home page');
    // res.sendFile(path.join(__dirname, '../public/indexStatio.html'));

    //ejs
    res.render('index');
});

app.get('/contact', (req, res) => {
    // jeśli przykładowo tutaj wykonamy jakiś kawałek kodu to będzie on tzw. middleware
    res.render('contact', {query: req.query});
});

// aby obsłużyć body w żądaniach typu post musimy dodac middleware body-parser
// Form Data is example: who=Ola%2CPampi&department=marketing&email=zchrobot%40poczta.onet.pl
app.post('/contact', (req, res, next) => {
    console.log('req.body', req.body);
    // req.query is empty object for POST {}
    res.render('contact-success', {data: req.body});
});

app.get('/profile/:name', (req, res) => {
    // res.send(`You requested to see a profile with the name of ${req.params.name}`);
    const data = {age: 29, job: 'ninja', hobbies: ['eating', 'fighting', 'fishing']};
    res.render('profile', {
        person: req.params.name,
        data
    });
});

app.listen(3000, () => {
    console.log('server is listening on port 3000');
});

console.log('path.join: ', path.join(__dirname, '../public/indexStatic.tml'));