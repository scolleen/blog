var express = require('express');
var router = express.Router();

var home = require('../controller/home');
var article = require('../controller/article')

router.get('/', home.index);

// 文章管理页面
router.get('/management', home.list);

router.post('/delete', article.delete)
module.exports = router;

