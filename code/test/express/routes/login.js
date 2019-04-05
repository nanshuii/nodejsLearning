const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('Login', { title: 'Login' });
});

router.post('/', (req, res) => {
    res.send('post login');
});

module.exports = router;