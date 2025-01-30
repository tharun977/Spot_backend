import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ setRole }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/login/", { email, password });
            localStorage.setItem("accessToken", response.data.access);
            localStorage.setItem("refreshToken", response.data.refresh);
            localStorage.setItem("user", JSON.stringify(response.data.user));

            // Get the user role and set it in localStorage
            const userRole = response.data.user.role;
            localStorage.setItem("userRole", userRole);
            setRole(userRole); // Update the role state after login

            navigate("/");  // Redirect to the home page after successful login
        } catch (err) {
            setError("Invalid email or password");
        }
    };

    // Inline styles for a modern login page design
    const styles = {
        container: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            background: "linear-gradient(to right, #4facfe, #00f2fe)",  // Background gradient
            fontFamily: "'Arial', sans-serif",
        },
        formContainer: {
            background: "rgba(255, 255, 255, 0.9)",  // Semi-transparent background
            padding: "40px",
            borderRadius: "8px",
            boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
            textAlign: "center",
            width: "100%",
            maxWidth: "400px",
        },
        title: {
            marginBottom: "30px",
            fontSize: "2rem",
            color: "#333",
            fontWeight: "600",
        },
        input: {
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontSize: "1rem",
            outline: "none",
            boxSizing: "border-box",
            transition: "border 0.3s ease",
        },
        inputFocus: {
            borderColor: "#4facfe",
        },
        button: {
            width: "100%",
            padding: "14px",
            backgroundColor: "#4facfe",
            border: "none",
            borderRadius: "5px",
            color: "white",
            fontSize: "1.2rem",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
        },
        buttonHover: {
            backgroundColor: "#00f2fe",
        },
        error: {
            color: "red",
            fontSize: "1rem",
            marginTop: "15px",
        },
    };

    return (
        <div style={styles.container}>
            <div style={styles.formContainer}>
                <h2 style={styles.title}>Login</h2>
                <form onSubmit={handleLogin}>
                    <input 
                        style={styles.input} 
                        type="email" 
                        placeholder="Email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                    <input 
                        style={styles.input} 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                    <button
                        type="submit"
                        style={styles.button}
                        onMouseEnter={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
                        onMouseLeave={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
                    >
                        Login
                    </button>
                </form>
                {error && <p style={styles.error}>{error}</p>}
            </div>
        </div>
    );
};

export default Login;
