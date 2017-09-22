//app.js 入口文件
let express = require('express'),
    path = require('path'),
    mongoose=require('mongoose'),
    bodyParser = require('body-parser'),
    app = express();

app.use('/', express.static(path.join(__dirname + '/public'))); //视图目录
app.set('port',(process.env.port || 3000))//设置端口

app.use(bodyParser.json());//有表单提交时，对表单数据格式化
app.use(bodyParser.urlencoded({extended: true}));

app.use('/',require('./connector/myPort'));

// 连接数据库
mongoose.connect('mongodb://localhost:27017/blogData');
mongoose.connection.on('error',console.log.bind(console,'connection error:'));

//页面路由
//index page
app.get('/',function(req,res){
	res.render('index',{
		title:'danarrrBLOG 首页'
	})
})
//
// app.get('/enter.html',function(req,res){
// 	res.render('enter',{
// 		title:'danarrrBLOG 后台录入'
// 	})
// })
app.listen(app.get('port'), ()=>{//监听端口
	console.log('Server started:http://localhost:' + app.get('port') + '/');
});
