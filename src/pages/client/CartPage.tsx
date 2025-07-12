import CartItemList from "@/components/client/cart/CartItemList";
import PaymentSummary from "@/components/client/cart/PaymentSummary";
import { fetchCartItems } from "@/services/cart.service";
import { useCartStore } from "@/store/cart-store";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";

const CartPage = () => {
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
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <CartItemList />
      </div>

      <div className="lg:col-span-1">
        <PaymentSummary />
      </div>
    </div>
  );
};

export default CartPage;
