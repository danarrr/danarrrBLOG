const Blogs = require('../models/blog'),
    _ = require('underscore'),
    router = require('express').Router(); //路由


router.post('/api/addArticle', function(req, res) {
    let blog = new Blogs(req.body)
    blog.save().then((err, data)=> {
        if (err) {
            console.log(err)
        }
    })
    res.json({ success: true });
    // var blogObj=req.body.blog
    // _blog=_.extended(blog,blogObj)//防止重複
})
router.get('/api/getArticleList', (req, res)=> {
    // console.log(req.body)
    Blogs.find({author:'李晓丹'},function(err,doc){
        res.json({ success: true,data:doc });
    })


    //  new Blogs(req.body).find({}, function(err, docs) {
    //     console.log(docs);
    // }).then((err, data) => {
    //     console.log(data)
    // })
})

module.exports = router;