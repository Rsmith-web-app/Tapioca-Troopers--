import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/navbar";

export default function ProfilePage() {
    const [user, setUser] = useState({ alias: "", token: "" });
    const [posts, setPosts] = useState([]); // For displaying user posts
    const [message, setMessage] = useState("");

    // Form fields for creating/editing a post
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [media, setMedia] = useState(null);
    const [editingPostId, setEditingPostId] = useState(null); // Track post being edited

    const navigate = useNavigate();

    useEffect(() => {
        const savedUser = JSON.parse(localStorage.getItem("user"));
        if (!savedUser || !savedUser.token) {
            navigate("/login");
        } else {
            setUser(savedUser);
            fetchUserPosts(savedUser.alias, savedUser.token);
        }
    }, [navigate]);

    const fetchUserPosts = async (alias, token) => {
        try {
            const response = await fetch(`http://localhost:3060/api/posts/user/${alias}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                setPosts(data.posts);
            } else {
                setMessage("Failed to fetch user posts.");
            }
        } catch (error) {
            console.error("Error fetching user posts:", error);
            setMessage("An error occurred while fetching posts.");
        }
    };

    const handlePostSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        if (media) formData.append("media", media);

        const url = editingPostId
            ? `http://localhost:3060/api/post/${editingPostId}`
            : `http://localhost:3060/api/post`;
        const method = editingPostId ? "PUT" : "POST";

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
                body: formData,
            });

            if (response.ok) {
                setTitle("");
                setContent("");
                setMedia(null);
                setEditingPostId(null);
                setMessage(editingPostId ? "Post updated successfully!" : "Post created successfully!");
                fetchUserPosts(user.alias, user.token);
            } else {
                const errorData = await response.json();
                setMessage(errorData.message || "Failed to submit the post.");
            }
        } catch (error) {
            console.error("Error submitting post:", error);
            setMessage("An error occurred while submitting the post.");
        }
    };

    const handleEdit = (post) => {
        setTitle(post.title);
        setContent(post.content);
        setEditingPostId(post._id);
    };

    const handleDelete = async (postId) => {
        try {
            const response = await fetch(`http://localhost:3060/api/post/${postId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });

            if (response.ok) {
                setMessage("Post deleted successfully!");
                setPosts(posts.filter((post) => post._id !== postId)); // Update the posts state
            } else {
                const errorData = await response.json();
                setMessage(errorData.message || "Failed to delete the post.");
            }
        } catch (error) {
            console.error("Error deleting post:", error);
            setMessage("An error occurred while deleting the post.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-3 gap-6">
                {/* Left Column: User Profile and Create/Edit Post Form */}
                <div className="col-span-1 bg-white shadow-md rounded-lg p-6">
                    {/* User Profile Section */}
                    <div className="text-center mb-6">
                        <img
                            src="https://via.placeholder.com/100"
                            alt="Profile Avatar"
                            className="w-24 h-24 rounded-full mx-auto mb-4"
                        />
                        <h2 className="text-xl font-bold text-gray-800">{user.alias}</h2>
                        <p className="text-gray-600">Welcome back to your profile!</p>
                    </div>

                    {/* Create/Edit Post Form */}
                    <form onSubmit={handlePostSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Content</label>
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md"
                                rows="4"
                                required
                            ></textarea>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Media (Optional)</label>
                            <input
                                type="file"
                                accept="image/*,video/*"
                                onChange={(e) => setMedia(e.target.files[0])}
                                className="w-full"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                        >
                            {editingPostId ? "Update Post" : "Create Post"}
                        </button>
                    </form>
                </div>

                {/* Right Column: User Posts */}
                <div className="col-span-2 bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Posts</h2>
                    {message && <p className="text-sm text-red-500 mb-4">{message}</p>}
                    {posts.length > 0 ? (
                        <div className="grid grid-cols-2 gap-4">
                            {posts.map((post) => (
                                <div
                                    key={post._id}
                                    className="border border-gray-300 rounded-lg p-4 hover:shadow-md transition-shadow"
                                >
                                    <h3 className="text-lg font-bold">{post.title}</h3>
                                    <p className="text-gray-600 truncate">{post.content}</p>
                                    {post.mediaUrl && (
                                        <img
                                            src={post.mediaUrl}
                                            alt="Post Media"
                                            className="w-full h-32 object-cover mt-2 rounded-md"
                                        />
                                    )}
                                    <p className="text-sm text-gray-500 mt-2">
                                        Last updated: {new Date(post.updatedAt).toLocaleString()}
                                    </p>
                                    <div className="flex justify-between mt-4">
                                        <button
                                            onClick={() => handleEdit(post)}
                                            className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(post._id)}
                                            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500">You have not created any posts yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
