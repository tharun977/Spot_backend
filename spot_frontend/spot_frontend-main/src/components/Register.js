import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = ({ setRole }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRoleInput] = useState("user"); // Default role is user
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/register/", { email, password, role });
            localStorage.setItem("accessToken", response.data.access);
            localStorage.setItem("refreshToken", response.data.refresh);
            localStorage.setItem("user", JSON.stringify(response.data.user));

            const userRole = response.data.user.role;
            localStorage.setItem("userRole", userRole);
            setRole(userRole);

            navigate("/");  // Redirect to home page
        } catch (err) {
            setError("Registration failed");
        }
    };

    const navigateToLogin = () => {
        navigate("/login");
    };

    const styles = {
        container: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            background: "linear-gradient(to right, #4facfe, #00f2fe)", 
            fontFamily: "'Arial', sans-serif",
        },
        formContainer: {
            background: "rgba(255, 255, 255, 0.9)",  
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
        error: {
            color: "red",
            fontSize: "1rem",
            marginTop: "15px",
        },
        loginButton: {
            marginTop: "15px",
            padding: "10px",
            backgroundColor: "#4facfe",
            border: "none",
            borderRadius: "5px",
            color: "white",
            cursor: "pointer",
            fontSize: "1rem",
            transition: "background-color 0.3s ease",
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.formContainer}>
                <h2 style={styles.title}>Register</h2>
                <form onSubmit={handleRegister}>
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
                    <select 
                        style={styles.input} 
                        value={role} 
                        onChange={(e) => setRoleInput(e.target.value)} 
                    >
                        <option value="user">User</option>
                        <option value="staff">Staff</option>
                        <option value="admin">Admin</option>
                    </select>
                    <button
                        type="submit"
                        style={styles.button}
                    >
                        Register
                    </button>
                </form>
                {error && <p style={styles.error}>{error}</p>}
                <button
                    style={styles.loginButton}
                    onClick={navigateToLogin}
                >
                    Already have an account? Login
                </button>
            </div>
        </div>
    );
};

export default Register;
