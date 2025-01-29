import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Logs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/logs") // Adjust API endpoint if needed
      .then((response) => {
        setLogs(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching logs:", error);
        setError("Failed to load logs.");
        setLoading(false);
      });
  }, []);

  if (loading) return <h2 style={styles.loading}>Loading...</h2>;
  if (error) return <h2 style={styles.error}>{error}</h2>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>System Logs</h1>
      {logs.length === 0 ? (
        <p style={styles.noData}>No logs available.</p>
      ) : (
        logs.map((log) => (
          <div key={log.id} style={styles.card}>
            <h2>{log.event}</h2>
            <p><strong>Timestamp:</strong> {log.timestamp}</p>
            <p><strong>User:</strong> {log.user}</p>
          </div>
        ))
      )}
    </div>
  );
}

const styles = {
  container: { padding: "20px", textAlign: "center" },
  title: { fontSize: "2rem", fontWeight: "bold", marginBottom: "15px" },
  loading: { fontSize: "1.5rem", color: "#666", textAlign: "center" },
  error: { fontSize: "1.5rem", color: "red", textAlign: "center" },
  noData: { fontSize: "1.2rem", color: "#888" },
  card: {
    background: "#f9f9f9",
    padding: "15px",
    margin: "10px auto",
    borderRadius: "10px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    width: "80%",
    transition: "0.3s",
  },
  cardHover: {
    transform: "scale(1.05)",
    boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.2)",
  },
};
