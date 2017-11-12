var articleModel = require('../model/article');

var Aritcle = function () {}


Aritcle.prototype.read = function (req, res) {
    let article = new articleModel();
    let id = req.query.id
    article.read(id).then(result => {
        res.render('article/detail', { article: result })
    }, error => {
        console.log('请求错误')
    })
}

Aritcle.prototype.create = function (req, res) {
    let article = new articleModel();
    let title = req.body.title
    let content = req.body.content

    article.create(title, content).then(result => {
        res.json({
            code: 1,
            msg: '提交成功'
        })
    }, error => {
        res.json({
            code: 0,
            msg: error
        })
    })
}

module.exports = new Aritcle();
