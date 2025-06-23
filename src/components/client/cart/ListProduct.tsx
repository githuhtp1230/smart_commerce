import React from "react";
import {
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
            <Table className="w-full border">
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
                <span className="font-medium">Items subtotal:</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
            </div>
        </>
    );
};

export default ListProduct;
