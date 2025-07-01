
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
                <div className="w-16 h-16 background-secondary rounded-md overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover object-top" />
                </div>
            </TableCell>
            <TableCell>
                <a href="#" className="text-txt-violet-soft hover:underline">{item.name}</a>
            </TableCell>
            <TableCell className="text-center text-txt-tertiary">{item.color}</TableCell>
            <TableCell className="text-center text-txt-tertiary">{item.size}</TableCell>
            <TableCell className="text-center text-txt-tertiary">${item.price}</TableCell>
            <TableCell>
                <div className="flex justify-center items-center gap-2 text-txt-tertiary">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => onQuantityChange(item.id, -1)}>-</Button>
                    <span>{item.quantity}</span>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => onQuantityChange(item.id, 1)}>+</Button>
                </div>
            </TableCell>
            <TableCell className="text-center">${item.total}</TableCell>
            <TableCell className="text-center">
                <Button variant="ghost" size="sm" className="text-txt-tertiary " onClick={() => onRemoveItem(item.id)}>
                    <i className="fas fa-trash-alt"></i>
                </Button>
            </TableCell>
        </TableRow>
    );
};

export default CartItem;
