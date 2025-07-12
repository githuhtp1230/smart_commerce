import type { ICartItem } from "@/type/cart";
import { create } from "zustand";

interface CartState {
  cartItems: ICartItem[];
  setCartItems: (cartItems: ICartItem[]) => void;
  getTotalPrice: () => number;
  getItemTotalPrice: (itemId: number) => number;
  deleteCartItem: (itemId: number) => void;
  updateQuantityItem: (itemId: number, change: number) => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  cartItems: [],
  setCartItems: (cartItems) => set({ cartItems }),
  getTotalPrice: () => {
    const { cartItems } = get();
    return cartItems.reduce((total, item) => {
      const price = item.productVariation?.price ?? item.product.price ?? 0;
      const discount = item.product.promotion?.discountValuePercent ?? 0;
      const finalPrice = price * (1 - discount / 100);
      return total + finalPrice * item.quantity;
    }, 0);
  },
  getItemTotalPrice: (itemId) => {
    const cartItem = get().cartItems.find((cartItem) => cartItem.id === itemId);
    if (cartItem) {
      const price =
        cartItem.productVariation?.price ?? cartItem.product.price ?? 0;
      const discount = cartItem.product.promotion?.discountValuePercent ?? 0;
      const finalPrice = price * (1 - discount / 100);
      return finalPrice * cartItem.quantity;
    }
    return 0;
  },
  deleteCartItem: (itemId) => {
    const cartItems = get().cartItems;
    const newCartItems = cartItems.filter((item) => item.id !== itemId);
    set({ cartItems: newCartItems });
  },
  updateQuantityItem: (itemId, change) => {
    const updateCartItems = get().cartItems.map((cartItem) =>
      cartItem.id === itemId
        ? { ...cartItem, quantity: cartItem.quantity + change }
        : cartItem
    );

    set({ cartItems: updateCartItems });
  },
}));
