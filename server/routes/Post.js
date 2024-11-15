const express = require("express");
const Post = require("../models/post.model.js");
const { verifyToken } = require("../controllers/auth");

const router = express.Router();

// Create a new post
router.post("/post", verifyToken, async (req, res) => {
    const { title, content } = req.body;

    try {
        const newPost = new Post({ title, content, author: req.user.username });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ message: "Failed to create post", error: error.message });
    }
});

// Get all posts
router.get("/post", verifyToken, async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch posts", error: error.message });
    }
});

// Update a post
router.put("/post/:id", verifyToken, async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;

    try {
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Ensure the logged-in user is the author of the post
        if (post.author !== req.user.username) {
            return res.status(403).json({ message: "You can only edit your own posts" });
        }

        // Update the post
        post.title = title || post.title;
        post.content = content || post.content;
        await post.save();

        res.status(200).json({ message: "Post updated successfully", post });
    } catch (error) {
        res.status(500).json({ message: "Failed to update post", error: error.message });
    }
});

// Delete a post
router.delete("/post/:id", verifyToken, async (req, res) => {
    const { id } = req.params;

    try {
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Ensure the logged-in user is the author of the post
        if (post.author !== req.user.username) {
            return res.status(403).json({ message: "You can only delete your own posts" });
        }

        // Delete the post
        await post.remove();
        res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete post", error: error.message });
    }
});

module.exports = router;
