import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCartStore } from "@/store/cart-store";
import PaymentsSelect from "@/components/common/select/PaymentsSelect";
import PurchaseButton from "@/components/common/button/PurchaseButton";
import { formatPrice } from "@/helper/format-price-vietnam";
import { useMutation } from "@tanstack/react-query";
import { checkout } from "@/services/checkout.service";

const PaymentSummary: React.FC = () => {
  const { cartItems, getItemTotalPrice, getSelectedItemTotalPrice } =
    useCartStore((s) => s);

  const { mutate } = useMutation({
    mutationFn: checkout,
    onSuccess: (data) => {
      window.location.href = data.data.payment.vnp_url;
    },
    onError: () => {},
  });

  const handleCheckout = () => {
    const cartItemIds = cartItems
      .filter((cartItem) => cartItem.isSelected)
      .map((cartItem) => cartItem.id);
    mutate({
      cartItemIds,
      addressId: 1,
      paymentId: 1,
    });
  };

  return (
    <Card className="bg-primary shadow-none">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-2xl font-bold ">Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <PaymentsSelect />
        <div className="flex flex-col">
          {cartItems
            .filter((item) => item.isSelected)
            .map((item, index) => (
              <div className="flex justify-between" key={index}>
                <div className="flex gap-2">
                  <span className="">{item.product.name}</span>
                  <span className="text-muted-foreground">
                    x{item.quantity}
                  </span>
                </div>
                <span className="font-medium">
                  {formatPrice(getItemTotalPrice(item.id))}đ
                </span>
              </div>
            ))}
        </div>

        <div className="pt-4 border-t">
          <div className="flex justify-between">
            <span className="text-xl font-bold">Total:</span>
            <span className="text-xl font-bold">
              {formatPrice(getSelectedItemTotalPrice())} đ
            </span>
          </div>
        </div>

        <PurchaseButton
          variant="default"
          message="Checkout"
          className="w-full text-base"
          disabled={getSelectedItemTotalPrice() === 0}
          onClick={handleCheckout}
        />
      </CardContent>
    </Card>
  );
};

export default PaymentSummary;
