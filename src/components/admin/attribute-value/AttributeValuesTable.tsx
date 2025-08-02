import ConfirmDialog from "@/components/common/dialog/ConfirmDialog";
import { toastSuccess } from "@/components/common/sonner";
import { DataTable } from "@/components/common/table/DataTable";
import { Button } from "@/components/ui/button";
import type { IAttributeValue } from "@/type/attribute";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ColumnDef } from "@tanstack/react-table";
import { SquarePen, Trash2 } from "lucide-react";
import { useState } from "react";
import EditAttributeValueDialog from "./EditAttributeValueDialog";
import { attributeValueApi } from "@/services/attributes.service";

interface Props {
  attributevalues: IAttributeValue[];
  onSwitchTab?: () => void;
}

const AttributeValuesTable = ({ attributevalues, onSwitchTab }: Props) => {
  const queryClient = useQueryClient();

  const [editAttributeValue, setEditAttributeValue] =
    useState<IAttributeValue | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const deleteAttributeValueMutation = useMutation({
    mutationFn: async (id: number) =>
      await attributeValueApi.deleteAttributeValue(id),
    onSuccess: () => {
      toastSuccess("Xóa giá trị thuộc tính thành công");
      onSwitchTab?.();
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["attributeValues"] });
    },
  });

  const updateAttributeValueMutation = useMutation({
    mutationFn: async ({ id, value }: { id: number | string; value: string }) =>
      await attributeValueApi.updateAttributeValue(id, { value }),
    onSuccess: () => {
      toastSuccess("Cập nhật gái trị thuộc tính thành công");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["attributeValues"] });
    },
  });
  const handleUpdate = (newValue: string) => {
    const trimmedValue = newValue.trim();
    if (
      editAttributeValue &&
      trimmedValue &&
      trimmedValue !== editAttributeValue.value
    ) {
      updateAttributeValueMutation.mutate({
        id: editAttributeValue.id,
        value: trimmedValue,
      });
    }
  };

  const sortedAttributeValues = [...attributevalues].sort(
    (a, b) => Number(b.id) - Number(a.id)
  );

  const columns: ColumnDef<IAttributeValue>[] = [
    {
      accessorKey: "id",
      header: () => <div>Id</div>,
      cell: ({ row }) => {
        return <div>{row.index + 1}</div>;
      },
    },
    {
      accessorKey: "attribute",
      header: () => <div>Attribute</div>,
      cell: ({ row }) => {
        return <div>{row.original.attribute?.name}</div>;
      },
    },
    {
      accessorKey: "value",
      header: () => <div>Value</div>,
      cell: ({ row }) => {
        return <div>{row.original.value}</div>;
      },
    },
    {
      id: "deleteAction",
      header: () => <div>Xóa</div>,
      cell: ({ row }) => {
        const id = row.original.id;
        return (
          <ConfirmDialog
            title="Xóa giá trị thuộc tính"
            description="Bạn có chắc muốn xóa thuộc tính này không?"
            onConfirm={() => deleteAttributeValueMutation.mutate(Number(id))}
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
        const attributeValue = row.original;
        return (
          <Button
            variant="ghost"
            onClick={() => {
              setEditAttributeValue(attributeValue);
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
        <DataTable columns={columns} data={sortedAttributeValues} />
      </div>
      {editAttributeValue && (
        <EditAttributeValueDialog
          open={isEditOpen}
          onOpenChange={(open) => {
            setIsEditOpen(open);
            if (!open) setEditAttributeValue(null);
          }}
          initialValue={editAttributeValue?.value}
          onSubmit={handleUpdate}
        />
      )}
    </>
  );
};

export default AttributeValuesTable;
