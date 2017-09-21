var articleModel = require('../model/article');

var Home = function () {};

Home.prototype.index = function (req, res) {
    let index = new articleModel();
    index.list(1).then(result => {
        res.render('index', { list: result })
    }, error => {
        console.log('请求错误')
    })
}

module.exports = new Home();
