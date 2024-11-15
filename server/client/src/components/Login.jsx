// Login.jsx
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../modules/UserContext";
import './styles/Login.css';

export default function Login() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleInput = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await fetch("http://localhost:8080/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            console.log("Response status:", res.status); // Debugging
            if (res.ok) {
                const data = await res.json();
                setUser({ name: data.username });
                navigate("/profile");
            } else if (res.status === 401) {
                setMessage("Invalid email or password. Please try again.");
            } else if (res.status === 500) {
                setMessage("Server error. Please try again later.");
            } else {
                setMessage("Unexpected error. Please try again.");
            }
        } catch (error) {
            setMessage(`The following error occurred: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="formCont" id="formContainer">
            <form
                action="/login"
                method="POST"
                className="form"
                onSubmit={handleSubmit}
                onChange={handleInput}
            >
                <h1 className="formH1">Login</h1>

                <label htmlFor="email" id="email-label">Email:</label><br />
                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter Email"
                    value={formData.email}
                    onChange={handleInput}
                    required
                /> <br />

                <label htmlFor="password" id="password-label">Password:</label><br />
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter Password"
                    value={formData.password}
                    onChange={handleInput}
                    required
                /> <br />

                <button type="submit" className="formButton" disabled={isLoading}>
                    {isLoading ? "Logging in..." : "Login"}
                </button><br />
                <p>{message}</p>
                <p>Don't have an account? <span id="register"><a href="/register">Register Here</a></span></p>
            </form>
        </div>
    );
}
