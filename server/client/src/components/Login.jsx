import { useState } from "react";
import styles from './styles/Login.css';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [formData, setFormData] = useState({ name: "", email: "" })
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleInput = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // logic for logging into backend


        try {
            const res = await fetch('localhost:8080/api/auth/login', {
                method: "POST", headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                navigate("/");
            } else {
                setMessage("Login Failed! Please Check Email and/or Password")
            }


        } catch (error) {
            setMessage(`The following error occured: ${error}`)
        }
    };
    return (
        <>
            <div className="formCont" id="formContainer" >
                <form action="/login" method="POST" className="form" onSubmit={handleSubmit} onChange={handleInput}>
                    <h1 className="formH1">Login</h1>

                    {/* Email Input */}
                    <label htmlFor="name" id="name-label">Name:</label><br />
                    <input type="text" name="name" id="name" placeholder="Enter Username/Email" value={formData.name} required /> <br />

                    {/* Email Input */}
                    <label htmlFor="email" id="email-label">Email:</label><br />
                    <input type="text" name="email" id="email" placeholder="Enter Email" onSubmit={formData.email} onChange={handleInput} required /> <br />

                    <button type="submit" className="formButton">Login</button><br />
                    <p>{message}</p>
                    <p>Dont have an account? <span id="register"><a href="/register">Register Here</a></span></p>
                </form>
            </div>
        </>
    )
}