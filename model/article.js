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

module.exports = Article;
