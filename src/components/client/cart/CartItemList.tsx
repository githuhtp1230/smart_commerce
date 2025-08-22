import QuantityButton from "@/components/common/button/QuantityButton";
import { toastSuccess } from "@/components/common/sonner";
import { DataTable } from "@/components/common/table/DataTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { formatPrice } from "@/helper/format-price-vietnam";
import { cn } from "@/lib/utils";
import {
  deleteCartItemRequest,
  updateQuantityCartItemRequest,
} from "@/services/cart.service";
import { useCartStore } from "@/store/cart-store";
import type { IAttributeValue } from "@/type/attribute";
import type { ICartItem } from "@/type/cart";
import { useMutation } from "@tanstack/react-query";
import type { ColumnDef } from "@tanstack/react-table";
import { Trash2 } from "lucide-react";

const CartItemList = () => {
  const {
    cartItems,
    getItemTotalPrice,
    deleteCartItem,
    updateQuantityItem,
    setIsSelected,
    setIsSelectedAllItem,
  } = useCartStore((s) => s);

  const deleteItemMutation = useMutation({
    mutationFn: (itemId: number) => deleteCartItemRequest(itemId),
    onSuccess: (_, itemId) => {
      deleteCartItem(itemId);
      toastSuccess("Product deleted successfully");
    },
  });

  const updateItemMutation = useMutation({
    mutationFn: ({ itemId, change }: { itemId: number; change: number }) =>
      updateQuantityCartItemRequest({ itemId, change }),

    onSuccess: (_data, variables) => {
      updateQuantityItem(variables.itemId, variables.change);
    },
  });

  const columns: ColumnDef<ICartItem>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => {
            setIsSelectedAllItem(!!value);
            table.toggleAllPageRowsSelected(!!value);
          }}
          aria-label="Select all"
          className={cn(
            table.getIsAllPageRowsSelected() && "!bg-brand-primary !text-white"
          )}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
            row.toggleSelected(!!value);
            setIsSelected(row.original.id, !!value);
          }}
          aria-label="Select row"
          className={cn(row.getIsSelected() && "!bg-brand-primary !text-white")}
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "index",
      header: () => <div>#</div>,
      cell: ({ row }) => {
        return <div>{row.index + 1}</div>;
      },
    },
    {
      accessorKey: "image",
      header: () => <div>Image</div>,
      cell: ({ row }) => {
        const image = row.getValue("image") as string;
        return (
          <>
            {image && (
              <div>
                <div className="size-19">
                  <img
                    className="size-full object-center object-cover"
                    src={image}
                    alt=""
                  />
                </div>
              </div>
            )}
          </>
        );
      },
    },
    {
      id: "productName",
      accessorFn: (row) => row.product.name,
      header: () => <div>Name</div>,
      cell: ({ getValue }) => {
        const value = getValue() as string;
        return <div>{value}</div>;
      },
    },
    {
      id: "price",
      accessorFn: (row) => row,
      header: () => <div>Name</div>,
      cell: ({ getValue }) => {
        const cartItem = getValue() as ICartItem;

        const hasVariationPrice = cartItem.productVariation?.price != null;
        const originalPrice = hasVariationPrice
          ? cartItem.productVariation!.price
          : cartItem.product.price ?? 0;

        const discountPercent =
          cartItem.product.promotion?.discountValuePercent ?? 0;
        const isOnSale = discountPercent > 0;

        const finalPrice = isOnSale
          ? originalPrice * (1 - discountPercent / 100)
          : originalPrice;

        return (
          <div className="flex gap-2 items-center">
            {isOnSale && (
              <p className="line-through text-muted-foreground text-sm">
                {formatPrice(originalPrice)}đ
              </p>
            )}
            <p>{formatPrice(finalPrice)}đ</p>
          </div>
        );
      },
    },
    {
      id: "attributeValues",
      accessorFn: (row) => row.productVariation?.attributeValues,
      header: () => <div>Classify</div>,
      cell: ({ getValue }) => {
        const attrVals = getValue() as IAttributeValue[];
        return (
          <div className="flex gap-2 flex-wrap">
            {attrVals?.map((attrVal) => (
              <Badge key={attrVal.id} variant="secondary" className="px-3">
                {attrVal.value}
              </Badge>
            ))}
          </div>
        );
      },
    },
    {
      accessorKey: "quantity",
      header: () => <div>Quantity</div>,
      cell: ({ row }) => (
        <div className="flex gap-3 items-center">
          <QuantityButton
            action={"decrease"}
            className="size-7 rounded-lg"
            iconClassName="size-3"
            name="decrease"
            onClick={() => {
              updateItemMutation.mutate({
                itemId: row.original.id,
                change: -1,
              });
            }}
            disabled={row.original.quantity <= 1}
          />
          {row.getValue("quantity")}
          <QuantityButton
            action={"increase"}
            className="size-7 rounded-lg"
            iconClassName="size-3"
            name="increase"
            onClick={() => {
              updateItemMutation.mutate({ itemId: row.original.id, change: 1 });
            }}
          />
        </div>
      ),
    },
    {
      id: "itemTotalPrice",
      accessorFn: (row) => row.id,
      header: () => <div>Total Price</div>,
      cell: ({ getValue }) => (
        <div>{formatPrice(getItemTotalPrice(getValue() as number))}đ</div>
      ),
    },
    {
      id: "actions",
      header: () => <div>Delete</div>,
      cell: ({ row }) => {
        const cartItem = row.original;
        return (
          <Button
            variant="ghost"
            onClick={() => {
              deleteItemMutation.mutate(cartItem.id);
            }}
          >
            <Trash2 className="text-icon-system-danger" />
          </Button>
        );
      },
    },
  ];

  return (

    <DataTable columns={columns} data={cartItems} />

  );
};

export default CartItemList;
