import CartItemList from "@/components/client/cart/CartItemList";
import PaymentSummary from "@/components/client/cart/PaymentSummary";

const CartPage = () => {
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
