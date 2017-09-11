const Blogs = require('../models/blog'),
    _ = require('underscore'),
    router = require('express').Router(); //路由


router.post('/api/addArticle',function(req,res){
    let blog=new Blogs(req.body)
    blog.save().then(function(err, data) {
        if(err){

        }

        })
    res.json({success:true});
    // var blogObj=req.body.blog
    // _blog=_.extended(blog,blogObj)//防止重複
})
module.exports = router;