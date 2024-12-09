import React, { useState } from 'react';
import background from '../../source/background.png';
import { Link } from "react-router-dom";
import { userRegister } from '../../api';

export default function Register() {
    const [formData, setFormData] = useState({
        alias: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [buttonText, setButtonText] = useState("Register");
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setButtonText("Registering...");

        try {
            const resp = await userRegister(formData);

            if (resp.ok) {
                const data = await resp.json();
                console.log(data);
                setMessage("Registration successful!");
                setButtonText("Register");
            } else {
                setMessage("Registration failed. Please try again.");
                setButtonText("Register");
            }
        } catch (error) {
            setMessage("An error occurred: " + error.message);
            setButtonText("Register");
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Aside tag aligned to the left */}
            <aside className="w-full max-w-sm h-screen bg-white shadow-md flex items-center justify-center">
                {/* Centered form */}
                <div className="w-full max-w-xs">
                    <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Register</h2>
                    {message && (
                        <p className={`text-sm ${message.includes("successful") ? "text-green-500" : "text-red-500"} mb-4`}>
                            {message}
                        </p>
                    )}
                    <form onSubmit={handleFormSubmit} className="space-y-4">
                        <div className="flex flex-col">
                            <label htmlFor="username" className="text-sm font-medium text-gray-700">Alias</label>
                            <input
                                type="text"
                                name="alias"
                                id="alias"
                                value={formData.alias}
                                onChange={handleChange}
                                required
                                placeholder="Enter your username"
                                className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="Enter your email"
                                className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                placeholder="Enter your password"
                                className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                id="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                placeholder="Re-enter your password"
                                className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            {buttonText}
                        </button>
                       <p>Already have an account? <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Sign in
                    </a> here</p>
                    </form>
                </div>
            </aside>
        </div>
    );
}
