var commentModel = require ('../model/comment')

var Comment = function () {}

// 获取评论
Comment.prototype.read = function (req, res) {
  let comment = new commentModel();
  let id = req.body.id
  comment.read(id).then(result => {
    res.json({
      code: 1,
      list: result,
      msg: ''
    })
  }, error => {
    console.log(error)
  })
}

// 创建评论
Comment.prototype.create = function (req, res) {
  let comment = new  commentModel()
  let username = req.body.username
  let content = req.body.content
  let article_id = req.body.article_id
  let comment_type = req.body.comment_type
  comment.create(username, content, article_id, comment_type).then(result => {
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
module.exports = new Comment();
