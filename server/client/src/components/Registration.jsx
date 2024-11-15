// Registration.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './styles/Registration.css';

export default function Registration() {
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleInput = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:8080/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setMessage("Registration Successful! Redirecting to login...");
                setTimeout(() => navigate("/login"), 2000); // Navigate to login page after 2 seconds
            } else {
                const errorData = await res.json();
                setMessage(`Registration Failed: ${errorData.message || "Unknown error"}`);
            }
        } catch (error) {
            setMessage(`The following error occurred: ${error}`);
        }
    };

    return (
        <div className="registrationFormCont" id="registrationFormContainer">
            <form
                action="/register"
                method="POST"
                className="registrationForm"
                onSubmit={handleSubmit}
                onChange={handleInput}
            >
                <h1 className="registrationFormH1">Register</h1>

                <label htmlFor="name" className="registrationLabel">Name:</label><br />
                <input
                    type="text"
                    name="name"
                    id="name"
                    className="registrationInput"
                    placeholder="Enter Username"
                    value={formData.name}
                    required
                /> <br />

                <label htmlFor="email" className="registrationLabel">Email:</label><br />
                <input
                    type="email"
                    name="email"
                    id="email"
                    className="registrationInput"
                    placeholder="Enter Email"
                    value={formData.email}
                    required
                /> <br />

                <label htmlFor="password" className="registrationLabel">Password:</label><br />
                <input
                    type="password"
                    name="password"
                    id="password"
                    className="registrationInput"
                    placeholder="Enter Password"
                    value={formData.password}
                    required
                /> <br />

                <button type="submit" className="registrationButton">Register</button><br />
                <p className="registrationMessage">{message}</p>
                <p id="loginLink">Already have an account? <a href="/login">Login Here</a></p>
            </form>
        </div>
    );
}
