import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const PrivateRoute = ({ component: Component, role }) => {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" />;
  
  try {
    const user = jwtDecode(token);
    if (role && user.role !== role) {
      return <Navigate to="/dashboard" />;
    }
    return <Component />;
  } catch (error) {
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;
