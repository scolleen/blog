var userModel = require('../model/user');

var User = function () {};

User.prototype.login = function (req, res) {
  let user = new userModel();
  let account = req.body.account;
  let password = req.body.password;

  user.login(account, password).then((result) => {
    res.redirect('/')
  }, (error) => {
    res.render('users/login', { title: '登录', error })
  });
};

User.prototype.register = function (req, res) {
  let user = new userModel();
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;

  user.register(username, email, password).then(result => {
    res.redirect('/')
  }, error => {
    res.render('users/register', { title: '注册', error })
  })
};

module.exports = new User();
