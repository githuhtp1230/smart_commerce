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
import { useTranslation } from "react-i18next";

interface Props {
  attributevalues: IAttributeValue[];
  onSwitchTab?: () => void;
}

const AttributeValuesTable = ({ attributevalues, onSwitchTab }: Props) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const [editAttributeValue, setEditAttributeValue] =
    useState<IAttributeValue | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const deleteAttributeValueMutation = useMutation({
    mutationFn: async (id: number) =>
      await attributeValueApi.deleteAttributeValue(id),
    onSuccess: () => {
      toastSuccess("Delete attribute value successfully");
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
      toastSuccess(t("Attribute value updated successfully"));
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
      header: () => <div>{t("Attribute")}</div>,
      cell: ({ row }) => {
        return <div>{row.original.attribute?.name}</div>;
      },
    },
    {
      accessorKey: "value",
      header: () => <div>{t("Value")}</div>,
      cell: ({ row }) => {
        return <div>{row.original.value}</div>;
      },
    },
    {
      id: "deleteAction",
      header: () => <div>{t("Delete")}</div>,
      cell: ({ row }) => {
        const id = row.original.id;
        return (
          <ConfirmDialog
            title={t("Delete attribute value")}
            description={t(
              "Are you sure you want to delete this attribute value?"
            )}
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
      header: () => <div>{t("Update")}</div>,
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
      <div className="bg-primary rounded-xl ">
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
