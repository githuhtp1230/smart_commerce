"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchOrdersByUser, type OrderItem } from "@/services/order.service";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";

export default function OrdersTable() {
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<OrderItem | null>(null);

  // Thêm state cho phân trang
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 5; // số đơn hàng mỗi trang

  useEffect(() => {
    const loadOrders = async () => {
      try {
        setLoading(true);
        const res = await fetchOrdersByUser(page, pageSize);
        setOrders(res.content);
        setTotalPages(res.totalPages);
      } catch (error) {
        console.error("Failed to load orders:", error);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, [page]);

  return (
    <Card className="shadow-md">
      <CardContent className="p-4">
        {loading ? (
          <div className="flex items-center justify-center py-10">
            <Loader2 className="h-6 w-6 animate-spin text-gray-500 dark:text-gray-300" />
          </div>
        ) : orders.length === 0 ? (
          <p className="text-center text-gray-700 dark:text-gray-300">
            Bạn chưa có đơn hàng nào.
          </p>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Sản phẩm</TableHead>
                  <TableHead>Tổng tiền</TableHead>
                  <TableHead>Ngày đặt</TableHead>
                  <TableHead>Phương thức giao</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Chi tiết</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.products ?? "—"}</TableCell>
                    <TableCell>
                      {order.total.toLocaleString("vi-VN")} đ
                    </TableCell>
                    <TableCell>
                      {new Date(order.date).toLocaleString("vi-VN")}
                    </TableCell>
                    <TableCell>{order.deliveryMethod}</TableCell>
                    <TableCell>{order.status}</TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1"
                        onClick={() => setSelectedOrder(order)}
                      >
                        <Eye className="h-4 w-4" />
                        Xem
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Phân trang */}
            <div className="mt-4 flex justify-center">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={page === 1}
                      onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    >
                      <PaginationPrevious />
                    </Button>
                  </PaginationItem>

                  {[...Array(totalPages)].map((_, idx) => {
                    const pageNum = idx + 1;
                    return (
                      <PaginationItem key={pageNum}>
                        <Button
                          variant={page === pageNum ? "default" : "outline"}
                          size="sm"
                          className={
                            page === pageNum ? "bg-blue-500 text-white" : ""
                          }
                          onClick={() => setPage(pageNum)}
                        >
                          {pageNum}
                        </Button>
                      </PaginationItem>
                    );
                  })}

                  <PaginationItem>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={page === totalPages}
                      onClick={() =>
                        setPage((prev) => Math.min(prev + 1, totalPages))
                      }
                    >
                      <PaginationNext />
                    </Button>
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>

            {/* Dialog Chi tiết đơn hàng */}
            <Dialog
              open={!!selectedOrder}
              onOpenChange={() => setSelectedOrder(null)}
            >
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle>
                    Chi tiết đơn hàng #{selectedOrder?.id}
                  </DialogTitle>
                  <DialogDescription>
                    Thông tin chi tiết đơn hàng đã đặt.
                  </DialogDescription>
                </DialogHeader>
                {selectedOrder && (
                  <div className="space-y-3 text-gray-800 dark:text-gray-100">
                    <p>
                      <strong>Ngày đặt:</strong>{" "}
                      {new Date(selectedOrder.date).toLocaleString("vi-VN")}
                    </p>
                    <p>
                      <strong>Tổng tiền:</strong>{" "}
                      {selectedOrder.total.toLocaleString("vi-VN")} đ
                    </p>
                    <p>
                      <strong>Phương thức giao:</strong>{" "}
                      {selectedOrder.deliveryMethod}
                    </p>
                    <p>
                      <strong>Trạng thái:</strong> {selectedOrder.status}
                    </p>
                    <div>
                      <strong>Sản phẩm:</strong>
                      <ul className="list-disc pl-5 mt-1">
                        {Array.isArray((selectedOrder as any).products) ? (
                          (selectedOrder as any).products.map(
                            (p: string, idx: number) => <li key={idx}>{p}</li>
                          )
                        ) : (
                          <li>{(selectedOrder as any).products ?? "—"}</li>
                        )}
                      </ul>
                    </div>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </>
        )}
      </CardContent>
    </Card>
  );
}
