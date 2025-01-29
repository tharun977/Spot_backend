import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={styles.navbar}>
      <Link to="/" style={styles.link}>Home</Link>
      <Link to="/parking-places" style={styles.link}>Parking Places</Link>
      <Link to="/payments" style={styles.link}>Payments</Link> {/* Payments link added back */}
      <Link to="/logs" style={styles.link}>Logs</Link>
    </nav>
  );
}

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-around",
    padding: "15px",
    background: "#333",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "18px",
  },
};
