const mongoose = require('mongoose');

//model for comments
const commentsSchema = new mongoose.Schema({
   content: {type: String, required: true},
   post: {type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true},
   author: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
   createdAt: {type: Date, default: Date.now},
});

 const Comment = mongoose.model('Comments', commentsSchema);
 module.exports = Comment;