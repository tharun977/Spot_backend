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
        <Route path="/login" element={<Login />} />
        <Route element={<Navbar />}>
          <Route path="/" element={<Home />} />



        </Route>
        {/* <Route path="/logout" element={<Logout/>}/> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
