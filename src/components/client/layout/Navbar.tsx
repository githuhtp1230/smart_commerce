import { PATH } from "@/constants/path";
import { Menu } from "lucide-react";
import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="w-full bg-primary py-2 flex justify-center">
      <div className="flex justify-between max-w-screen-xl w-full">
        <div className="flex items-center gap-2">
          <Menu />
          <p>Category</p>
        </div>
        <ul className="flex items-center gap-2">
          <NavLink className="text-sm" to={PATH.HOME_PAGE}>
            Home
          </NavLink>
          <NavLink className="text-sm" to={PATH.PRODUCTS}>
            Products
          </NavLink>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
