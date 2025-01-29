import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Payments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/payments/") // Backend API URL
      .then((response) => {
        setPayments(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching payments:", error);
        setError("Failed to load payments.");
        setLoading(false);
      });
  }, []);

  if (loading) return <h2 style={styles.loading}>Loading...</h2>;
  if (error) return <h2 style={styles.error}>{error}</h2>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Payments</h1>
      {payments.length === 0 ? (
        <p style={styles.noData}>No payment records available.</p>
      ) : (
        payments.map((payment) => (
          <div key={payment.id} style={styles.card}>
            <h2>Payment ID: {payment.id}</h2>
            <p><strong>User:</strong> {payment.user}</p>
            <p><strong>Amount:</strong> ${payment.amount}</p>
            <p><strong>Date:</strong> {new Date(payment.date).toLocaleDateString()}</p>
            <p><strong>Status:</strong> {payment.status}</p>
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
};
