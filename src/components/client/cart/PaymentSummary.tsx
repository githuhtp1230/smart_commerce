import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";
import PaymentsSelect from "@/components/common/select/PaymentsSelect";
import axios from "axios";

const PaymentSummary: React.FC = () => {
  const { cartItems, getItemTotalPrice, getSelectedItemTotalPrice } =
    useCartStore((s) => s);

  const handlePayment = async () => {
    try {
      const amount = getSelectedItemTotalPrice();
      const orderId = `ORD${Date.now()}`; // mã đơn hàng ngẫu nhiên

      const res = await axios.get(
        "http://localhost:8080/api/vnpay/create-payment",
        {
          params: {
            amount: Math.round(amount),
            orderId,
          },
        }
      );

      const paymentUrl = res.data.paymentUrl;
      window.location.href = paymentUrl;
    } catch (error) {
      console.error("Lỗi khi tạo thanh toán:", error);
      alert("Không thể tạo thanh toán. Vui lòng thử lại.");
    }
  };

  return (
    <Card className="bg-primary shadow-none">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-2xl font-bold">Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <PaymentsSelect />
        <div className="flex flex-col">
          {cartItems
            .filter((item) => item.isSelected)
            .map((item, index) => (
              <div className="flex justify-between" key={index}>
                <div className="flex gap-2">
                  <span>{item.product.name}</span>
                  <span className="text-muted-foreground">
                    x{item.quantity}
                  </span>
                </div>
                <span className="font-medium">
                  ${getItemTotalPrice(item.id)}
                </span>
              </div>
            ))}
        </div>

        <div className="pt-4 border-t">
          <div className="flex justify-between">
            <span className="text-xl font-bold">Total:</span>
            <span className="text-xl font-bold">
              ${getSelectedItemTotalPrice()}
            </span>
          </div>
        </div>

        <Button
          variant="default"
          className="w-full text-base bg-amber-700"
          disabled={getSelectedItemTotalPrice() === 0}
          onClick={handlePayment}
        >
          Checkout
        </Button>
      </CardContent>
    </Card>
  );
};

export default PaymentSummary;
