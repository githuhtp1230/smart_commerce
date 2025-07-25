import { PATH } from "@/constants/path";
import { cn } from "@/lib/utils";
import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const AuthTabs = () => {
  const { pathname } = useLocation();

  if (pathname === PATH.FORGOT_PASSWORD) return null;
  return (
    <div className="flex bg-secondary p-1 rounded-lg w-70 gap-2 mt-5 w-full">
      <NavLink
        to={PATH.LOGIN}
        className={({ isActive }) =>
          cn(
            "flex-1 rounded-lg py-2 flex items-center justify-center",
            isActive ? "bg-blue-400 text-neutral-50" : ""
          )
        }
      >
        Login
      </NavLink>
      <NavLink
        to={PATH.REGISTER}
        className={({ isActive }) =>
          cn(
            "flex-1 rounded-lg py-2 flex items-center justify-center",
            isActive ? "bg-blue-400 text-neutral-50" : ""
          )
        }
      >
        Register
      </NavLink>
    </div>
  );
};

export default AuthTabs;
