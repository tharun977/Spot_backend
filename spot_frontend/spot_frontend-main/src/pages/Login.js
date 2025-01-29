import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ setRole }) {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError(null);

    // Hardcoded login credentials for testing
    const users = {
      admin: { userId: "admin", password: "admin123", role: "admin" },
      staff: { userId: "staff", password: "staff123", role: "staff" },
      user: { userId: "user", password: "user123", role: "user" },
    };

    // Check if the entered userId and password match
    const user = Object.values(users).find(
      (u) => u.userId === userId && u.password === password
    );

    if (user) {
      localStorage.setItem("userRole", user.role); // Store role in localStorage
      setRole(user.role); // Set role in state
      navigate("/"); // Redirect to home page
    } else {
      setError("Invalid ID or password. Please try again.");
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
        <button type="submit" style={styles.button}>Login</button>
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
