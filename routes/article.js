var express = require('express');
var router = express.Router();

router.get('/index', (req, res) => {
    res.render('article/index', {
        title: '文章列表',
        articleTitle: '文章题目',
        articleContent: '文章内容'
    })
})

module.exports = router;
