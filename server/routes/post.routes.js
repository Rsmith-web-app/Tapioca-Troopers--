import express from 'express';
import Post from '../models/post.model.js';
import User from '../models/user.model.js'; // Import the User model
import verifyJWT from '../controllers/authorization.js';
import Comment from '../models/comment.model.js';
import multer from 'multer';
import { uploadFileToBlob } from '../controllers/cloud.js';

const router = express.Router();
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 20 * 1024 * 1024 }, // Set file size limit to 20MB
});

// Create a new Post
router.post('/post', verifyJWT, upload.single('media'), async (req, res) => {
    const { title, content } = req.body;
    const alias = req.user.alias;
    let mediaUrl = null;
  
    try {
      // Find user by alias
      const user = await User.findOne({ alias });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Upload media if present
      if (req.file) {
        mediaUrl = await uploadFileToBlob(req.file);
      }
  
      // Create the new post
      const newPost = new Post({
        title,
        content,
        mediaUrl,
        author: user._id,
      });
      await newPost.save();
  
      res.status(201).json({ message: 'Post created successfully!', post: newPost });
    } catch (error) {
      console.error('Error creating post:', error);
      res.status(500).json({ message: `Failed to create post: ${error.message}` });
    }
  });

// Get all Posts
router.get('/post', async (req, res) => {
    try {
        const posts = await Post.find()
        .populate('author', 'alias')
        .sort({createdAt: -1});
        res.status(200).json({ posts });
    } catch (err) {
        res.status(500).json({ error: `An error occurred: ${err.message}` });
    }
});

// Get Posts by User Alias
router.get('/posts/user/:alias', verifyJWT, async (req, res) => {
    const { alias } = req.params;

    try {
        const posts = await Post.find()
            .populate({
                path: 'author',
                match: { alias }, // Match the alias in the populated user
                select: 'alias', // Only include the alias field from the User model
            })
            .sort({ createdAt: -1 });

        // Filter out posts where the populated author is null (no match for alias)
        const userPosts = posts.filter((post) => post.author);

        res.status(200).json({ posts: userPosts });
    } catch (error) {
        console.error('Error fetching user posts:', error);
        res.status(500).json({ message: 'Failed to fetch user posts' });
    }
});

// Update Post
router.put('/post/:id', verifyJWT, async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;

    try {
        // Find the post and populate the author field
        const post = await Post.findById(id).populate('author', 'alias');
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Ensure the logged-in user is the author of the post
        if (post.author.alias !== req.user.alias) {
            return res.status(403).json({ message: 'You can only edit your own posts' });
        }

        // Update the post
        post.title = title || post.title;
        post.content = content || post.content;
        await post.save();

        res.status(200).json({ message: 'Post updated successfully!', post });
    } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).json({ message: `Failed to update post: ${error.message}` });
    }
});

// Delete Post
router.delete('/post/:id', verifyJWT, async (req, res) => {
    const { id } = req.params;

    try {
        // Find the post and populate the author field
        const post = await Post.findById(id).populate('author', 'alias');
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Ensure the logged-in user is the author of the post
        if (post.author.alias !== req.user.alias) {
            return res.status(403).json({ message: 'You can only delete your own posts' });
        }

        // Delete the post
        await post.deleteOne();
        res.status(200).json({ message: 'Post deleted successfully!' });
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ message: `Failed to delete post: ${error.message}` });
    }
});

// Add Comments to a Post
router.post('/post/:id/comment', verifyJWT, async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;

    try {
        // Validate comment content
        if (!content || typeof content !== 'string') {
            return res.status(400).json({ message: 'Comment content must be a valid string' });
        }

        // Find the post
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Create and save the comment
        const newComment = new Comment({
            content,
            post: id,
            alias: req.user.alias, // Attach the alias of the commenter
        });
        await newComment.save();

        // Push the comment ID to the post's comments array
        post.comments.push(newComment._id);
        await post.save();

        res.status(201).json({ message: 'Comment added successfully!', comment: newComment });
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).json({ message: `Failed to add comment: ${error.message}` });
    }
});


//this route is specific for uploading profile photo

router.post('/avatar', verifyJWT, upload.single('avatar'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        const user = await User.findByIdAndUpdate(req.user._id, { avatar: req.file.filename }, {new: true })
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'Avatar uploaded successfully'})
    } catch (error) {
        res.status(500).json({server: `Caught an error: ${error}`})
    }
});

export default router;
