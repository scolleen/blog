var sha1 = require('sha1'); // sha1加密算法
var mysql = require('../config/mysql'); // 链接数据库

var User = function () {};

User.prototype.login = function (account, password) {
  return new Promise((resolve, reject) => {
    let sql = 'SELECT * FROM blog_user WHERE username=? LIMIT 1';
    mysql.query(sql, [account]).then(result => {
      if (result.length === 0) {
        reject('用户不存在');
        return;
      }

      try {
        let user = result[0];
        if (sha1(password) == user['password']) {
          resolve(user);
        } else {
          reject('用户名或密码错误');
        }
      } catch (error) {
        reject('用户名或密码错误');
      }
    }, error => {
      reject(error)
    })
  });
};

User.prototype.register = function (username, email, password) {
  return new Promise((resolve, reject) => {
    // 校验数据
    try {
      if (username.length < 2) {
        reject('用户名不得小于2位');
      }

      if (/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(email) === false) {
        reject('请输入正确的电子邮箱');
      }

      if (password.length < 6) {
        reject('密码不得小于6位');
      } else {
        password = sha1(password)
      }
      
    } catch (error) {
      reject('系统错误，请稍后再试');
    }

    let checkSQL = 'SELECT * FROM blog_user WHERE username=? OR email=?';
    mysql.query(checkSQL, [username, email]).then(result => {
      if (result.length > 0) {
        reject('用户名或电子邮箱已被占用');
        return;
      }

      let salt = parseInt(Math.random() * 100000);
      let sql = 'INSERT INTO `blog_user` (`username`, `email`, `password`, `salt`) VALUES (?, ?, ?, ?)';
      mysql.query(sql, [username, email, password, salt]).then(result => {
        resolve(result)
      }, error => {
        reject(error)
      })

    }, error => {
      reject(error)  
    })
  })
}

User.prototype.checkToken = function (user_id, user_token) {
  return new Promise((resolve, reject) => {
    let sql = 'SELECT * FROM blog_user WHERE user_id=?';
    mysql.query(sql, [user_id]).then(result => {
      if (result.length == 0) {
        reject('用户不存在');
      } else {
        let user = result[0];
        if (sha1(user_id.toString() + user['salt'].toString()) == user_token) {
          resolve(user);
        } else {
          reject('验证失败');
        }
      }
    })
  })
}

module.exports = User;
