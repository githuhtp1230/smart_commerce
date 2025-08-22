import { useState } from "react";
import { DataTable } from "@/components/common/table/DataTable";
import { Button } from "@/components/ui/button";
import type { IProductSummary } from "@/type/products";
import type { ColumnDef } from "@tanstack/react-table";
import { Ellipsis, PencilLineIcon, Trash2 } from "lucide-react";

import { toast } from "sonner"; // hoặc react-hot-toast nếu bạn dùng cái khác
import { deleteProduct } from "@/services/products.service";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Eye } from "@/assets/icons";

interface Props {
  products: IProductSummary[];
  onDeleted?: () => void;
  readOnly?: boolean;
}

const ProductTable = ({ products, onDeleted, readOnly }: Props) => {
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleDelete = async (productId: number) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?"))
      return;

    try {
      setDeletingId(productId);
      await deleteProduct(productId);
      toast.success("Xóa sản phẩm thành công");
      onDeleted?.();
    } catch (error) {
      toast.error("Xóa sản phẩm thất bại");
      console.error(error);
    } finally {
      setDeletingId(null);
    }
  };

  const columns: ColumnDef<IProductSummary>[] = [
    {
      accessorKey: "image",
      header: "Image",
      cell: ({ row }) => (
        <img
          src={row.original.image}
          alt={row.original.name}
          className="w-10 h-10 object-contain rounded-md"
        />
      ),
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => <div>{row.original.name}</div>,
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => <div>${row.original.price}</div>,
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => (
        <div>{row.original.category?.name || "Uncategorized"}</div>
      ),
    },
    {
      accessorKey: "averageRating",
      header: "Rating",
      cell: ({ row }) => (
        <span className="text-yellow-400">{row.original.averageRating}★</span>
      ),
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => (
        <div>{new Date(row.original.createdAt).toLocaleString()}</div>
      ),
    },
  ];

  // Thêm cột hành động nếu không phải chế độ chỉ đọc
  if (!readOnly) {
    columns.push({
      id: "actions",
      header: "",
      cell: () => {
        return (
          <div className="w-full">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Ellipsis />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="font-bold">
                <DropdownMenuItem className="cursor-pointer">
                  <Eye className="size-3.5" />
                  Preview
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <PencilLineIcon className="size-3.5" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600">
                  <Trash2 className="size-3.5 text-red-600 focus:text-red-600 " />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    });
  }

  return (
    <div className="bg-primary rounded-xl ">
      <DataTable columns={columns} data={products} />
    </div>
  );
};

export default ProductTable;
