const Blogs = require('../models/blog'),
    _ = require('underscore'),
    router = require('express').Router(); //路由
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

router.get('/api/getArticleList', (req, res) => {
    Blogs.find({ author: '李晓丹' }, function(err, doc) {
        res.json({ success: true, data: doc });
    })
    // .skip(2).limit(8)
})

// fs.readFile('../../blogArticle/test.txt',{flag:'r+',encoding:'utf-8'},function(err,data){//读取markdown文件夹
//     if(err){
//         console.log("bad")
//     }else{
//         console.log("读取第一个文件成功");
//         console.log(data);
//     }
// })

module.exports = router;