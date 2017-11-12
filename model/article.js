var mysql = require('../config/mysql'); // 链接数据库

var Article = function () {};

Article.prototype.list = function (page) {
    return new Promise((resolve, reject) => {
        let sql = 'SELECT * FROM `blog_article` ORDER BY `article_id` DESC'
        mysql.query(sql).then(result => {
            resolve(result)
        }, error => {
            reject(error)
        })
    })
}
Article.prototype.read = function (id) {
    return new Promise((resolve, reject) => {
        let sql = 'SELECT * FROM `blog_article` WHERE article_id=?'
        mysql.query(sql, [id]).then(result => {
            if (result.length === 0) {
                reject('文章不存在');
            } else {
                resolve(result[0])
            }
        }, error => {
            reject(error)
        })
    })
}
Article.prototype.create = function(title, content) {
    return new Promise((resolve, reject) => {

    // 校验数据
    try {
        if (title.length < 2) {
          reject('文章标题不能为空');
          return;
        }
  
        if (content.length < 10) {
            reject('文章内容不能低于10字');
            return;
          }
        
      } catch (error) {
        reject('系统错误，请稍后再试');
        return;
      }

      //执行语句
        let sql = 'INSERT INTO `blog_article`(`title`, `content`, `author_id`) VALUES (?,?,?)'
        mysql.query(sql, [title, content, 1]).then(result => {
            resolve(result)
        }, error => {
            reject(error)
        })
    })
}

module.exports = Article;
