import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cart-store";

const CartIcon = () => {
  const { cartItems } = useCartStore((s) => s);
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="relative">
      <ShoppingCart className="w-6 h-6 text-white" />
      {totalQuantity > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
          {totalQuantity}
        </span>
      )}
    </div>
  );
};

export default CartIcon;
