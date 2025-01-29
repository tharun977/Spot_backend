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
      {/* The Navbar should only be shown after login */}
      {role && <Navbar role={role} />}
      
      <Routes>
        {/* Redirect to Login if not logged in */}
        <Route
          path="/"
          element={role ? <Home role={role} /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<Login setRole={setRole} />} />
        
        {/* Protect other routes, if user is not logged in, redirect to login */}
        <Route
          path="/parking-places"
          element={role ? <ParkingPlaces /> : <Navigate to="/login" />}
        />
        <Route
          path="/payments"
          element={role ? <Payments /> : <Navigate to="/login" />}
        />
        <Route
          path="/logs"
          element={role ? <Logs /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}
