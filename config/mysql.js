var mysql = require('mysql');   // 引用mysql模块
var baseConfig = require('./baseConfig')

let config = baseConfig.config
console.log(config)

var db = function () {};

// 连接池
db.prototype.pool = mysql.createPool(config);
db.prototype.query = function (sql, params) {
  return new Promise((resolve, reject) => {
    this.pool.getConnection((error, connection) => {
      if (error) {
        reject('数据库连接错误');
        return;
      }

      if (params === undefined) params = [];
      connection.query(sql, params, (error, result) => {
        if (error) {
          reject('语句执行失败');
          return;
        }

        // 释放连接
        connection.release();
        resolve(result);
      });
    })
  })
};

module.exports = new db();
