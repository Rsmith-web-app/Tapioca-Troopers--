import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/navbar';

export default function ProfilePage() {
    const [user, setUser] = useState({ alias: "", token: "" });
    const [post, setPost] = useState("");
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

        if (!post.trim()) {
            setMessage("Post content cannot be empty");
            return;
        }

        try {
            const response = await fetch("http://localhost:3060/api/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify({ content: post }),
            });

            if (response.ok) {
                setPost("");
                setMessage("Post submitted successfully!");
            } else {
                const errorData = await response.json();
                setMessage(errorData.error || "Failed to submit the post.");
            }
        } catch (error) {
            setMessage("An error occurred while submitting your post.");
            console.error(error);
        }
    };

    return (
    
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
                <Navbar />
            <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Welcome, {user.alias}!
                </h2>
                <p className="text-gray-600 mb-6">This is your profile page.</p>

                <form onSubmit={handlePostSubmit} className="space-y-4">
                    <div>
                        <textarea
                            placeholder="What's on your mind?"
                            value={post}
                            onChange={(e) => setPost(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            rows="4"
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Submit Post
                    </button>
                </form>
                {message && (
                    <p className={`mt-4 text-sm ${message.includes("successfully") ? "text-green-500" : "text-red-500"}`}>
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
}
