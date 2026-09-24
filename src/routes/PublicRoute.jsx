import { Navigate, Outlet } from "react-router-dom";

// You can replace this logic with your actual auth state
const useAuth = () => {
  const token = localStorage.getItem("token");
  return !!token;
};

const PublicRoute = ({ restricted = false }) => {
  const isAuthenticated = useAuth();

  // Redirect to home if user is authenticated and the route is restricted
  return isAuthenticated && restricted ? (
    <Navigate to="/" replace />
  ) : (
    <Outlet />
  );
};

export default PublicRoute;
