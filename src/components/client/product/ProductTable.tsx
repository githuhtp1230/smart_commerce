import { useEffect, useState } from "react";
import { DataTable } from "@/components/common/table/DataTable";
import { Button } from "@/components/ui/button";
import type { IProductSummary } from "@/type/products";
import type { ColumnDef } from "@tanstack/react-table";
import { Ellipsis, PencilLineIcon, RefreshCcw } from "lucide-react";


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Eye } from "@/assets/icons";
import { toastError, toastSuccess } from "@/components/common/sonner";
import { toggleProduct } from "@/services/products.service";
import PreviewProductDialog from "./PreviewProductDialog";


interface Props {
  products: IProductSummary[];
  onChange?: () => void;
  readonly?: boolean;

}

const ProductTable = ({ products, onChange, readonly }: Props) => {
  const [productList, setProductList] = useState<IProductSummary[]>([]);
  const [loadingIds, setLoadingIds] = useState<number[]>([]);
  const [previewProduct, setPreviewProduct] = useState<IProductSummary | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  useEffect(() => {
    setProductList([...products].sort((a, b) => a.id - b.id));
  }, [products]);


  const handleToggle = async (id: number) => {
    try {
      setLoadingIds((ids) => [...ids, id]);
      await toggleProduct(id);

      toastSuccess("Cập nhật trạng thái thành công!");
      setProductList((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, is_deleted: Number(p.is_deleted) === 1 ? 0 : 1 } : p
        )
      );
      onChange?.();
    } catch {
      toastError("Thao tác thất bại. Vui lòng thử lại.");
    } finally {
      setLoadingIds((ids) => ids.filter((x) => x !== id));
    }
  };

  const openPreviewDialog = (product: IProductSummary) => {
    setPreviewProduct(product);
    setPreviewOpen(true);
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
    {
      accessorKey: "is_deleted",
      header: "Status",
      cell: ({ row }) => {
        const isDeleted = row.original.is_deleted;

        return (
          <span
            className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${isDeleted === 1 ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
              }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${isDeleted === 1 ? "bg-red-600" : "bg-green-600"}`}
            />
            {isDeleted === 1 ? "Inactive" : "Active"}
          </span>
        );
      },
    },
  ];

  // Thêm cột hành động nếu không phải chế độ chỉ đọc
  if (!readonly) {
    columns.push({
      id: "actions",
      header: "",
      cell: ({ row }) => {
        const product = row.original;
        const isLoading = loadingIds.includes(product.id);
        return (
          <div className="w-full">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Ellipsis />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent

                align="end"
                sideOffset={5}
                className="w-44 rounded-lg shadow-md border bg-white dark:bg-neutral-900 dark:border-neutral-700 font-bold"
              >
                <DropdownMenuItem
                  onClick={() => openPreviewDialog(product)}
                  className="flex items-center gap-2 px-3 py-2 cursor-pointer rounded-md "
                >
                  <Eye className="w-4 h-4 text-black" />
                  <span className="text-sm">Preview</span>
                </DropdownMenuItem>
                <DropdownMenuItem

                  className="flex items-center gap-2 px-3 py-2 cursor-pointer rounded-md "
                >
                  <PencilLineIcon className="w-4 h-4 text-black" />
                  <span className="text-sm">Edit</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleToggle(product.id)}
                  disabled={isLoading}
                  className="flex items-center gap-2 px-3 py-2 cursor-pointer rounded-md "
                >
                  <RefreshCcw className="text-black" />
                  {product.is_deleted ? "Deactivate" : "Activate"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    });
  }

  return (
    <>
      <div className="bg-primary rounded-xl ">
        <DataTable columns={columns} data={productList} />
      </div>
      {
        previewProduct && (
          <PreviewProductDialog
            open={previewOpen}
            onOpenChange={setPreviewOpen}
            product={previewProduct}
          />
        )
      }
    </>

  );
};

export default ProductTable;
