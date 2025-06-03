import React from "react";
import LeftSidebar from "./LeftSidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex">
      <LeftSidebar />
      <Outlet />
    </div>
  );
};

export default AdminLayout;
