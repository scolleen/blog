var commontModel = require ('../model/comment')

var Commont = function () {}

Commont.prototype.read = function (req, res) {
  let commont = new commontModel();
  let id = req.body.id
  commont.read(id).then(result => {
    res.json({
      code: 1,
      list: result,
      msg: ''
    })
  }, error => {
    console.log(error)
  })
}

Commont.prototype.create = function (req, res) {
  let commont = new  commontModel()
  let username = req.body.username
  let content = req.body.content
  let article_id = req.body.article_id
  commont.create(username, content, article_id).then(result => {
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
module.exports = new Commont();
