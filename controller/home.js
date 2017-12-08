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
        index.list(page).then(response => {
            res.render('index', { list: response, count:result , current: page, point: '第' + page +'页'})
        }, error => {
            console.log('请求错误')
        })
	}, error => {
		console.log('请求错误')
	})
}
Home.prototype.list = function (req, res) {
  let index = new articleModel();
  let page = req.query.page
  if (req.cookies.user_token === undefined) {
    window.location.href = '/'
    return
  }
  if (page === undefined) {
    page = 1
  } else {
    page = parseInt(page)
  }

  index.count().then(result => {
    index.list(page).then(response => {
      res.render('management', { list: response, count:result , current: page, point: '第' + page +'页', title: '文章管理'})
    }, error => {
      console.log('请求错误')
    })
  }, error => {
    console.log('请求错误')
  })
}

// 获取评论列表
Home.prototype.comment = function () {

}

module.exports = new Home();
