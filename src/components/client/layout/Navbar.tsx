import { PATH } from "@/constants/path";
import { Menu } from "lucide-react";
import React from "react";
import { NavLink } from "react-router-dom";
import MenuCategories from "./MenuCategories";

const Navbar = () => {
  return (
    <div className="w-full bg-primary py-1 flex justify-center px-4">
      <div className="flex justify-between max-w-screen-xl w-full">
        <MenuCategories />
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
