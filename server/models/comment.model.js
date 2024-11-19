import mongoose, {Schema} from "mongoose";

//model for comments
const commentSchema = new Schema({
    content: {type: String, required: true},
    post: {type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true},
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    createdAt: {type: String, default: Date.now()},
});

const Comment = mongoose.model('Comment', commentSchema);
export default Comment;