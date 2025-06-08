import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";



const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Iphone 15 Pro max 64gb",
      image: "https://phoenix-react-alt.prium.me/assets/1-B1bOxqYn.png",
      color: "Glossy black",
      size: "XL",
      price: 199,
      quantity: 2,
      total: 398
    },
    {
      id: 2,
      name: "Name 2",
      image: "https://phoenix-react-alt.prium.me/assets/2-B3P1wljo.png",
      color: "Glossy black",
      size: "XL",
      price: 150,
      quantity: 2,
      total: 300
    },
    {
      id: 3,
      name: "Name 3",
      image: "https://phoenix-react-alt.prium.me/assets/3-DiEfZzxT.png",
      color: "Glossy Golden",
      size: "34mm",
      price: 65,
      quantity: 2,
      total: 130
    }
  ]);
  const handleQuantityChange = (id: number, change: number) => {
    setCartItems(prevItems =>
      prevItems.map(item => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.quantity + change);
          return {
            ...item,
            quantity: newQuantity,
            total: item.price * newQuantity
          };
        }
        return item;
      })
    );
  };

  const handleRemoveItem = (id: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + item.total, 0);
  };
  const subtotal = calculateSubtotal();
  const discount = 59;
  const tax = 126.2;
  const shippingCost = 30;
  const total = subtotal - discount + tax + shippingCost;
  return (
    <div className="min-h-[1024px] w-full max-w-[1440px] mx-auto px-6 py-8 bg-[#F5F7FA]">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-blue-500 mb-4">
        <a href="#" className="hover:underline cursor-pointer">Page 1</a>
        <span className="text-gray-500">&gt;</span>
        <a href="#" className="hover:underline cursor-pointer">Page 2</a>
        <span className="text-gray-500">&gt;</span>
        <span className="text-gray-700">Default</span>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-8">Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 ">
        <div className="lg:col-span-2">
          {/* Cart Table Header */}
          <Table className="w-full border">
            <TableHeader>
              <TableRow className="text-left text-[#31374A]">
                <TableHead></TableHead>
                <TableHead className="w-[30%]">PRODUCTS</TableHead>
                <TableHead className="text-center">COLOR</TableHead>
                <TableHead className="text-center">SIZE</TableHead>
                <TableHead className="text-center">PRICE</TableHead>
                <TableHead className="text-center">QUANTITY</TableHead>
                <TableHead className="text-center">TOTAL</TableHead>
                <TableHead className="text-center"></TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {cartItems.map((item) => (
                <TableRow key={item.id}>
                  {/* Ảnh sản phẩm */}
                  <TableCell>
                    <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <a href="#" className="text-blue-500 hover:underline">{item.name}</a>
                  </TableCell>
                  <TableCell className="text-center">{item.color}</TableCell>
                  <TableCell className="text-center">{item.size}</TableCell>
                  <TableCell className="text-center">${item.price}</TableCell>
                  <TableCell>
                    <div className="flex justify-center items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 rounded-md cursor-pointer"
                        onClick={() => handleQuantityChange(item.id, -1)}
                      >
                        <span className="text-lg">-</span>
                      </Button>
                      <span>{item.quantity}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 rounded-md cursor-pointer"
                        onClick={() => handleQuantityChange(item.id, 1)}
                      >
                        <span className="text-lg">+</span>
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">${item.total}</TableCell>
                  <TableCell className="text-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-400 hover:text-gray-500 cursor-pointer"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      <i className="fas fa-trash-alt"></i>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="flex justify-between items-center mt-6 text-lg">
            <span className="font-medium">Items subtotal:</span>
            <span className="font-medium">${subtotal}</span>
          </div>
        </div>


        <div className="lg:col-span-1">
          <Card className="shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-2xl font-bold">Summary</CardTitle>
              <Button
                variant="link"
                className="text-blue-500 p-0 h-auto !rounded-button whitespace-nowrap cursor-pointer"
              >
                Edit cart
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              <Select defaultValue="cash">
                <SelectTrigger className="w-full border-gray-200">
                  <SelectValue placeholder="Cash on Delivery" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Cash on Delivery</SelectItem>
                  <SelectItem value="card">Credit Card</SelectItem>
                  <SelectItem value="paypal">PayPal</SelectItem>
                </SelectContent>
              </Select>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Items subtotal:</span>
                  <span className="font-medium">${subtotal}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Discount:</span>
                  <span className="font-medium text-red-500">-${discount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Tax:</span>
                  <span className="font-medium">${tax}</span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-medium">${subtotal - discount + tax}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Shipping Cost:</span>
                  <span className="font-medium">${shippingCost}</span>
                </div>
              </div>

              <div className="flex ">
                <Input
                  placeholder="Voucher"
                  className="border border-gray-200 rounded-l-md rounded-r-none focus:ring-0 focus:outline-none"
                />
                <Button
                  className="border border-l-0 border-gray-200 bg-gray-100 hover:bg-gray-200 text-blue-500 rounded-r-md cursor-pointer rounded-l-none"
                >
                  Apply
                </Button>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold">Total:</span>
                  <span className="text-xl font-bold">${total.toFixed(2)}</span>
                </div>
              </div>

              <Button
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-6 !rounded-button whitespace-nowrap cursor-pointer"
              >
                Proceed to check out <i className="fas fa-arrow-right ml-2"></i>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div >
  );
};

export default Cart;
