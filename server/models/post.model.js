import mongoose from 'mongoose';
import { Schema } from 'mongoose';

//Schema for User Posts
const postSchema = new Schema({
    mediaUrl: {type: String, required: false},
    title: {type: String, required: true},
    content: {type: String, required: true},
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}, // Reference User model
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}], // Array of Comment references
    category: {type: String, required: false},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
});

postSchema.pre('save', function (next) {
    if (this.isModified('content')) {
        this.updatedAt = Date.now();
    }
    next();
});

const Post = mongoose.model('Post', postSchema);
export default Post;
