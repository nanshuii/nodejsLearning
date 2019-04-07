const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const User = require('../model/user');

router.get('/', (req, res) => {
    req.flash('error', '用户名、密码不能为空');
    res.render('Reg');
});

router.post('/', (req, res) => {
    const username = req.body['username'];
    const password = req.body['password'];
    const password_repeat = req.body['password-repeat'];
    console.log(username, password, password_repeat);
    if (username.length == 0 || password.length == 0 || password_repeat.length == 0) {
        console.log('用户名、密码不能为空');
        req.flash('error', '用户名、密码不能为空');
        return res.redirect('/reg');
    }
    if (password != password_repeat) {
        console.log('两次密码不一致');
        req.flash('error', '两次密码不一致');
        return res.redirect('/reg');
    }
    const md5 = crypto.createHash('md5');
    const password_md5 = md5.update(password).digest('base64');
    console.log('password md5 = ', password_md5);

    const new_user = new User({
        name: username,
        password: password_md5
    });

    // 检查用户名是否存在
    User.get(new_user.name, function(err, user) {
        if (user) {
            err = '用户名已经存在';
        }
        if (err) {
            console.log(err);
            req.flash('error', err);
            return res.redirect('/reg');
        }
        new_user.save(function(err) {
            if (err) {
                flash(err);
                return res.redirect('/reg');
            }
            req.session.user = new_user;
            req.flash('success', '注册成功');
            res.redirect('/');
        });
    });
});

module.exports = router;