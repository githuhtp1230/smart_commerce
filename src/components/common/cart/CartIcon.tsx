import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cart-store";

const CartIcon = () => {
  const { cartItems } = useCartStore((s) => s);

  return (
    <div className="relative">
      <ShoppingCart className="w-6 h-6" />
      {cartItems.length > 0 && (
        <span className="absolute -top-2 -right-2 bg-icon-system-danger text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
          {cartItems.length}
        </span>
      )}
    </div>
  );
};

export default CartIcon;
