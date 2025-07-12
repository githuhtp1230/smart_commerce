import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCartStore } from "@/store/cart-store";

const PaymentSummary: React.FC = () => {
  const { getTotalPrice } = useCartStore((s) => s);

  return (
    <Card className="bg-primary shadow-none">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-2xl font-bold ">Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Select defaultValue="cash">
          <SelectTrigger className="w-full ">
            <SelectValue placeholder="Cash on Delivery" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="cash">Cash on Delivery</SelectItem>
            <SelectItem value="card">Credit Card</SelectItem>
            <SelectItem value="paypal">PayPal</SelectItem>
          </SelectContent>
        </Select>

        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Items subtotal:</span>
            <span className="font-medium">Subtotl</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Discount:</span>
            <span className="font-medium text-red-500">Tl</span>
          </div>
          <div className="flex justify-between border-t pt-3">
            <span className="text-muted-foreground">Subtotal:</span>
            <span className="font-medium">asdfsdf</span>
          </div>
        </div>

        <div className="pt-4 border-t">
          <div className="flex justify-between">
            <span className="text-xl font-bold">Total:</span>
            <span className="text-xl font-bold">${getTotalPrice()}</span>
          </div>
        </div>

        <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-6">
          Proceed to check out <i className="fas fa-arrow-right ml-2"></i>
        </Button>
      </CardContent>
    </Card>
  );
};

export default PaymentSummary;
