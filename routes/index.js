var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/calc', (req, res) => {
  let result = parseFloat(req.body.left) + parseFloat(req.body.right)
  res.send('{"result": ' + result + '}')
})

module.exports = router;
