import express from 'express';
import Post from "../models/post.model.js";
import verifyJWT from "../controllers/authorization.js";
import Comment from "../models/comment.model.js";
import multer from 'multer';
import {uploadToGoogleCloud, makeBucketPublic} from "./controllers/cloud.js";


const upload = multer({dest: '/upload'});
const router = express.Router();

//Create a new Post
router.post('/post', verifyJWT, upload.single('media'), async (req, res) => {
    let { title, content } = req.body;


    try {
        const newPost = new Post({ title, content, mediaUrl, alias: req.User.alias });
        let mediaUrl = null;
        if (req.file) {
            mediaUrl = await uploadToGoogleCloud(req.file);
        }
        await newPost.save();
        res.status(201).json({ message: 'post created' })
    } catch (error) {
        res.status(500).json({ error: `Failed to upload post: ${error.message}` })
    }
});

//Get all posts
router.get('/post', async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.status(200).json({ posts });
    } catch (err) {
        res.status(500).json({ error: `An error occurred: ${err.message}` });
    }
});

//Update Post
router.put('/post/:id', async (req, res) => {
    let { id } = req.params;
    let { title, content } = req.body;

    try {
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        //checks if user logged in is the author
        if (post.author !== req.User.alias) {
            return res.status(403).json({ error: 'You can only edit your own posts' });
        }
        //Update the post
        post.title = title || post.title;
        post.content = content || post.content;
        await post.save();

        res.status(200).json({ message: 'Post updated succesfully' });
    } catch (error) {
        res.status(500).json({ message: `Failed to update post: ${error.message}` })
    }
});

//Delete a post
router.delete('/post/:id', verifyJWT, async (req, res) => {
    const { id } = req.params;

    try {
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        //Ensure the logged in user is the author of the post
        if (post.alias !== req.user.alias) {
            return res.status(403).json({ message: 'you can only delete your own posts' });
        }
        await post.delete();
        res.status(200).json({ message: 'Post Deleted' })
    } catch (error) {
        res.status(500).json({ message: 'Faield to delete post' });
    }
});

//add comments
router.post('/post/:id/comment', verifyJWT, async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;

    try {
        if (!content || typeof content !== 'string') {
            return res.status(400).json({ message: 'Failed to post comment' });
        }

        const newComment = new Comment({
            content,
            post: id,
            alias: req.user.id,
            createdAt
        });

        await newComment.save();
        post.comments.push(newComment._id);
        await post.save();

        res.status(201).json({ message: 'Succesful' })
    } catch (error) {
        res.status(500).json({ message: 'Failed to add comment' })
    }
})

export default router;
