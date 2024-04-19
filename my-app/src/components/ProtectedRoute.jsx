// import React from "react";
// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ component: Component, isAuthenticated, user, adminComponent, userComponent }) => {
//   if (!isAuthenticated) {
//     // If not authenticated, redirect to login page
//     return <Navigate to="/" />;
//   }

//   if (user.role === "admin") {
//     // If user role is admin, render admin component
//     return <Component {...adminComponent} />;
//   } else if (user.role === "customer") {
//     // If user role is customer, render customer component
//     return <Component {...userComponent} />;
//   } else {
//     // Handle other roles or scenarios as needed
//     return <Navigate to="/unauthorized" />;
//   }
// };

// export default ProtectedRoute;
