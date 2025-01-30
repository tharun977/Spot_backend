import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ParkingPlaces from "./pages/ParkingPlaces";
import Payments from "./pages/Payments";
import Logs from "./pages/Logs";
import Login from "./pages/Login"; // Import Login page

export default function App() {
  const [role, setRole] = useState(localStorage.getItem("userRole") || null); // Keep role on refresh

  useEffect(() => {
    if (role) {
      localStorage.setItem("userRole", role); // Ensure role persists
    }
  }, [role]);

  return (
    <Router>
      {/* Show Navbar only when logged in */}
      {role && <Navbar setRole={setRole} />}

      <Routes>
        {/* Redirect to Login only if not logged in */}
        <Route path="/" element={role ? <Home role={role} /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login setRole={setRole} />} />
        <Route path="/parking-places" element={role ? <ParkingPlaces /> : <Navigate to="/login" />} />
        <Route path="/payments" element={role ? <Payments /> : <Navigate to="/login" />} />
        <Route path="/logs" element={role ? <Logs /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}
