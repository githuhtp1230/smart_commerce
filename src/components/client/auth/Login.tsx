import { PATH } from "@/constants/path";
import { cn } from "@/lib/utils";
import React from "react";
import { NavLink } from "react-router-dom";
import AuthTabs from "./AuthTabs";

const Login = () => {
  return (
    <div className="bg-green-600 h-screen flex items-center justify-center">
      <div className="max-w-screen-xl flex items-center justify-between w-full p-10">
        <div>Info</div>
        <div className="bg-primary max-w-130 w-full flex flex-col items-center rounded-2xl p-3">
          <h1 className="font-medium text-2xl">Welcome</h1>
          <AuthTabs />
        </div>
      </div>
    </div>
  );
};

export default Login;
