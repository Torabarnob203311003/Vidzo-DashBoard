import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";

const PrivateRoute = () => {
  const token = useSelector((state) => state.auth.token);
  // If no token → redirect
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  let isExpired = false;

  try {
    const decoded = jwtDecode(token); // decode JWT
    const currentTime = Date.now() / 1000; // seconds

    if (decoded.exp < currentTime) {
      isExpired = true;
      toast.error("Session expired. Please log in again.");
    }
  } catch (error) {
    console.error("Invalid JWT Token", error);
    isExpired = true;
  }

  // If token expired → redirect to login
  if (isExpired) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
