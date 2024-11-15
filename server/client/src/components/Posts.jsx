import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../modules/UserContext";
import './styles/Posts.css';

const Posts = () => {
    const { user } = useContext(UserContext);
    const [posts, setPosts] = useState([]);
    const [formData, setFormData] = useState({ title: "", content: "" });
    const [editingPost, setEditingPost] = useState(null); // Track the post being edited
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch("http://localhost:8080/api/post", {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                });
                const data = await res.json();
                setPosts(data);
            } catch (error) {
                console.error("Failed to fetch posts:", error);
            }
        };

        fetchPosts();
    }, []);

    const handleInput = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const endpoint = editingPost
            ? `http://localhost:8080/api/post/${editingPost._id}`
            : "http://localhost:8080/api/post";

        const method = editingPost ? "PUT" : "POST";

        try {
            const res = await fetch(endpoint, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                const updatedPost = await res.json();
                if (editingPost) {
                    setPosts(posts.map((post) => (post._id === updatedPost.post._id ? updatedPost.post : post)));
                    setEditingPost(null); // Exit editing mode
                } else {
                    setPosts([updatedPost, ...posts]); // Add new post
                }
                setFormData({ title: "", content: "" });
                setMessage("Post saved successfully!");
            } else {
                setMessage("Failed to save post.");
            }
        } catch (error) {
            console.error("Error saving post:", error);
            setMessage("An error occurred while saving the post.");
        }
    };

    const handleDelete = async (id) => {
        try {
            const res = await fetch(`http://localhost:8080/api/post/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (res.ok) {
                setPosts(posts.filter((post) => post._id !== id));
                setMessage("Post deleted successfully.");
            } else {
                setMessage("Failed to delete post.");
            }
        } catch (error) {
            console.error("Error deleting post:", error);
            setMessage("An error occurred while deleting the post.");
        }
    };

    return (
        <div className="posts-container">
            <h2>Your Posts</h2>

            <form className="post-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    placeholder="Post Title"
                    value={formData.title}
                    onChange={handleInput}
                    required
                />
                <textarea
                    name="content"
                    placeholder="Write your post content here..."
                    value={formData.content}
                    onChange={handleInput}
                    required
                ></textarea>
                <button type="submit">{editingPost ? "Update Post" : "Create Post"}</button>
            </form>
            {message && <p className="message">{message}</p>}

            <div className="posts-list">
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <div key={post._id} className="post">
                            <h3>{post.title}</h3>
                            <p>{post.content}</p>
                            <span>By {post.author}</span>
                            {post.author === user.name && (
                                <div className="post-actions">
                                    <button onClick={() => setEditingPost(post)}>Edit</button>
                                    <button onClick={() => handleDelete(post._id)}>Delete</button>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <p>No posts yet.</p>
                )}
            </div>
        </div>
    );
};

export default Posts;
