import { useState } from "react";
import { DataTable } from "@/components/common/table/DataTable";
import { Button } from "@/components/ui/button";
import type { ICategory } from "@/type/category";
import type { ColumnDef } from "@tanstack/react-table";
import { SquarePen, Trash2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ConfirmDialog from "@/components/common/dialog/ConfirmDialog";
import { categoryApi } from "@/services/categories.service";
import { toastSuccess } from "@/components/common/sonner";
import EditCategoryDialog from "./EditCategoryDialog";

interface Props {
  categories: ICategory[];
}

const CategoriesTable = ({ categories }: Props) => {
  const queryClient = useQueryClient();

  const [editCategory, setEditCategory] = useState<ICategory | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  // --- Xóa danh mục ---
  const deleteCategoryMutation = useMutation({
    mutationFn: async (id: number) => await categoryApi.deleteCategory(id),
    onSuccess: () => {
      toastSuccess("Xoá danh mục thành công");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  // --- Cập nhật danh mục ---
  const updateCategoryMutation = useMutation({
    mutationFn: async ({ id, name }: { id: number | string; name: string }) =>
      await categoryApi.updateCategory(id, { name }),
    onSuccess: () => {
      toastSuccess("Cập nhật danh mục thành công");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  const handleUpdate = (newName: string) => {
    const trimmedName = newName.trim();
    if (editCategory && trimmedName && trimmedName !== editCategory.name) {
      updateCategoryMutation.mutate({
        id: editCategory.id,
        name: trimmedName,
      });
    }
  };

  const sortedCategories = [...categories].sort(
    (a, b) => Number(b.id) - Number(a.id)
  );

  const columns: ColumnDef<ICategory>[] = [
    {
      accessorKey: "id",
      header: () => <div>ID</div>,
      cell: ({ row }) => <div>{row.index + 1}</div>,
    },
    {
      accessorKey: "name",
      header: () => <div>Tên danh mục</div>,
      cell: ({ row }) => <div>{row.original.name}</div>,
    },
    {
      id: "deleteAction",
      header: () => <div>Xoá</div>,
      cell: ({ row }) => {
        const id = row.original.id;
        return (
          <ConfirmDialog
            title="Xoá danh mục"
            description="Bạn có chắc chắn muốn xoá danh mục này không?"
            onConfirm={() => deleteCategoryMutation.mutate(Number(id))}
            trigger={
              <Button variant="ghost">
                <Trash2 className="text-icon-system-danger" />
              </Button>
            }
          />
        );
      },
    },
    {
      id: "updateAction",
      header: () => <div>Cập nhật</div>,
      cell: ({ row }) => {
        const category = row.original;
        return (
          <Button
            variant="ghost"
            onClick={() => {
              setEditCategory(category);
              setIsEditOpen(true);
            }}
          >
            <SquarePen className="text-icon-brand-primary" />
          </Button>
        );
      },
    },
  ];

  return (
    <>
      <div className="bg-primary rounded-xl p-3">
        <DataTable columns={columns} data={sortedCategories} />
      </div>

      {/* Dialog cập nhật danh mục */}
      {editCategory && (
        <EditCategoryDialog
          open={isEditOpen}
          onOpenChange={(open) => {
            setIsEditOpen(open);
            if (!open) setEditCategory(null);
          }}
          initialName={editCategory.name}
          onSubmit={handleUpdate}
        />
      )}
    </>
  );
};

export default CategoriesTable;
