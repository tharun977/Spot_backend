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
        <div style={styles.links}>
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
    background: "#333", // Dark theme
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: "0 20px", // Ensures spacing
  },
  brand: {
    fontWeight: "bold",
    fontSize: "24px",
  },
  links: {
    display: "flex",
    gap: "30px", // Ensures proper spacing
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "18px",
  },
  logoutButton: {
    marginLeft: "30px",
  },
};
