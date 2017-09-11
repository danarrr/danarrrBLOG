
const mongoose = require('mongoose'),
	 BlogSchema=require('../schemas/blog');

const BlogSchema = new Schema({
   	title:String,
	author:String,
	article:String,
	id:Number,
});
module.exports= mongoose.model('Blog',BlogSchema)