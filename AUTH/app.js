var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var expressValidator = require('express-validator');
var check = require('express-validator/check');
var validationResult = require('express-validator/check/validation-result');
var sanitize = require('express-validator/filter/sanitize');
var matchedData = require('express-validator/filter/matched-data');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var multer = require('multer');
// file uploads
var upload = multer({dest:'./uploads'});
var flash = require('connect-flash');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var db = mongoose.connection;
var bcrypt = require('bcryptjs');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// handle session
app.use(session({
    secret:'secret',
    saveUninitialized: true,
    resave: true
}));

//passport authentication system
app.use(passport.initialize());
app.use(passport.session());

// validators
// https://github.com/ctavan/express-validator#usage

app.use(expressValidator());

// messages
app.use(flash());
app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});

app.get('*', function (req, res, next) {
    res.locals.user = req.user || null;
    next();
});

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
