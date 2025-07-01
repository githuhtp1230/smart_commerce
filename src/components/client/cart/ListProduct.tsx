import React from "react";
import {
<<<<<<< HEAD
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import type { CartItemType } from "./CartData";
import CartItem from "./CartItem";

type ListProductProps = {
    cartItems: CartItemType[];
    onQuantityChange: (id: number, delta: number) => void;
    onRemoveItem: (id: number) => void;
    subtotal: number;
};

const ListProduct: React.FC<ListProductProps> = ({ cartItems, onQuantityChange, onRemoveItem, subtotal }) => {
    return (
        <>
            <Table className="border-t border-b border-border py-4">
                <TableHeader>
                    <TableRow>
                        <TableHead></TableHead>
                        <TableHead className="w-[30%] text-foreground">PRODUCTS</TableHead>
                        <TableHead className="text-center text-foreground">COLOR</TableHead>
                        <TableHead className="text-center text-foreground">SIZE</TableHead>
                        <TableHead className="text-center text-foreground">PRICE</TableHead>
                        <TableHead className="text-center text-foreground">QUANTITY</TableHead>
                        <TableHead className="text-center text-foreground">TOTAL</TableHead>
                        <TableHead className="text-center text-foreground"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {cartItems.map(item => (
                        <CartItem
                            key={item.id}
                            item={item}
                            onQuantityChange={onQuantityChange}
                            onRemoveItem={onRemoveItem}
                        />
                    ))}
                </TableBody>
            </Table>

            <div className="flex justify-between items-center mt-6 text-lg">
                <span className="font-medium text-foreground">Items subtotal:</span>
                <span className="font-medium text-foreground">${subtotal.toFixed(2)}</span>
            </div>
        </>
    );
=======
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { CartItemType } from "./CartData";
import CartItem from "./CartItem";
import { Separator } from "@/components/ui/separator";

type ListProductProps = {
  cartItems: CartItemType[];
  onQuantityChange: (id: number, delta: number) => void;
  onRemoveItem: (id: number) => void;
  subtotal: number;
};

const ListProduct: React.FC<ListProductProps> = ({
  cartItems,
  onQuantityChange,
  onRemoveItem,
  subtotal,
}) => {
  return (
    <>
      <Table className="w-full border text-txt-tertiary text-base">
        <TableHeader>
          <TableRow>
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
            <CartItem
              key={item.id}
              item={item}
              onQuantityChange={onQuantityChange}
              onRemoveItem={onRemoveItem}
            />
          ))}
        </TableBody>
      </Table>
      <Separator className="mt-5" />
      <div className="flex justify-between items-center mt-6 text-lg">
        <span className="font-medium">Items subtotal:</span>
        <span className="font-medium">${subtotal.toFixed(2)}</span>
      </div>
      <Separator className="mt-5" />
    </>
  );
>>>>>>> 00129319fb358654d8c29a3667f8efa701c88143
};

export default ListProduct;
