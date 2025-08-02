import ConfirmDialog from "@/components/common/dialog/ConfirmDialog";
import { toastSuccess } from "@/components/common/sonner";
import { DataTable } from "@/components/common/table/DataTable";
import { Button } from "@/components/ui/button";
import { attributeApi } from "@/services/attributes.service";
import type { IAttribute } from "@/type/attribute";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ColumnDef } from "@tanstack/react-table";
import { SquarePen, Trash2 } from "lucide-react";
import { useState } from "react";
import EditAttributeDialog from "./EditAttributeDialog";

interface Props {
  attributes: IAttribute[];
  onSwitchTab?: () => void;
}

const AttributesTable = ({ attributes, onSwitchTab }: Props) => {
  const queryClient = useQueryClient();

  const [editAttribute, setEditAttribute] = useState<IAttribute | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const deleteAttributeMutation = useMutation({
    mutationFn: async (id: number) => await attributeApi.deleteAttribute(id),
    onSuccess: () => {
      toastSuccess("Xóa thuộc tính thành công");
      onSwitchTab?.();
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["attributes"] });
    },
  });

  const updateAttributeMutation = useMutation({
    mutationFn: async ({ id, name }: { id: number | string; name: string }) =>
      await attributeApi.updateAttribute(id, { name }),
    onSuccess: () => {
      toastSuccess("Cập nhật thuộc tính thành công");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["attributes"] });
    },
  });
  const handleUpdate = (newName: string) => {
    const trimmedName = newName.trim();
    if (editAttribute && trimmedName && trimmedName !== editAttribute.name) {
      updateAttributeMutation.mutate({
        id: editAttribute.id,
        name: trimmedName,
      });
    }
  };

  const sortedAttributes = [...attributes].sort(
    (a, b) => Number(b.id) - Number(a.id)
  );

  const columns: ColumnDef<IAttribute>[] = [
    {
      accessorKey: "id",
      header: () => <div>Id</div>,
      cell: ({ row }) => {
        return <div>{row.index + 1}</div>;
      },
    },
    {
      accessorKey: "name",
      header: () => <div>Name</div>,
      cell: ({ row }) => {
        return <div>{row.original.name}</div>;
      },
    },
    {
      id: "deleteAction",
      header: () => <div>Xóa</div>,
      cell: ({ row }) => {
        const id = row.original.id;
        return (
          <ConfirmDialog
            title="Xóa thuộc tính"
            description="Bạn có chắc muốn xóa thuộc tính này không?"
            onConfirm={() => deleteAttributeMutation.mutate(Number(id))}
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
        const attribute = row.original;
        return (
          <Button
            variant="ghost"
            onClick={() => {
              setEditAttribute(attribute);
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
        <DataTable columns={columns} data={sortedAttributes} />
      </div>
      {editAttribute && (
        <EditAttributeDialog
          open={isEditOpen}
          onOpenChange={(open) => {
            setIsEditOpen(open);
            if (!open) setEditAttribute(null);
          }}
          initialName={editAttribute.name}
          onSubmit={handleUpdate}
        />
      )}
    </>
  );
};

export default AttributesTable;
