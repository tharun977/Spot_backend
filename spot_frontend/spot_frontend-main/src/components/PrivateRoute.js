import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ role, Component }) => {
  return role ? <Component role={role} /> : <Navigate to="/login" />;
};

export default PrivateRoute;
