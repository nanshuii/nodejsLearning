const express = require('express');
const router = express.Router();
const Post = require('../model/post');

router.post('/', (req, res) => {
    var current_user = req.session.user;
    console.log('current user = ', current_user);
    var post = new Post(current_user.name, req.body.post);
    post.save(function(err) {
        if (err) {
            req.flash('error', err);
            return res.redirect('/');
        }
        req.flash('success', '发表成功');
        res.redirect('/users/' + current_user.name);
    });
});

module.exports = router;