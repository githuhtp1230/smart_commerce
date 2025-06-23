import { initialCartItems, type CartItemType } from "@/components/client/cart/CartData";
import ListProduct from "@/components/client/cart/ListProduct";
import Summary from "@/components/client/cart/Summary";
import React, { useState } from "react";


const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItemType[]>(initialCartItems);

  const handleQuantityChange = (id: number, change: number) => {
    setCartItems(prevItems =>
      prevItems.map(item => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.quantity + change);
          return {
            ...item,
            quantity: newQuantity,
            total: item.price * newQuantity,
          };
        }
        return item;
      })
    );
  };

  const handleRemoveItem = (id: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const calculateSubtotal = () =>
    cartItems.reduce((sum, item) => sum + item.total, 0);

  const subtotal = calculateSubtotal();
  const discount = 59;
  const tax = 126.2;
  const shippingCost = 30;
  const total = subtotal - discount + tax + shippingCost;

  return (
    <div className="min-h-[1024px] w-full max-w-[1440px] mx-auto px-6 py-8 bg-[#F5F7FA]">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-blue-500 mb-4">
        <a href="#" className="hover:underline">Page 1</a>
        <span className="text-gray-500">&gt;</span>
        <a href="#" className="hover:underline">Page 2</a>
        <span className="text-gray-500">&gt;</span>
        <span className="text-gray-700">Default</span>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-8">Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <ListProduct
            cartItems={cartItems}
            onQuantityChange={handleQuantityChange}
            onRemoveItem={handleRemoveItem}
            subtotal={subtotal}
          />
        </div>

        <div className="lg:col-span-1">
          <Summary
            subtotal={subtotal}
            discount={discount}
            tax={tax}
            shippingCost={shippingCost}
            total={total}
          />
        </div>
      </div>
    </div>
  );
};

export default Cart;
