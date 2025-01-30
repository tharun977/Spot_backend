import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Navbar({ setRole }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userRole");
    setRole(null);
    navigate("/login"); // Redirect after logout
  };

  return (
    <AppBar position="static" sx={styles.navbar}>
      <Toolbar sx={styles.toolbar}>
        {/* Branding - SPOT */}
        <Typography variant="h6" sx={styles.brand}>
          SPOT
        </Typography>

        {/* Navigation Links */}
        <div style={styles.linksContainer}>
          <NavLink to="/" label="Home" location={location} />
          <NavLink to="/parking-places" label="Parking Places" location={location} />
          <NavLink to="/payments" label="Payments" location={location} />
          <NavLink to="/logs" label="Logs" location={location} />
        </div>

        {/* Logout Button */}
        <Button color="inherit" onClick={handleLogout} sx={styles.logoutButton}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}

// Custom NavLink component with active state
const NavLink = ({ to, label, location }) => (
  <Link to={to} style={{ 
    ...styles.link, 
    borderBottom: location.pathname === to ? "2px solid #fff" : "none" 
  }}>
    {label}
  </Link>
);

// Styling object
const styles = {
  navbar: {
    background: "#1E1E1E",
    boxShadow: "none",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 30px",
  },
  brand: {
    fontWeight: "bold",
    fontSize: "22px",
    letterSpacing: "1px",
  },
  linksContainer: {
    display: "flex",
    gap: "20px",
  },
  link: {
    color: "#FFFFFF",
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: "500",
    padding: "8px 15px",
    transition: "color 0.3s ease",
  },
  logoutButton: {
    fontSize: "16px",
    fontWeight: "500",
    marginLeft: "20px",
  },
};

