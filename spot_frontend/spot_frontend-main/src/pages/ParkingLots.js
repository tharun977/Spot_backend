import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

export default function ParkingLots() {
  const { placeId } = useParams(); // Get the selected place's ID
  const [lots, setLots] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/parking-lots?placeId=${placeId}`)
      .then(response => setLots(response.data))
      .catch(error => console.error("Error fetching parking lots:", error));
  }, [placeId]);

  return (
    <div style={styles.container}>
      <motion.h1 
        style={styles.title} 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
      >
        Parking Lots
      </motion.h1>

      {lots.map(lot => (
        <motion.div 
          key={lot.lot_id} 
          style={styles.card}
          whileHover={{ scale: 1.05 }}
        >
          <h2>Lot ID: {lot.lot_id}</h2>
          <p>Status: {lot.status}</p>
        </motion.div>
      ))}
    </div>
  );
}

const styles = {
  container: { padding: "20px" },
  title: { fontSize: "2rem", fontWeight: "bold" },
  card: { background: "#f4f4f4", padding: "15px", margin: "10px 0", borderRadius: "10px" },
};
