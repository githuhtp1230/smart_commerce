import { useState } from "react";
import { DataTable } from "@/components/common/table/DataTable";
import { Button } from "@/components/ui/button";
import { formatTimeDay } from "@/helper/format-time-day";
import type { IPromotion } from "@/type/promotion";
import type { ColumnDef } from "@tanstack/react-table";
import { SquarePen, Trash2 } from "lucide-react";

import {
  deletePromotion,
  updatePromotion,
} from "@/services/promotions.service";
import ConfirmDialog from "@/components/common/dialog/ConfirmDialog";
import EditPromotionDialog from "./EditPromotionDialog";

import { toastSuccess, toastError } from "@/components/common/sonner";

interface Props {
  promotions: IPromotion[];
  onChange?: (jumpToExpired?: boolean) => void;
}

const PromotionsTable = ({ promotions, onChange }: Props) => {
  const sortedPromotions = [...promotions].sort((a, b) => b.id - a.id);
  const [loadingIds, setLoadingIds] = useState<number[]>([]);
  const [editingPromotion, setEditingPromotion] = useState<IPromotion | null>(
    null
  );
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDelete = async (id: number) => {
    try {
      setLoadingIds((ids) => [...ids, id]);
      await deletePromotion(id);
      toastSuccess("Xóa thành công!");
      onChange?.(true);
    } catch {
      toastError("Xóa thất bại. Vui lòng thử lại.");
    } finally {
      setLoadingIds((ids) => ids.filter((x) => x !== id));
    }
  };

  const openEditDialog = (promotion: IPromotion) => {
    setEditingPromotion(promotion);
    setDialogOpen(true);
  };

  const handleUpdateSubmit = async (data: {
    description: string;
    discountValuePercent: number;
    startDate: string;
    endDate: string;
  }) => {
    if (!editingPromotion) return;
    try {
      await updatePromotion(editingPromotion.id, data);
      toastSuccess("Cập nhật thành công!");
      onChange?.();
    } catch {
      toastError("Cập nhật thất bại. Vui lòng thử lại.");
    }
  };

  const columns: ColumnDef<IPromotion>[] = [
    {
      accessorKey: "id",
      header: () => <div>Id</div>,
      cell: ({ row }) => <div>{row.index + 1}</div>,
    },
    {
      accessorKey: "description",
      header: () => <div>Description</div>,
      cell: ({ row }) => <div>{row.original.description}</div>,
    },
    {
      accessorKey: "discount_value_percent",
      header: () => <div>Discount value percent (%)</div>,
      cell: ({ row }) => <div>{row.original.discountValuePercent}%</div>,
    },
    {
      accessorKey: "start_date",
      header: () => <div>Start date</div>,
      cell: ({ row }) => <div>{formatTimeDay(row.original.startDate)}</div>,
    },
    {
      accessorKey: "end_date",
      header: () => <div>End date</div>,
      cell: ({ row }) => <div>{formatTimeDay(row.original.endDate)}</div>,
    },
    {
      id: "deleteAction",
      header: () => <div>Delete</div>,
      cell: ({ row }) => {
        const id = row.original.id;
        const isLoading = loadingIds.includes(id);
        return (
          <ConfirmDialog
            title="Xác nhận xóa"
            description="Bạn có chắc muốn xóa khuyến mãi này không?"
            confirmText="Xóa"
            cancelText="Hủy"
            onConfirm={() => handleDelete(id)}
            trigger={
              <Button variant="ghost" disabled={isLoading}>
                <Trash2 className="text-icon-system-danger" />
              </Button>
            }
          />
        );
      },
    },
    {
      id: "updateAction",
      header: () => <div>Update</div>,
      cell: ({ row }) => (
        <Button variant="ghost" onClick={() => openEditDialog(row.original)}>
          <SquarePen className="text-icon-brand-primary" />
        </Button>
      ),
    },
  ];

  return (
    <>
      <div className="bg-primary rounded-xl p-3">
        <DataTable columns={columns} data={sortedPromotions} />
      </div>

      {editingPromotion && (
        <EditPromotionDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          promotion={editingPromotion}
          onSubmit={handleUpdateSubmit}
        />
      )}
    </>
  );
};

export default PromotionsTable;
