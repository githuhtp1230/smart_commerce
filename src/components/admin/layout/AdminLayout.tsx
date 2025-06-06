import React from "react";
import { Outlet } from "react-router-dom";
import LeftSidebar from "./left-side-bar/LeftSidebar";
const AdminLayout = () => {
  return (
    <div className="flex">
      <LeftSidebar />
      <Outlet />
    </div>
  );
};

export default AdminLayout;
