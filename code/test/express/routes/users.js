var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// 同一路径绑定多个路由响应函数;优先匹配前面的路径
router.all('/:username', (req, res, next) => {
  // res.send('all username');
  console.log('all username');
  next();
});

router.get('/:username', (req, res, next) => {
  res.send('username = ' + req.params.username); // 路径匹配
});

module.exports = router;
