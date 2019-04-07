const express = require('express');
const router = express.Router();
const User = require('../model/user');
const Post = require('../model/post');

router.get('/:user', (req, res) => {
  User.get(req.params.user, function(err, user) {
    if (!user) {
      flash('error', '用户不存在');
      return res.redirect('/');
    }
    console.log('user = ', user);
    Post.get(user.name, function(err, posts) {
      if(err) {
        req.flash('error', err);
        return res.redirect('/');
      }
      console.log('posts = ', posts);
      res.render('users', {
        title: user.name,
        posts: posts
      });
    })
  });
});

module.exports = router;
