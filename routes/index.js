var express = require('express');
var router = express.Router();

var home = require('../controller/home');

router.get('/', home.index);

// 文章管理页面
router.get('/management', home.list);

module.exports = router;

