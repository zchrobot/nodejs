var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({ dest: './public/uploads/' });

/* GET users listing. */
router.get('/show/:id', function(req, res, next) {
    var posts = req.db.get('posts');
    var id = req.params.id;

    posts.findById(id, function(err, post) {
        res.render('show', { post: post });
    });

    // posts.find({_id: id}, {}, function(err, post) {
    //     res.render('show', { post: post[0] });
    // });
});

router.get('/add', function(req, res, next) {
    var categories = req.db.get('categories');

    categories.find({}, {}, function(err, categories) {
        res.render('addpost', {
            'title': 'Add Post',
            'categories': categories
        })
    });
});

router.post('/add', upload.single('mainimage'), function(req, res, next) {
    var title = req.body.title;
    var author = req.body.author;
    var category = req.body.category;
    var body = req.body.body;
    var date = new Date();

    // check image upload
    if(req.file) {
        var mainimage = req.file.filename;
    } else {
        var mainimage = 'noimage.jpg';
    }

    req.checkBody('title', 'Title filed is required').notEmpty();
    req.checkBody('body', 'Body filed is required').notEmpty();

    var errors = req.validationErrors();

    if(errors) {
        res.render('addpost', {
            "errors": errors
        });
    } else {
        var posts = req.db.get('posts');

        posts.insert({
            title: title,
            body: body,
            category: category,
            date: date,
            author: author,
            mainimage: mainimage
        }, function (err, post) {
            if(err) {
                res.send(err);
            } else {
                req.flash('success', 'Post added');
                res.location('/');
                res.redirect('/');
            }
        })
    }
});

router.post('/addcomment', function(req, res, next) {
    var name = req.body.name;
    var email = req.body.email;
    var body = req.body.body;
    var postid = req.body.postid;
    var commentdate = new Date();
    var db = req.db;

    req.checkBody('name', 'Name filed is required').notEmpty();
    req.checkBody('email', 'Email filed is required').notEmpty();
    req.checkBody('email', 'Email is invalid').isEmail();
    req.checkBody('body', 'Body filed is required').notEmpty();

    var errors = req.validationErrors();
    var posts = db.get('posts');

    if(errors) {
        posts.findById(postid, function (err, post) {
            res.render('show', {
                errors: errors,
                post: post
            });
        });
    } else {
       var comment = {
           name: name,
           email: email,
           body: body,
           commentdate: commentdate
       }
        posts.update({
            _id: postid
        },{
            $push: {
                comments: comment
            }
        }, function (err, doc) {
            if(err) {
                throw err;
            } else {
                req.flash('success', 'Comment added');
                res.location('/posts/show/' + postid);
                res.redirect('/posts/show/' + postid);
            }
        });
    }
});

module.exports = router;