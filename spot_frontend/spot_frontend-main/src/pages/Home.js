import React from "react";

export default function Home() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome to Spot</h1>
      <p style={styles.subtitle}>Your Smart Parking Solution</p>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    background: "linear-gradient(to right, #4facfe, #00f2fe)",
    color: "white",
  },
  title: { fontSize: "3rem", fontWeight: "bold" },
  subtitle: { fontSize: "1.5rem", marginTop: "10px" },
};
