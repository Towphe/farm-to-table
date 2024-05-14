import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export const ProtectedRoute = () => {
    const { role } = useAuth();
  
    // Check if the user is authenticated
    if (!role) {
      // If not authenticated, redirect to the login page
      return <Navigate to="/sign-in" />;
    }
  
    // If authenticated, render the child routes
    return <Outlet />;
};