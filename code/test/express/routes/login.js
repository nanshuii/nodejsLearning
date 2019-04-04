const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('get login');
});

router.post('/', (req, res) => {
    res.send('post login');
});

module.exports = router;