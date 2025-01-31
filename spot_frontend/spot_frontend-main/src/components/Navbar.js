import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Navbar({ setRole }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("accessToken") !== null) {
      setIsAuth(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userRole");
    setRole(null);
    setIsAuth(false);
    navigate("/login");
  };

  return (
    <AppBar position="static" sx={styles.navbar}>
      <Toolbar sx={styles.toolbar}>
        {/* Branding */}
        <Typography variant="h6" sx={styles.brand}>
          SPOT
        </Typography>

        {/* Navigation Links */}
        <div style={styles.linksContainer}>
          {isAuth && <NavLink to="/" label="Home" location={location} />}
          {isAuth && <NavLink to="/parking-places" label="Parking Places" location={location} />}
          {isAuth && <NavLink to="/payments" label="Payments" location={location} />}
          {isAuth && <NavLink to="/logs" label="Logs" location={location} />}
        </div>

        {/* Authentication Buttons */}
        <div>
          {isAuth ? (
            <Button color="inherit" onClick={handleLogout} sx={styles.logoutButton}>
              Logout
            </Button>
          ) : (
            <Button color="inherit" component={Link} to="/login" sx={styles.loginButton}>
              Login
            </Button>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}

// Custom NavLink component with active state
const NavLink = ({ to, label, location }) => (
  <Link
    to={to}
    style={{
      ...styles.link,
      borderBottom: location.pathname === to ? "2px solid #fff" : "none",
    }}
  >
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
  loginButton: {
    fontSize: "16px",
    fontWeight: "500",
  },
};
