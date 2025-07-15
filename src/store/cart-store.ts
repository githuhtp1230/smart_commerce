import type { ICartItem } from "@/type/cart";
import { create } from "zustand";

interface CartState {
  cartItems: ICartItem[];
  setCartItems: (cartItems: ICartItem[]) => void;
  getTotalPrice: () => number;
  getItemTotalPrice: (itemId: number) => number;
  getSelectedItemSize: () => number;
  getSelectedItemTotalPrice: () => number;
  deleteCartItem: (itemId: number) => void;
  updateQuantityItem: (itemId: number, change: number) => void;
  setIsSelected: (itemId: number, isSelected: boolean) => void;
  setIsSelectedAllItem: (isSelected: boolean) => void;
  addItemToCart: (item: ICartItem) => void;
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
  setIsSelected: (itemId, isSelected) => {
    const updateCartItems = get().cartItems.map((cartItem) =>
      cartItem.id === itemId ? { ...cartItem, isSelected } : cartItem
    );
    set({ cartItems: updateCartItems });
  },
  getSelectedItemSize: () => {
    return get().cartItems.filter((item) => item.isSelected).length;
  },
  getSelectedItemTotalPrice: () => {
    const { cartItems } = get();
    return cartItems.reduce((total, item) => {
      if (!item.isSelected) return total;
      const price = item.productVariation?.price ?? item.product.price ?? 0;
      const discount = item.product.promotion?.discountValuePercent ?? 0;
      const finalPrice = price * (1 - discount / 100);
      return total + finalPrice * item.quantity;
    }, 0);
  },
  setIsSelectedAllItem: (isSelected) => {
    const { cartItems } = get();
    const updateCartItems = cartItems.map((item: ICartItem) => ({
      ...item,
      isSelected,
    }));
    set({ cartItems: updateCartItems });
  },
  addItemToCart: (item) => {
    const { cartItems } = get();
  },
}));
