import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ParkingPlaces from "./pages/ParkingPlaces";
import Payments from "./pages/Payments";
import Logs from "./pages/Logs";
import Login from "./pages/Login"; // Import Login page

export default function App() {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const storedRole = localStorage.getItem("userRole"); // Retrieve role from localStorage
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={role ? <Home role={role} /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<Login setRole={setRole} />} />
        <Route
          path="/parking-places"
          element={role ? <ParkingPlaces /> : <Navigate to="/login" />}
        />
        <Route
          path="/payments"
          element={role ? <Payments /> : <Navigate to="/login" />}
        />
        {/* No login check for /logs route */}
        <Route path="/logs" element={<Logs />} />
      </Routes>
    </Router>
  );
}
