var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var posts = req.db.get('posts');

    posts.find({}, {}, function(err, posts) {
        res.render('index', { posts: posts });
    });
});

module.exports = router;
