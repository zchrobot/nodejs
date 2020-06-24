var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', ensureAthenticated, function(req, res, next) {
  res.render('index', { title: 'Members' });
});

function ensureAthenticated(req, res, next) {
    // jesli nie jestes zalogowany metoda passport nie masz dostępu do members
    if(req.isAuthenticated()) {
      return next();
    }
    res.redirect('users/login')
}

module.exports = router;
