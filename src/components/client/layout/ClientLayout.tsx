import React from "react";
import Header from "./Header";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const ClientLayout = () => {
  return (
    <div className="flex flex-col items-center">
      <Header />
      <Navbar />
      <div className="py-6 max-w-screen-xl mx-auto w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default ClientLayout;
