const Blogs = require('../commen/models/blog'),
    _ = require('underscore'),
    router = require('express').Router(), //路由
    paging = require('../commen/js/paging'); //分页
// fs= require("fs");

router.post('/api/addArticle', function(req, res) {
    let blog = new Blogs(req.body)
    blog.save().then((err, data) => {
        if (err) {
            console.log(err)
        }
    })
    res.json({ success: true });
    // var blogObj=req.body.blog
    // _blog=_.extended(blog,blogObj)//防止重複
})
router.get('/api/addComment', function(req, res) {
    let options = req.query,
        commentOld
    let whereStr = {
        '_id': options.id,
    }
    Blogs.find({ _id: options.id }, function(err, doc) {
        commentOld = !doc[0].comment ? [] : doc[0].comment
        let commentNew = JSON.parse(options.comment)
        let updateStr = {
            'comment': commentOld.concat(commentNew)
        }

        Blogs.update(whereStr, updateStr, function(err, result) {
            if (err) {
                console.log('Error:' + err);
                return;
            }
            console.log(result)
            res.json({ success: true });
        })
    })
})
router.get('/api/editArticle', function(req, res) {
    let options = req.query,
        commentOld
    let whereStr = {
        '_id': options.id,
    }

    let updateStr = {

        'artiType': options.artiType,
        'article': options.article,
        'title': options.title,
        'meta': {
            'updateAt': new Date()
        },

    }

    Blogs.update(whereStr, updateStr, function(err, result) {
        if (err) {
            console.log('Error:' + err);
            return;
        }
        // console.log(result)
        res.json({ success: true });
    })

})
router.get('/api/removeArticle', function(req, res) {
    let options = req.query
    Blogs.remove({ '_id': options.id, }, function(err, result) {
        res.json({ success: true });
    })
})
router.get('/api/getArticleList', (req, res) => {
    let options = !req.query.id ? { author: '李晓丹' } : { _id: req.query.id }
    Blogs.find(options, function(err, doc) {
        console.log(doc)
        let arr = doc.map(item => {
            return {
                title: item.title,
                artiType: item.artiType,
                articleShort: item.articleShort,
                author: item.author,
                comment: item.comment,
                meta: item.meta,
                _id: item._id
            }
        })
        //先排序再倒序
        let compare = (property1, property2) => {
            return function(a, b) {
                let val1 = property2 ? a[property1][property2] : a[property1],
                    val2 = property2 ? b[property1][property2] : b[property1];
                return val1 - val2
            }
        }
        let docArr = arr.sort(compare('meta', 'updateAt')).reverse()

        res.json(paging(arr, parseInt(req.query.page), parseInt(req.query.pageNum)));
        //res返回给前端的数据 包括总条数
        //paging(doc,parseInt(req.page),parseInt(req.pageNum))
    })
})
router.get('/api/getArticleDetail', (req, res) => {
    let options = !req.query.id ? { author: '李晓丹' } : { _id: req.query.id }
    Blogs.find(options, function(err, doc) {
        res.json({success:true,data:doc});
    })
})


module.exports = router;