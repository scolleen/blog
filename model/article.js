var mysql = require('../config/mysql'); // 链接数据库

var Article = function () {};

// 读取文章列表
Article.prototype.list = function (page) {
    return new Promise((resolve, reject) => {
        let sql = 'SELECT * FROM `blog_article` ORDER BY `article_id` DESC LIMIT ?,10'
        mysql.query(sql, [(page - 1) * 10]).then(result => {
            resolve(result)
        }, error => {
            reject(error)
        })
    })
}
// 获取文章总数
Article.prototype.count = function () {
    return new Promise((resolve, reject)  => {
        let sql = "SELECT count(*) as acount FROM `blog_article` "
        mysql.query(sql).then(result => {
            let count = parseInt(result[0].acount) / 10
            if (count  === 0) {
                resolve(count)
            } else {
               resolve(Math.ceil(count))
            }
        }, error => {
            reject(error)
        })
    })
}
// 获取文章详情
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
// 新增文章
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
// 删除文章
Article.prototype.delete = function (id) {
    return new Promise((resole, reject) => {
        let sql = 'DELETE FROM `blog_article` WHERE article_id=?'
        mysql.query(sql, [id]).then(result => {
            resole(result)
        }, error => {
            reject(error)
        })
    })
}
// 修改文章内容
Article.prototype.update = function (title, content, id) {
  return new Promise((resole, reject) => {
      let sql = 'UPDATE `blog_article` SET title=?, content=? WHERE article_id=?'
    mysql.query(sql, [title, content, id]).then(result => {
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
        resole(result)
    }, error => {
        reject(error)
    })
  })
}
module.exports = Article;
