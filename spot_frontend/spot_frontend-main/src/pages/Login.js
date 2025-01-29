import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // New state for loading
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true); // Start loading

    try {
      const response = await axios.post("http://localhost:8000/api/login", { // Change URL to Django's endpoint
        user_id: userId,
        password: password,
      });

      if (response.data.success) {
        localStorage.setItem("userRole", response.data.role); // Store role in local storage

        // Redirect based on user role
        if (response.data.role === "admin") {
          navigate("/admin-dashboard");
        } else if (response.data.role === "staff") {
          navigate("/staff-dashboard");
        } else {
          navigate("/user-dashboard");
        }
      } else {
        setError("Invalid ID or password. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Something went wrong. Try again later.");
    } finally {
      setLoading(false); // Stop loading after the request completes
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Login</h2>
      <form onSubmit={handleLogin} style={styles.form}>
        <input
          type="text"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button} disabled={loading}> {/* Disable button during loading */}
          {loading ? "Logging in..." : "Login"}
        </button>
        {error && <p style={styles.error}>{error}</p>}
      </form>
    </div>
  );
}

const styles = {
  container: { textAlign: "center", marginTop: "50px" },
  title: { fontSize: "24px", marginBottom: "20px" },
  form: { display: "flex", flexDirection: "column", alignItems: "center" },
  input: {
    width: "300px",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    width: "150px",
    padding: "10px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  },
  error: { color: "red", marginTop: "10px" },
};
