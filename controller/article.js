var articleModel = require('../model/article');

var Aritcle = function () {}


Aritcle.prototype.detail = function (req, res) {
    let article = new articleModel();
    let id = req.query.id

    article.read(id).then(result => {
        res.render('article/detail', { article: result })
    }, error => {
        console.log('请求错误')
    })
}

Aritcle.prototype.read = function (req, res) {
  let article = new articleModel()
  let id = req.body.id
  article.read(id).then(result => {
    "use strict";
    res.json({
      code: 1,
      body: result,
      msg: ''
    }, error => {
      res.json({
        code: 0,
        body: error,
        msg: '请求错误'
      })
    })
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

Aritcle.prototype.update = function (req, res) {
  let aritcle = new articleModel()
  let id = req.body.id
  let title = req.body.title
  let content = req.body.content
  aritcle.update(title, content, id).then(result => {
      res.json({
        code: 1,
        body: result,
        msg: '修改成功'
      })
  }, error => {
      res.json({
        code: 0,
        msg: error
      })
  })
}
module.exports = new Aritcle();
