// Updated ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ user, token, adminComponent, userComponent }) => {
  if (!user) {
    // If not authenticated or user data is missing, redirect to login page
    return <Navigate to="/" />;
  }

  if (user.permissions) {
    // If user role is admin, render admin component
    return adminComponent;
  } else {
    // If user role is customer, render customer component
    return userComponent;
  }
};

export default ProtectedRoute;
