var express = require('express');
var router = express.Router();

var home = require('../controller/home');

router.get('/', home.index);

module.exports = router;
