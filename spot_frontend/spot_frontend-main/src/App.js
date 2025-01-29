import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ParkingPlaces from "./pages/ParkingPlaces";
import Payments from "./pages/Payments";
import Logs from "./pages/Logs";
import Login from "./pages/Login"; // Import Login page

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/parking-places" element={<ParkingPlaces />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/logs" element={<Logs />} />
        <Route path="/login" element={<Login />} /> {/* Add login route */}
      </Routes>
    </Router>
  );
}
