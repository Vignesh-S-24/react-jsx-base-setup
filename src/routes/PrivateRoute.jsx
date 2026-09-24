import { Navigate, Outlet } from "react-router-dom";

// You can replace this logic with your actual auth state from your auth store
const useAuth = () => {
  const token = localStorage.getItem("token");
  return !!token;
};

const PrivateRoute = () => {
  const isAuthenticated = useAuth();
  // If authenticated, render child routes (Outlet), else redirect to login
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
