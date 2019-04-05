const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('Reg', { title: 'Reg' });
});

router.post('/', (req, res) => {
    res.send('reg post');
});

module.exports = router;