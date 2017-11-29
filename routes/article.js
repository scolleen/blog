
var express = require('express');
var router = express.Router();
var article = require('../controller/article')
var commont = require('../controller/commont')

router.get('/read', article.read)
router.get('/', article.read)

router.get('/create', (req, res) => {
    res.render('article/create', { title: '新增文章', error: '' });
});

router.post('/create', article.create)

router.post('/commont/create',commont.create)

module.exports = router;