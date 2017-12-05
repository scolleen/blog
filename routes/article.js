
var express = require('express');
var router = express.Router();
var article = require('../controller/article')
var comment = require('../controller/comment')

router.get('/read', article.read)
router.get('/', article.read)

router.get('/create', (req, res) => {
    res.render('article/create', { title: '新增文章', error: '' });
});

router.post('/create', article.create)
router.post('/update', article.update)

// 评论接口
router.post('/comment/read',comment.read)
router.post('/comment/create',comment.create)

module.exports = router;