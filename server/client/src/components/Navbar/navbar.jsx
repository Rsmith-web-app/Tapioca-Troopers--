import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user")) || { alias: "Guest", avatar: "" };

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <nav className="bg-indigo-600 text-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Left: Avatar */}
                    <div className="flex items-center">
                        <img
                            src={user.avatar || "https://via.placeholder.com/40"}
                            alt="Profile Avatar"
                            className="w-10 h-10 rounded-full mr-4"
                        />
                        <span className="font-semibold">{user.alias}</span>
                    </div>

                    {/* Center: Navigation Links */}
                    <div className="flex space-x-4">
                        <Link
                            to="/profile"
                            className="text-white hover:bg-indigo-500 px-3 py-2 rounded-md text-sm font-medium"
                        >
                            Profile
                        </Link>
                        <Link
                            to="/feed"
                            className="text-white hover:bg-indigo-500 px-3 py-2 rounded-md text-sm font-medium"
                        >
                            Feed
                        </Link>
                    </div>

                    {/* Right: Logout */}
                    {user.token && (
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 hover:bg-red-600 px-3 py-2 rounded-md text-sm font-medium"
                        >
                            Logout
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
}
