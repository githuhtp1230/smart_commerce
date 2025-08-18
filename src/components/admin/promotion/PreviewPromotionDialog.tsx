"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatTimeDay } from "@/helper/format-time-day";
import type { IPromotion } from "@/type/promotion";
import { Calendar, Percent, FileText, Tag } from "lucide-react";
import EditPromotionDialog from "./EditPromotionDialog";

interface PreviewPromotionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  promotion: IPromotion | null;
}

const PreviewPromotionDialog = ({
  open,
  onOpenChange,
  promotion,
}: PreviewPromotionDialogProps) => {
  const [editOpen, setEditOpen] = useState(false);

  if (!promotion) return null;

  return (
    <>
      {/* Preview Dialog */}
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-xl rounded-2xl p-6 space-y-6">
          {/* Header */}
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold tracking-tight">
              Promotion #{promotion.id}
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              Xem thông tin chi tiết về chương trình khuyến mãi
            </DialogDescription>
          </DialogHeader>

          {/* Status */}
          <div className="flex justify-between items-center border rounded-lg p-3 bg-muted/30">
            <span className="text-sm font-medium text-muted-foreground">
              Trạng thái
            </span>
            <Badge
              className={`flex items-center gap-2 px-3 py-1 rounded-full ${
                promotion.isActive
                  ? "bg-green-100 text-green-700 hover:bg-green-200"
                  : "bg-red-100 text-red-700 hover:bg-red-200"
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  promotion.isActive ? "bg-green-600" : "bg-red-600"
                }`}
              />
              {promotion.isActive ? "Active" : "Inactive"}
            </Badge>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <FileText className="w-4 h-4" />
              <span>Description</span>
            </div>
            <p className="text-base leading-relaxed bg-muted/40 p-3 rounded-lg border">
              {promotion.description}
            </p>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-4">
            {/* Promotion ID */}
            <div className="p-3 rounded-lg border bg-card shadow-sm">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Tag className="w-4 h-4" />
                Promotion ID
              </div>
              <p className="font-medium mt-1">#{promotion.id}</p>
            </div>

            {/* Discount */}
            <div className="p-3 rounded-lg border bg-card shadow-sm">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Percent className="w-4 h-4" />
                Discount
              </div>
              <p className="font-semibold text-lg mt-1">
                {promotion.discountValuePercent}%
              </p>
            </div>

            {/* Start Date */}
            <div className="p-3 rounded-lg border bg-card shadow-sm">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                Start Date
              </div>
              <p className="font-medium mt-1">
                {formatTimeDay(promotion.startDate)}
              </p>
            </div>

            {/* End Date */}
            <div className="p-3 rounded-lg border bg-card shadow-sm">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                End Date
              </div>
              <p className="font-medium mt-1">
                {formatTimeDay(promotion.endDate)}
              </p>
            </div>
          </div>

          {/* Footer */}
          <DialogFooter className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close Preview
            </Button>
            <Button
              onClick={() => {
                onOpenChange(false);
                setEditOpen(true);
              }}
              className="bg-blue-500 text-white hover:text-white hover:bg-blue-600"
            >
              Edit Promotion
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* EditPromotionDialog tái sử dụng */}
      {promotion && (
        <EditPromotionDialog
          open={editOpen}
          onOpenChange={setEditOpen}
          promotion={promotion}
          // onSubmit sẽ được handle bên PromotionsTable, nên ở đây chỉ toggle thôi
          onSubmit={() => {}}
        />
      )}
    </>
  );
};

export default PreviewPromotionDialog;
