import { PATH } from "@/constants/path";
import { useAuthStore } from "@/store/auth-store";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? <Outlet /> : <Navigate to={PATH.LOGIN} />;
};
