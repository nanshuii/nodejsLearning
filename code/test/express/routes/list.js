const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('list', {
      title: 'List',
      items: [2019, 'ledon', 'express', 'Node/js']
    });
  });

  module.exports = router;