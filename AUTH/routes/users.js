var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({dest: './uploads'});
var User = require('../models/users');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users', { title: 'Users' });
});

router.get('/register', function(req, res, next) {
    res.render('register', { title: 'Register' });
});

router.post('/register', upload.single('profileimage'), function(req, res, next) {
    var name = req.body.name;
    var username = req.body.username;
    var email = req.body.email;
    var name = req.body.name;
    var password = req.body.password;
    var confirmPassword = req.body.password2;

    if(req.file) {
        console.log('Uploading file');
        var profileimage = req.file.filename;
    } else {
        console.log('No File Uploaded');
        var profileimage = 'noimage.jpg';
    }

    // form validator
    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Name is not valid').isEmail();
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password2', 'Password do not match').equals(password);

    // check errors
    var errors = req.validationErrors();

    if(errors) {
        // np jesli checkBody dla name jest puste
        // trzeba jeszcze przeslac poprawnie wypelnione pola i wpisywac je po przeladowaniu strony w inputy
        res.render('register', {
          errors: errors
        });
    } else {

        console.log('no errors');
        var newUser  = new User({
            username: username,
            password: password,
            email: email,
            name: name,
            profileimage: profileimage
        })
        User.createUser(newUser, function(err, user) {
          if(err) {
            throw err
          }
          console.log('Created user: ', user);
        });

        req.flash('success', 'You are now registered and can login');
        res.location('/');
        res.redirect('/');
    }

    // console.log('file info');
    // console.log(req.file);
});

router.get('/login', function(req, res, next) {
    res.render('login', { title: 'Login' });
});

router.post('/login', passport.authenticate('local', {
        failureRedirect: '/users/login',
        failureFlash: 'Invalid username or password.'
        //successRedirect: '/', lub callback poniżej
        //successFlash: 'Welcome!'
    }), function(req, res) {
        req.flash('success', 'You are now logged in');
        res.redirect('/');
});

router.get('/logout', function (req, res) {
    req.logout();
    req.flash('success', 'You are now logged out');
    res.redirect('/users/login');
});

/**
Sessions
In a typical web application, the credentials used to authenticate a user will only be transmitted
during the login request. If authentication succeeds, a session will be established and maintained
via a cookie set in the user's browser.
Each subsequent request will not contain credentials, but rather the unique cookie that identifies
the session. In order to support login sessions, Passport will serialize and deserialize user instances
to and from the session.
**/
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, user) {
        done(err, user);
    });
});

passport.use(new mongodb://<dbuser>:<dbpassword>@ds117164.mlab.com:17164/todo-list-nodejs(function (username, password, done) {
    User.getUserByUsername(username, function (err, user) {
        console.log(user)
        console.log(err)
        if (err) { return done(err); }
        if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
        }

        User.comparePassword(password, user.password, function (err, isMatch) {
            if(err) { return done(err); }
            if(isMatch) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Incorrect password.' });
            }
        });
    });
}));

module.exports = router;
