import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";  
import { Login } from './pages/Login';import Logout from "./pages/Logout";  
import ParkingPlaces from "./pages/ParkingPlaces";
import Payments from "./pages/Payments";
import Logs from "./pages/Logs";
import Register from "./pages/Register";

function App() {
  const [role, setRole] = useState(localStorage.getItem("userRole") || null);

  useEffect(() => {
    if (role) {
      localStorage.setItem("userRole", role);
    } else {
      localStorage.removeItem("userRole");
    }
  }, [role]);

  return (
    <BrowserRouter>
      {role && <Navbar setRole={setRole} />}
      <Routes>
        <Route path="/login" element={<Login setRole={setRole} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout setRole={setRole} />} />

        {/* Protected Routes */}
        <Route path="/" element={role ? <Home role={role} /> : <Navigate to="/login" />} />
        <Route path="/parking-places" element={role ? <ParkingPlaces /> : <Navigate to="/login" />} />
        <Route path="/payments" element={role ? <Payments /> : <Navigate to="/login" />} />
        <Route path="/logs" element={role ? <Logs /> : <Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
