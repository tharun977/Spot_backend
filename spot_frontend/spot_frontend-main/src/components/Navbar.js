import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ setRole }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userRole"); // Clear stored role
    setRole(null); // Reset role state
    navigate("/login"); // Redirect to login page
  };

  return (
    <AppBar position="static" style={styles.navbar}>
      <Toolbar style={styles.toolbar}>
        {/* Branding - SPOT */}
        <Typography variant="h6" style={styles.brand}>
          SPOT
        </Typography>

        {/* Navigation Links */}
        <div style={styles.linksContainer}>
          <Link to="/" style={styles.link}>Home</Link>
          <Link to="/parking-places" style={styles.link}>Parking Places</Link>
          <Link to="/payments" style={styles.link}>Payments</Link>
          <Link to="/logs" style={styles.link}>Logs</Link>
        </div>

        {/* Logout Button */}
        <Button color="inherit" onClick={handleLogout} style={styles.logoutButton}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}

const styles = {
  navbar: {
    background: "#222", // Dark theme for contrast
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 30px", // Balanced spacing
  },
  brand: {
    fontWeight: "bold",
    fontSize: "22px",
    letterSpacing: "1px",
  },
  linksContainer: {
    display: "flex",
    gap: "20px", // Ensures proper spacing between links
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: "500",
    padding: "8px 15px", // Adds a small clickable area
    transition: "color 0.3s ease",
  },
  logoutButton: {
    fontSize: "16px",
    fontWeight: "500",
    marginLeft: "20px",
  },
};
