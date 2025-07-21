import React, { useEffect } from "react";
import Header from "./Header";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import { useCartStore } from "@/store/cart-store";
import { useQuery } from "@tanstack/react-query";
import { fetchCartItems } from "@/services/cart.service";
import Footer from "./Footer";

const ClientLayout = () => {
  const { setCartItems } = useCartStore((s) => s);

  const { data } = useQuery({
    queryKey: ["cart"],
    queryFn: fetchCartItems,
  });

  useEffect(() => {
    if (data) {
      setCartItems(data);
    }
  }, [data]);

  return (
    <div className="flex flex-col items-center">
      <Header />
      <Navbar />
      <div className=" w-full px-10 flex justify-center">
        <div className="py-6 w-full max-w-screen-xl">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ClientLayout;
