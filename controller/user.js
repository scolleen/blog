var userModel = require('../model/user');
var sha1 = require('sha1');

var User = function () {};

var setUserToken = function(res, userid, salt) {
  let usertoken = sha1(userid + salt);
  let option = { expires: new Date(Date.now() + 86400 * 30 * 1000) };

  res.cookie('user_id', userid, option);
  res.cookie('user_token', usertoken, option);
};

User.prototype.login = function (req, res) {
  let user = new userModel();
  let account = req.body.account;
  let password = req.body.password;

  user.login(account, password).then((result) => {
    setUserToken(res, result['user_id'].toString(), result['salt'].toString());
    res.redirect('/');
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
