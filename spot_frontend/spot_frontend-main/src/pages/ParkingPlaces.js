import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ParkingPlaces() {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/parking-places") // Backend API URL
      .then((response) => {
        setPlaces(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching parking places:", error);
        setError("Failed to load parking places.");
        setLoading(false);
      });
  }, []);

  if (loading) return <h2 style={styles.loading}>Loading...</h2>;
  if (error) return <h2 style={styles.error}>{error}</h2>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Parking Places</h1>
      {places.length === 0 ? (
        <p style={styles.noData}>No parking places available.</p>
      ) : (
        places.map((place) => (
          <Link
            to={`/parking-lots/${place.place_id}`}
            key={place.place_id}
            style={styles.link}
          >
            <div style={styles.card}>
              <h2>{place.place_name}</h2>
              <p><strong>Location:</strong> {place.location}</p>
              <p><strong>Capacity:</strong> {place.capacity}</p>
            </div>
          </Link>
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
  link: { textDecoration: "none", color: "inherit" },
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
