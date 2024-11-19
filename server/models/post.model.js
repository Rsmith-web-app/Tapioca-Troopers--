import mongoose from 'mongoose';
import { Schema } from 'mongoose';

//Schema for User Posts
const postSchema = new Schema({
    mediaUrl: {type: String, required: false},
    title: {type: String, required: true},
    content: {type: String, required: true},
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    comments: {type: mongoose.Schema.Types.ObjectId, ref: 'Comment', required: true},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
});

postSchema.pre('save', function (next) {
    if (this.isModified('content')) {
        this.updatedAt = Date,now();
    }
    next();
});

//export post schema
const Post = mongoose.model('Post', postSchema);
export default Post;