const mongoose=require('mongoose')
let BlogSchema=new mongoose.Schema({
	title:String,
	author:String,
	article:String,
	id:Number,
	meta:{
		createAt:{//新建时间
			type:Date,
			default:Date.now()
		},
		updateAt:{//更新时间
			type:Date,
			default:Date.now()
		},
	}
})

BlogSchema.pre('save',function(next){//每次数据存储之前都会调用这个方法
	if(this.isNew){
		this.meta.createAt=this.meta.updateAt=Date.now()
	}else{
		this.meta.updateAt=Date.now()
	}
	next()
})
BlogSchema.statics={
	fetch:function(cb){
		return this
			.find({})//查询
			.sort('meta.updateAt')//排序
			exec(cb)//回调
	},
	findById:function(cb){
		return this
			.findOne({_id:id})
			exec(cb)
	}
}
module.exports=BlogSchema//导出模块