var mysql = require('../config/mysql')

var Comment = function () {};

// 评论类型： 0：文章评论 1：留言板

// 获取评论(根据文章)
Comment.prototype.read = function (id) {
  return new Promise((resolve, reject) => {
    let sql = "SELECT * FROM `blog_comment` WHERE article_id=?"
    mysql.query(sql, [id]).then(result => {
      if (result.length === 0) {
        resolve('')
      } else {
        resolve(result)
      }
    }, error => {
      reject(error)
    })
  })
}

// 创建评论(根据文章)
Comment.prototype.create = function (username, content, article_id, commemt_type) {
  return new Promise((reslove, reject) => {
    // 校验数据
    try {
      if (username.length < 1) {
        reject('请填写一个用户名');
        return;
      }

      if (content.length < 1) {
        reject('评论内容不能为空');
        return;
      }

    } catch (error) {
      reject('系统错误，请稍后再试');
      return;
    }

    let sql = "INSERT INTO `blog_comment` (`username`, `content`, `article_id`, `comment_type`) VALUES (?,?,?,?)"
    mysql.query(sql, [username, content, article_id, commemt_type]).then(result => {
      reslove(result)
    }, error => {
      reject(error)
    })
  })
}

// 获取评论列表（文章评论）
Comment.prototype.list = function (type) {
  return new Promise((resolve, reject) => {
    let sql = "SELECT * FROM `blog_comment` WHERE comment_type=?"
    mysql.query(sql, [type]).then(result => {
      if (result.length === 0) {
        resolve('')
      } else {
        resolve(result)
      }
    }, error => {
      reject(error)
    })
  })
}

// 删除评论
Comment.prototype.delete = function (id) {
  return new Promise((resole, reject) => {
    let sql = 'DELETE FROM `blog_comment` WHERE article_id=?'
    mysql.query(sql, [id]).then(result => {
      resole(result)
    }, error => {
      reject(error)
    })
  })
}

module.exports = Comment;