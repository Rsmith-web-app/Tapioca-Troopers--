const mongoose = require('mongoose');
const { Schema } = mongoose;

// Post schema definition
const postSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Middleware to update the `updatedAt` field
postSchema.pre('save', function (next) {
  if (this.isModified('content')) {
    this.updatedAt = Date.now();
  }
  next();
});

// Export the model
const Post = mongoose.model('Post', postSchema);
module.exports = Post;
