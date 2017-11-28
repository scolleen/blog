var mysql = require('../config/mysql')

var Commont = function () {};

Commont.prototype.read = function (id) {
  return new Promise((resolve, reject) => {
    let sql = "SELECT * FROM `blog_comment` WHERE article_id=?"
    mysql.query(sql, [id]).then(result => {
      if (result.length === 0) {
        resolve('暂无评论');
      } else {
        resolve(result)
      }
    }, error => {
      reject(error)
    })
  })
}

Commont.prototype.create = function (title, content, article_id) {
  return new Promise((reslove, reject) => {
    // 校验数据
    try {
      if (title.length < 1) {
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

    let sql = "INSERT INTO `blog_comment` (`username`, `content`, `article_id`) VALUES (?,?,?)"
    mysql.query(sql, [title, content, article_id]).then(result => {
      reslove(result)
    }, error => {
      reject(error)
    })
  })
}

module.exports = Commont;