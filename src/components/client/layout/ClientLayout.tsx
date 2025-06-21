import React from "react";
import Header from "./Header";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const ClientLayout = () => {
  return (
    <div className="flex flex-col items-center">
      <Header />
      <Navbar />
      <div className=" w-full px-10 flex justify-center">
        <div className="py-6 w-full max-w-screen-xl">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ClientLayout;
