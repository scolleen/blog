var articleModel = require('../model/article');

var Home = function () {};

// 渲染文章列表
Home.prototype.index = function (req, res) {
	let index = new articleModel();
	let page = req.query.page
	if (page === undefined) {
		page = 1
	} else {
		page = parseInt(page)
	}

	index.count().then(result => {
		if (page === 0) {
			index.list(1).then(response => {
				res.render('index', { list: response, count:result , current: 1, point: '当前已为第一页'})
			}, error => {
				console.log('请求错误')
			})
		} else if (page > result) {
			index.list(result).then(response => {
				res.render('index', { list: response, count:result , current: result, point: '当前已为最后页'})
			}, error => {
				console.log('请求错误')
			})
		} else {
			index.list(page).then(response => {
				res.render('index', { list: response, count:result , current: page, point: '第' + page +'页'})
			}, error => {
				console.log('请求错误')
			})
		}
	}, error => {
		console.log('请求错误')
	})
}
module.exports = new Home();
