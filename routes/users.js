var express = require('express');
var router = express.Router();
var user = require('../controller/user');

var userModel = new (require('../model/user'))();

router.get('/login', (req, res) => {
    userModel.checkToken(req.cookies.user_id, req.cookies.user_token).then(result => {
      res.redirect('/');
    }, failed => {
      res.render('users/login', { title: '登录', error: '' });
    })
});

router.get('/register', (req, res) => {
    res.render('users/register', { title: '注册', error: '' });
});

router.get('/logout', (req, res) => {
  res.clearCookie('user_id');
  res.clearCookie('user_token');
  res.redirect('/users/login');
});

router.post('/login', user.login);
router.post('/register', user.register);

module.exports = router;
