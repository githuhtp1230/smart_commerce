import { useState } from "react";
import { DataTable } from "@/components/common/table/DataTable";
import { Button } from "@/components/ui/button";
import { formatTimeDay } from "@/helper/format-time-day";
import type { IPromotion } from "@/type/promotion";
import type { ColumnDef } from "@tanstack/react-table";
import { Ellipsis, PencilLineIcon, RefreshCcw } from "lucide-react";

import {
  togglePromotion,
  updatePromotion,
} from "@/services/promotions.service";
import EditPromotionDialog from "./EditPromotionDialog";
import PreviewPromotionDialog from "./PreviewPromotionDialog";

import { toastSuccess, toastError } from "@/components/common/sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Eye } from "@/assets/icons";

interface Props {
  promotions: IPromotion[];
  onChange?: (jumpToExpired?: boolean) => void;
}

const PromotionsTable = ({ promotions, onChange }: Props) => {
  const [promotionList, setPromotionList] = useState<IPromotion[]>(
    [...promotions].sort((a, b) => b.id - a.id)
  );
  const [loadingIds, setLoadingIds] = useState<number[]>([]);

  const [editingPromotion, setEditingPromotion] = useState<IPromotion | null>(
    null
  );
  const [dialogOpen, setDialogOpen] = useState(false);

  const [previewPromotion, setPreviewPromotion] = useState<IPromotion | null>(
    null
  );
  const [previewOpen, setPreviewOpen] = useState(false);

  // 👉 Toggle Status
  const handleToggle = async (id: number) => {
    try {
      setLoadingIds((ids) => [...ids, id]);
      await togglePromotion(id);

      // cập nhật luôn UI: đảo trạng thái
      setPromotionList((prev) =>
        prev.map((p) => (p.id === id ? { ...p, isActive: !p.isActive } : p))
      );

      toastSuccess("Cập nhật trạng thái thành công!");
      onChange?.(true);
    } catch {
      toastError("Thao tác thất bại. Vui lòng thử lại.");
    } finally {
      setLoadingIds((ids) => ids.filter((x) => x !== id));
    }
  };

  // 👉 Edit
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
      const updated = await updatePromotion(editingPromotion.id, {
        description: data.description,
        discountValuePercent: data.discountValuePercent,
        startDate: new Date(data.startDate).toISOString(),
        endDate: new Date(data.endDate).toISOString(),
      });

      toastSuccess("Cập nhật thành công!");

      setPromotionList((prev) =>
        prev.map((p) =>
          p.id === editingPromotion.id ? { ...p, ...updated } : p
        )
      );

      onChange?.();
      setDialogOpen(false);
    } catch {
      toastError("Cập nhật thất bại. Vui lòng thử lại.");
    }
  };

  // 👉 Preview
  const openPreviewDialog = (promotion: IPromotion) => {
    setPreviewPromotion(promotion);
    setPreviewOpen(true);
  };

  const columns: ColumnDef<IPromotion>[] = [
    {
      accessorKey: "id",
      header: "Id",
      cell: ({ row }) => <div>{row.index + 1}</div>,
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => <div>{row.original.description}</div>,
    },
    {
      accessorKey: "discountValuePercent",
      header: "Discount (%)",
      cell: ({ row }) => <div>{row.original.discountValuePercent}%</div>,
    },
    {
      accessorKey: "startDate",
      header: "Start Date",
      cell: ({ row }) => <div>{formatTimeDay(row.original.startDate)}</div>,
    },
    {
      accessorKey: "endDate",
      header: "End Date",
      cell: ({ row }) => <div>{formatTimeDay(row.original.endDate)}</div>,
    },
    {
      accessorKey: "is_active",
      header: "Status",
      cell: ({ row }) => {
        const isActive = row.original.isActive;

        return (
          <span
            className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${
              isActive
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-600"
            }`}
          >
            {/* Dot nằm trong bg luôn */}
            <span
              className={`w-2 h-2 rounded-full ${
                isActive ? "bg-green-600" : "bg-red-600"
              }`}
            />
            {isActive ? "Active" : "Inactive"}
          </span>
        );
      },
    },
    {
      id: "actions",
      header: " ",
      cell: ({ row }) => {
        const promotion = row.original;
        const id = promotion.id;
        const isLoading = loadingIds.includes(id);

        return (
          <div className="w-full">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-muted rounded-full transition"
                >
                  <Ellipsis className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                sideOffset={5}
                className="w-44 rounded-lg shadow-md border bg-white dark:bg-neutral-900 dark:border-neutral-700 font-bold"
              >
                <DropdownMenuItem
                  onClick={() => openPreviewDialog(promotion)}
                  className="flex items-center gap-2 px-3 py-2 cursor-pointer rounded-md "
                >
                  <Eye className="w-4 h-4 text-black" />
                  <span className="text-sm">Preview</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => openEditDialog(promotion)}
                  className="flex items-center gap-2 px-3 py-2 cursor-pointer rounded-md "
                >
                  <PencilLineIcon className="w-4 h-4 text-black" />
                  <span className="text-sm">Edit</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleToggle(promotion.id)}
                  disabled={isLoading}
                  className="flex items-center gap-2 px-3 py-2 cursor-pointer rounded-md "
                >
                  <RefreshCcw className="text-black" />
                  {promotion.isActive ? "Deactivate" : "Activate"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <div className="bg-primary rounded-xl p-3">
        <DataTable columns={columns} data={promotionList} />
      </div>

      {/* Preview Dialog */}
      {previewPromotion && (
        <PreviewPromotionDialog
          open={previewOpen}
          onOpenChange={setPreviewOpen}
          promotion={previewPromotion}
        />
      )}

      {/* Edit Dialog */}
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
