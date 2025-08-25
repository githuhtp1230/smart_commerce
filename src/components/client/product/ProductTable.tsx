import { DataTable } from "@/components/common/table/DataTable";
import { Button } from "@/components/ui/button";
import type { IProductSummary } from "@/type/products";
import type { ColumnDef } from "@tanstack/react-table";
import { Ellipsis, PencilLineIcon, Trash2 } from "lucide-react";
import { toast } from "sonner";
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
  isLoading?: boolean;
}

const ProductTable = ({ products, onDeleted, readOnly, isLoading }: Props) => {
  const handleDelete = async (productId: number) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?"))
      return;

    try {
      await deleteProduct(productId);
      toast.success("Xóa sản phẩm thành công");
      onDeleted?.();
    } catch (error) {
      toast.error("Xóa sản phẩm thất bại");
      console.error(error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <img src="/images/loader.gif" alt="Loading..." className="w-30 h-30" />
      </div>
    );
  }

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
      cell: ({ row }) => row.original.name,
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => `$${row.original.price}`,
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => row.original.category?.name || "Uncategorized",
    },
    {
      accessorKey: "averageRating",
      header: "Rating",
      cell: ({ row }) => (
        <span className="text-yellow-400">{row.original.averageRating}★</span>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Date",
      cell: ({ row }) => new Date(row.original.createdAt).toLocaleString(),
    },
  ];

  if (!readOnly) {
    columns.push({
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Ellipsis />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="font-bold">
            <DropdownMenuItem className="flex items-center gap-2">
              <Eye className="size-3.5" /> Preview
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2">
              <PencilLineIcon className="size-3.5" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex items-center gap-2 text-red-600"
              onClick={() => handleDelete(row.original.id)}
            >
              <Trash2 className="size-3.5 text-red-600" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    });
  }

  return (
    <div className="bg-primary rounded-xl p-2">
      <DataTable columns={columns} data={products} />
    </div>
  );
};

export default ProductTable;
