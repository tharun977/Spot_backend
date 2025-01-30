import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Button, TextField, Grid, Modal } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ParkingPlaces() {
  const [parkingSpots, setParkingSpots] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSpots, setFilteredSpots] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSpot, setEditingSpot] = useState(null);
  const [newSpot, setNewSpot] = useState({
    name: "",
    location: "",
    available: true,
    price: "",
    amenities: "",
  });
  const navigate = useNavigate();
  const isAdmin = true; // Set this based on the user's role in your app

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/parking-places/") // Fetch data from your API
      .then((response) => {
        setParkingSpots(response.data);
        setFilteredSpots(response.data);
      })
      .catch((error) => {
        console.error("Error fetching parking places:", error);
      });
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filtered = parkingSpots.filter((spot) =>
      spot.location.toLowerCase().includes(e.target.value.toLowerCase()) ||
      spot.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredSpots(filtered);
  };

  const handleViewDetails = (id) => {
    navigate(`/parking-places/${id}`);
  };

  const handleOpenModal = (spot = null) => {
    setEditingSpot(spot);
    setNewSpot(spot ? { ...spot } : { name: "", location: "", available: true, price: "", amenities: "" });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSpot((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSave = () => {
    if (editingSpot) {
      // Update parking place
      axios
        .put(`http://127.0.0.1:8000/api/parking-places/${editingSpot.id}/`, newSpot)
        .then((response) => {
          const updatedSpots = parkingSpots.map((spot) =>
            spot.id === editingSpot.id ? response.data : spot
          );
          setParkingSpots(updatedSpots);
          setFilteredSpots(updatedSpots);
          handleCloseModal();
        })
        .catch((error) => {
          console.error("Error updating parking place:", error);
        });
    } else {
      // Add new parking place
      axios
        .post("http://127.0.0.1:8000/api/parking-places/", newSpot)
        .then((response) => {
          setParkingSpots((prevState) => [...prevState, response.data]);
          setFilteredSpots((prevState) => [...prevState, response.data]);
          handleCloseModal();
        })
        .catch((error) => {
          console.error("Error adding parking place:", error);
        });
    }
  };

  return (
    <div style={styles.container}>
      <Typography variant="h4" style={styles.header}>Available Parking Spots</Typography>

      {/* Search bar */}
      <TextField
        label="Search by Location or Spot Name"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleSearch}
        style={styles.searchBar}
      />

      {/* Admin button to add new parking place */}
      {isAdmin && (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpenModal()}
          style={styles.addButton}
        >
          Add New Parking Spot
        </Button>
      )}

      {/* Parking spots grid */}
      <Grid container spacing={3} style={styles.gridContainer}>
        {filteredSpots.map((spot) => (
          <Grid item xs={12} sm={6} md={4} key={spot.id}>
            <Card style={styles.card}>
              <CardContent>
                <Typography variant="h6">{spot.name}</Typography>
                <Typography color="textSecondary">{spot.location}</Typography>
                <Typography>{spot.price}</Typography>
                <Typography>{spot.amenities}</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  style={styles.button}
                  onClick={() => handleViewDetails(spot.id)}
                >
                  View Details
                </Button>
                {isAdmin && (
                  <Button
                    variant="outlined"
                    color="secondary"
                    style={styles.button}
                    onClick={() => handleOpenModal(spot)}
                  >
                    Edit
                  </Button>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Modal for adding or editing parking place */}
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <div style={styles.modal}>
          <Typography variant="h5">{editingSpot ? "Edit Parking Spot" : "Add New Parking Spot"}</Typography>

          <TextField
            label="Spot Name"
            variant="outlined"
            fullWidth
            name="name"
            value={newSpot.name}
            onChange={handleInputChange}
            style={styles.input}
          />
          <TextField
            label="Location"
            variant="outlined"
            fullWidth
            name="location"
            value={newSpot.location}
            onChange={handleInputChange}
            style={styles.input}
          />
          <TextField
            label="Price"
            variant="outlined"
            fullWidth
            name="price"
            value={newSpot.price}
            onChange={handleInputChange}
            style={styles.input}
          />
          <TextField
            label="Amenities"
            variant="outlined"
            fullWidth
            name="amenities"
            value={newSpot.amenities}
            onChange={handleInputChange}
            style={styles.input}
          />
          <Button
            variant="contained"
            color="primary"
            style={styles.saveButton}
            onClick={handleSave}
          >
            Save
          </Button>
        </div>
      </Modal>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  header: {
    textAlign: "center",
    marginBottom: "20px",
  },
  searchBar: {
    marginBottom: "20px",
  },
  addButton: {
    marginBottom: "20px",
  },
  gridContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "15px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  },
  button: {
    marginTop: "10px",
  },
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    padding: "20px",
    width: "400px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  },
  input: {
    marginBottom: "15px",
  },
  saveButton: {
    marginTop: "20px",
  },
};
