import { useAuthStore } from "@/store/auth-store";
import type { RoleType } from "@/type/common";
import React from "react";

interface Props {
  children?: React.ReactNode;
  roles: RoleType[];
}

const RequireRole = ({ children, roles }: Props) => {
  const myRole = useAuthStore((s) => s.me?.role);

  if (myRole && !roles.includes(myRole)) return null;

  return children;
};

export default RequireRole;
