import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login({ authToken, AuthUser }) {
    const [formData, setFormData] = useState({
        alias: "",
        email: "",
        password: "",
    });

    const [buttonText, setButtonText] = useState("Submit");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setButtonText("Submitting..");

        try {
            const resp = await fetch("http://localhost:3060/api/login", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (resp.ok) {
                const data = await resp.json();
                console.log(data);
                localStorage.setItem("user", JSON.stringify({ alias: data.alias, token: data.token }));
                
                setButtonText("Redirecting..");
                setTimeout(() => {
                    navigate("/profile");
                }, 1000); // Delay

                if (!resp.ok) {
                    const errorData = await resp.json();
                    console.log(errorData); // Debugging
                    setMessage(errorData.error || "Error submitting form");
                    setButtonText("Submit");
                }

            } else {
                setMessage("Error submitting form");
                setButtonText("Submit");
            }
        } catch (error) {
            setMessage("An error occurred: " + error.message);
            setButtonText("Submit");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-12 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
                <h2 className="text-3xl font-extrabold text-center text-gray-900">Sign in to your account</h2>
                {message && (
                    <p className="text-red-500 text-center mt-4">{message}</p>
                )}
                <form onSubmit={handleFormSubmit} className="mt-8 space-y-6">
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="alias" className="sr-only">Alias</label>
                            <input
                                type="text"
                                name="alias"
                                id="alias"
                                value={formData.alias}
                                onChange={handleChange}
                                required
                                placeholder="Alias"
                                className="appearance-none rounded-t-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="sr-only">Email address</label>
                            <input
                                type="text"
                                name="email"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="Email address"
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                placeholder="Password"
                                className="appearance-none rounded-b-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            {buttonText}
                        </button>
                    </div>
                </form>
                <p className="mt-6 text-center text-sm text-gray-600">
                    Don't have an account?{' '}
                    <a href="/sign-up" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );
}
