const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('reg get');
});

router.post('/', (req, res) => {
    res.send('reg post');
});

module.exports = router;