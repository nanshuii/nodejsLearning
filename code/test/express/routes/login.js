const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const User = require('../model/user');

router.get('/', (req, res) => {
    res.render('Login', { title: 'Login' });
});

router.post('/', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    // 这里应该做username和password的限制校验
    const md5 = crypto.createHash('md5');
    const md5_password = md5.update(req.body.password).digest('base64');
    User.get(username, function(err, user) {
        if (err) {
            req.flash('error', err);
            return res.redirect('/login');
        }
        if (!user) {
            req.flash('error', '用户不存在');
            return res.redirect('/login');
        }
        if (user.password != md5_password) {
            req.flash('error', '密码不正确');
            return res.redirect('/login');
        }
        req.session.user = user;
        req.flash('success', '登入成功');
        res.redirect('/');
    });
});

module.exports = router;