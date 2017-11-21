
var express = require('express');
var router = express.Router();
var article = require('../controller/article')

router.get('/read', article.read)
router.get('/', article.read)

router.get('/create', (req, res) => {
    res.render('article/create', { title: '新增文章', error: '' });
});

router.post('/create', article.create)

module.exports = router;