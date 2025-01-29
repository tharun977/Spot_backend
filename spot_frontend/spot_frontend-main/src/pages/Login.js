import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Hardcoded user credentials
  const hardcodedCredentials = [
    { user_id: "admin_user", password: "admin_pass", role: "admin" },
    { user_id: "staff_user", password: "staff_pass", role: "staff" },
    { user_id: "regular_user", password: "user_pass", role: "user" },
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    setError(null);

    // Check if the provided user_id and password match any hardcoded user
    const user = hardcodedCredentials.find(
      (cred) => cred.user_id === userId && cred.password === password
    );

    if (user) {
      // Successful login, store the role in local storage
      localStorage.setItem("userRole", user.role);

      // Redirect based on the user role
      if (user.role === "admin") {
        navigate("/admin-dashboard");
      } else if (user.role === "staff") {
        navigate("/staff-dashboard");
      } else {
        navigate("/user-dashboard");
      }
    } else {
      // Invalid credentials
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
