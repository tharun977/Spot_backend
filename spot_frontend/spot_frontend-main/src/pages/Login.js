import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography, Card, Divider, FormControl, FormLabel } from "@mui/material";

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
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f4f6f8",
      }}
    >
      <Card sx={{ padding: 3, maxWidth: 400, width: "100%" }}>
        <Typography variant="h4" align="center" sx={{ marginBottom: 2 }}>
          Login
        </Typography>
        <form onSubmit={handleLogin}>
          <FormControl fullWidth margin="normal">
            <FormLabel htmlFor="userId">User ID</FormLabel>
            <TextField
              id="userId"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
              fullWidth
              variant="outlined"
              placeholder="Enter your user ID"
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <FormLabel htmlFor="password">Password</FormLabel>
            <TextField
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
              variant="outlined"
              placeholder="Enter your password"
            />
          </FormControl>
          {error && <Typography color="error" align="center" sx={{ marginTop: 1 }}>{error}</Typography>}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Login
          </Button>
        </form>
        <Divider sx={{ marginTop: 2 }} />
        {/* Optional: Include Forgot Password Link if needed */}
        {/* <Link href="/forgot-password" variant="body2" sx={{ display: "block", textAlign: "center", marginTop: 2 }}>Forgot Password?</Link> */}
      </Card>
    </Box>
  );
}
