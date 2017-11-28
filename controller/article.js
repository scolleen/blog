var articleModel = require('../model/article');
var commontModel = require('../model/commont');

var Aritcle = function () {}


Aritcle.prototype.read = function (req, res) {
    let article = new articleModel();
    let commont = new commontModel();
    let id = req.query.id

    commont.read(id).then(reponse => {
        "use strict";
      article.read(id).then(result => {
        res.render('article/detail', { article: result, list: reponse})
      }, error => {
        console.log('请求错误')
      })
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

Aritcle.prototype.delete = function (req, res) {
    let article = new articleModel();
    let id = req.body.id
    article.delete(id).then(result => {
        "use strict";
        res.json({
            code: 1,
            msg: '操作成功'
        })
    }, error => {
        "use strict";
        res.json({
            code: 0,
            msg: error
        })
    })
}
module.exports = new Aritcle();
