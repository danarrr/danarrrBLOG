const Blogs = require('../models/blog'),
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
router.get('/api/editArticle', function(req, res) {
    let options = req.query
    let whereStr = {
        '_id': options.id,
    }
    let updateStr = {
        $set: {
            'artiType': options.artiType,
            'article': options.article,
            'title': options.title,
            'meta':{
                'updateAt':new Date()
            }
        }
    }

    Blogs.update(whereStr, updateStr, function(err, result) {
        if (err) {
            console.log('Error:' + err);
            return;
        }   console.log(result)
        res.json({ success: true });
    })
})
router.get('/api/removeArticle', function(req, res) {
    let options = req.query
    Blogs.remove({'_id': options.id,},function(err, result) {
        res.json({ success: true });
    })
})
router.get('/api/getArticleList', (req, res) => {
    let options = !req.query.id ? { author: '李晓丹' } : { _id: req.query.id }
    Blogs.find(options, function(err, doc) {
        //先排序再倒序
        let compare = (property1, property2) => {
            return function(a, b) {
                let val1 = property2 ? a[property1][property2] : a[property1],
                    val2 = property2 ? b[property1][property2] : b[property1];
                return val1 - val2
            }
        }
        let docArr = doc.sort(compare('meta', 'updateAt')).reverse()

        res.json(paging(doc, parseInt(req.query.page), parseInt(req.query.pageNum)));
        //res返回给前端的数据 包括总条数
        //paging(doc,parseInt(req.page),parseInt(req.pageNum))
    })
})



module.exports = router;