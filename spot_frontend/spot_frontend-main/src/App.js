import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ParkingPlaces from "./pages/ParkingPlaces";
import Payments from "./pages/Payments";
import Logs from "./pages/Logs";
import Login from "./pages/Login";

export default function App() {
    const [role, setRole] = useState(localStorage.getItem("userRole") || null);

    useEffect(() => {
        if (role) {
            localStorage.setItem("userRole", role);
        } else {
            localStorage.removeItem("userRole");
        }
    }, [role]);

    return (
        <Router>
            {role && <Navbar setRole={setRole} />}
            <Routes>
                <Route path="/login" element={<Login setRole={setRole} />} />
                <Route 
                    path="/" 
                    element={role ? <Home role={role} /> : <Navigate to="/login" />} 
                />
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
