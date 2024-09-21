import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProtectedRoute = () => {
  const { auth } = useAuth();

  return auth?.username ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
