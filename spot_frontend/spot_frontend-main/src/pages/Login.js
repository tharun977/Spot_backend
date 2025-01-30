import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography, Card, Divider, FormControl, FormLabel } from "@mui/material";
import axios from "axios";  // Import axios for API calls

export default function Login({ setRole }) {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // Send API request for authentication
      const response = await axios.post("http://127.0.0.1:8000/api/login/", {
        email: userId,
        password: password,
      });

      // If login is successful, store the token and user role in localStorage
      const { token, role } = response.data;
      localStorage.setItem("authToken", token);  // Save the token
      localStorage.setItem("userRole", role);    // Save the role
      setRole(role);                             // Set the role in the app state
      navigate("/");                             // Redirect to the home page

    } catch (error) {
      // Handle errors (e.g., invalid credentials)
      if (error.response && error.response.status === 401) {
        setError("Invalid ID or password. Please try again.");
      } else {
        setError("An error occurred. Please try again.");
      }
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
