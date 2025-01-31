import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";


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
      <Routes>
        <Route path="/" element={<Login />} />
        
        {/* Protected Routes inside Navbar layout */}
        <Route element={<Navbar />}>
          <Route path="/home" element={<Home />} />
        </Route>

        {/* Add other routes here */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
  