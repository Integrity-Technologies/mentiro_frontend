import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ user, token, adminComponent, userComponent }) => {
  if (!token) {
    // If not authenticated or user data is missing, redirect to login page
    return <Navigate to="/" />;
  }

  // Check user permissions
  const isAdmin = user === "true";

  if (isAdmin) {
    // If user is admin, render admin component
    return adminComponent;
  } else {
    // If user is not admin, render user component
    return userComponent;
  }
};

export default ProtectedRoute;
