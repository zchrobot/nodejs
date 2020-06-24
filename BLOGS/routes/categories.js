var express = require('express');
var router = express.Router();

router.get('/show/:category', function(req, res, next) {
    var posts = req.db.get('posts');
    var category = req.params.category;

    posts.find({category: category}, {}, function(err, posts) {
        res.render('index', { posts: posts });
    });

    // posts.find({}, {}, function(err, posts) {
    //     var filteredPosts = posts.filter(function (post) {
    //        return post.category === category;
    //     });
    //     res.render('index', { posts: filteredPosts });
    // });
});

router.get('/add', function(req, res, next) {
    res.render('addcategories', {
        'title': 'Add Categories'
    });
});

router.post('/add', function(req, res, next) {
    var name = req.body.name;

    req.checkBody('name', 'Name filed is required').notEmpty();

    var errors = req.validationErrors();

    if(errors) {
        res.render('addcategories', {
            "errors": errors
        });
    } else {
        var categories = req.db.get('categories');

        categories.insert({
            name: name
        }, function (err, category) {
            if(err) {
                res.send(err);
            } else {
                req.flash('success', 'Category added');
                res.location('/');
                res.redirect('/');
            }
        })
    }
});

module.exports = router;