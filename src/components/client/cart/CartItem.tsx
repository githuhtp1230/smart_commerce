
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import type { CartItemType as CartItemType } from "./CartData";

type CartItemProps = {
    item: CartItemType;
    onQuantityChange: (id: number, delta: number) => void;
    onRemoveItem: (id: number) => void;
};

const CartItem = ({ item, onQuantityChange, onRemoveItem }: CartItemProps) => {
    return (
        <TableRow>
            <TableCell>
<<<<<<< HEAD
                <div className="w-16 h-16 background-secondary rounded-md overflow-hidden">
=======
                <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden">
>>>>>>> 00129319fb358654d8c29a3667f8efa701c88143
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover object-top" />
                </div>
            </TableCell>
            <TableCell>
<<<<<<< HEAD
                <a href="#" className="text-txt-violet-soft hover:underline">{item.name}</a>
            </TableCell>
            <TableCell className="text-center text-txt-tertiary">{item.color}</TableCell>
            <TableCell className="text-center text-txt-tertiary">{item.size}</TableCell>
            <TableCell className="text-center text-txt-tertiary">${item.price}</TableCell>
            <TableCell>
                <div className="flex justify-center items-center gap-2 text-txt-tertiary">
=======
                <a href="#" className="text-blue-500 hover:underline">{item.name}</a>
            </TableCell>
            <TableCell className="text-center">{item.color}</TableCell>
            <TableCell className="text-center">{item.size}</TableCell>
            <TableCell className="text-center">${item.price}</TableCell>
            <TableCell>
                <div className="flex justify-center items-center gap-2">
>>>>>>> 00129319fb358654d8c29a3667f8efa701c88143
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => onQuantityChange(item.id, -1)}>-</Button>
                    <span>{item.quantity}</span>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => onQuantityChange(item.id, 1)}>+</Button>
                </div>
            </TableCell>
            <TableCell className="text-center">${item.total}</TableCell>
            <TableCell className="text-center">
<<<<<<< HEAD
                <Button variant="ghost" size="sm" className="text-txt-tertiary " onClick={() => onRemoveItem(item.id)}>
=======
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-500" onClick={() => onRemoveItem(item.id)}>
>>>>>>> 00129319fb358654d8c29a3667f8efa701c88143
                    <i className="fas fa-trash-alt"></i>
                </Button>
            </TableCell>
        </TableRow>
    );
};

export default CartItem;
