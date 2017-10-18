const mongoose = require('mongoose'),
    BlogSchema = require('../schemas/blog');

module.exports = mongoose.model('Blog', BlogSchema)
