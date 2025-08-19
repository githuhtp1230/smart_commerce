"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export interface OrderDetail {
  productId: number;
  productName: string;
  quantity: number;
  price: number;
}

interface OrderDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  orderId: number | null;
  details: OrderDetail[];
}

export default function OrderDetailsDialog({
  open,
  onOpenChange,
  orderId,
  details,
}: OrderDetailsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Chi tiết đơn hàng #{orderId}
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4 overflow-x-auto">
          {details.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-left">Sản phẩm</TableHead>
                  <TableHead className="text-center">Số lượng</TableHead>
                  <TableHead className="text-right">Giá</TableHead>
                  <TableHead className="text-right">Thành tiền</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {details.map((d, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{d.productName ?? `#${d.productId}`}</TableCell>
                    <TableCell className="text-center">{d.quantity}</TableCell>
                    <TableCell className="text-right">
                      {d.price.toLocaleString("vi-VN")} ₫
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {(d.quantity * d.price).toLocaleString("vi-VN")} ₫
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-center text-muted-foreground py-6">
              Không có sản phẩm nào trong đơn hàng này.
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
