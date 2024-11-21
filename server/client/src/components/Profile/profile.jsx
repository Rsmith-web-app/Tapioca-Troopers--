import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/navbar';

export default function ProfilePage() {
    const [user, setUser] = useState({ alias: "", token: "" });
    const [title, setTitle] = useState(""); // For the post title
    const [post, setPost] = useState(""); // For the post content
    const [media, setMedia] = useState(null); // For media upload
    const [message, setMessage] = useState("");
 
    const navigate = useNavigate();

    // Fetch user profile from local storage or token verification
    useEffect(() => {
        const savedUser = JSON.parse(localStorage.getItem("user"));
        if (!savedUser || !savedUser.token) {
            navigate("/login"); // Redirect to login if no user is found
        } else {
            setUser(savedUser);
        }
    }, [navigate]);

    const handlePostSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim() || !post.trim()) {
            setMessage("Title and content cannot be empty");
            return;
        }

        const formData = new FormData();
        formData.append("title", title.trim());
        formData.append("content", post.trim());
        if (media) formData.append("media", media); // Upload media file

        try {
            const response = await fetch("http://localhost:3060/api/post", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${user.token}`, // Send token for authentication
                },
                body: formData,
            });

            if (response.ok) {
                setTitle("");
                setPost("");
                setMedia(null);
                setMessage("Post created successfully!");
            } else {
                const errorData = await response.json();
                setMessage(errorData.error || "An error occurred while creating your post.");
            }
        } catch (error) {
            setMessage("An error occurred: " + error.message);
            console.error(error);
        }
    };

    const handleMediaChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setMedia(file);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
            <Navbar />
            <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Welcome, {user.alias}!
                </h2>
                <p className="text-gray-600 mb-6">Create a new post below.</p>

                <form onSubmit={handlePostSubmit} className="space-y-4">
                    {/* Title Field */}
                    <div>
                        <label
                            htmlFor="title"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Post Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            placeholder="Enter post title"
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    {/* Content Field */}
                    <div>
                        <label
                            htmlFor="content"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Post Content
                        </label>
                        <textarea
                            id="content"
                            placeholder="What's on your mind?"
                            value={post}
                            onChange={(e) => setPost(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            rows="4"
                        ></textarea>
                    </div>

                    {/* Media Upload */}
                    <div>
                        <label
                            htmlFor="media"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Upload Media (Optional)
                        </label>
                        <input
                            type="file"
                            id="media"
                            accept="image/*,video/*"
                            onChange={handleMediaChange}
                            className="mt-1 block w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-md file:border-0
                                file:text-sm file:font-semibold
                                file:bg-indigo-50 file:text-indigo-600
                                hover:file:bg-indigo-100"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Submit Post
                    </button>
                </form>
                {message && (
                    <p
                        className={`mt-4 text-sm ${
                            message.includes("successfully")
                                ? "text-green-500"
                                : "text-red-500"
                        }`}
                    >
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
}
