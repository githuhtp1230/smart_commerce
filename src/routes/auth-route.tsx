import { PATH } from "@/constants/path";
import { useAuthStore } from "@/store/auth-store";
import type { RoleType } from "@/type/common";
import { Navigate, Outlet } from "react-router-dom";

interface Props {
  allowedRoles?: RoleType[];
}

export const AuthRoute = ({ allowedRoles }: Props) => {
  const { isAuthenticated, me } = useAuthStore((state) => state);

  if (!isAuthenticated || !me) {
    return <Navigate to={PATH.LOGIN} replace />;
  }

  if (!allowedRoles?.includes(me.role)) {
    return <Navigate to={PATH.NOT_FOUND} replace />;
  }

  return <Outlet />;
};
