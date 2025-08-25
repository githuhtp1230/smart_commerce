import { t } from "i18next";
import steps, { statusToIndex } from "@/utils/order-steps";
import {
  updateOrderStatus,
  type IOrderSummary,
  type PageResponse,
} from "@/services/order.service";

import { useMemo, useState } from "react";
import OrderStepper from "@/components/user/OrderStepper";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  CheckCircle2,
  Ellipsis,
  EllipsisVertical,
  PackageCheck,
  Search,
  Truck,
  XCircle,
} from "lucide-react";

interface OrdersTableProps {
  orders: IOrderSummary[];
  pagination?: Omit<PageResponse<IOrderSummary>, "data">;
  onPageChange?: (page: number) => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filterStatus: string;
  stats: Record<string, number>;
  onUpdateOrder?: (updatedOrder: IOrderSummary) => void;
}

const OrdersTable = ({
  orders,
  pagination,
  onPageChange,
  searchTerm,
  onSearchChange,
  filterStatus,
  stats,
  onUpdateOrder,
}: OrdersTableProps) => {
  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<IOrderSummary | null>(
    null
  );
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [selectedStatusOrder, setSelectedStatusOrder] =
    useState<IOrderSummary | null>(null);
  const [newStatus, setNewStatus] = useState<string>(""); // trạng thái mới

  const handleOpenStatusDialog = (order: IOrderSummary) => {
    setSelectedStatusOrder(order);
    setNewStatus(order.status); // mặc định là trạng thái hiện tại
    setStatusDialogOpen(true);
  };

  const handleOpenDetail = (order: IOrderSummary) => {
    setSelectedOrder(order);
    setOpen(true);
  };

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchSearch =
        order.id.toString().includes(searchTerm) ||
        order.userId?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.orderDetails.some((d) =>
          d.product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const orderDate = new Date(order.createdAt);
      const matchDate =
        (!startDate || orderDate >= new Date(startDate)) &&
        (!endDate || orderDate <= new Date(endDate));

      return matchSearch && matchDate;
    });
  }, [orders, searchTerm, filterStatus, startDate, endDate]);

  const statsByDate = useMemo(() => {
    return filteredOrders.reduce<Record<string, number>>((acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    }, {});
  }, [filteredOrders]);

  const statusCards = [
    {
      key: "DELIVERED",
      label: "Delivered",
      icon: CheckCircle2,
      color: "text-green-500",
      count: stats.delivered || 0,
      countByDate: statsByDate.delivered || 0,
    },
    {
      key: "CONFIRMED",
      label: "Confirmed",
      icon: PackageCheck,
      color: "text-blue-500",
      count: stats.confirmed || 0,
      countByDate: statsByDate.confirmed || 0,
    },
    {
      key: "CANCELLED",
      label: "Cancelled",
      icon: XCircle,
      color: "text-red-500",
      count: stats.cancelled || 0,
      countByDate: statsByDate.cancelled || 0,
    },
    {
      key: "SHIPPING",
      label: "Shipping",
      icon: Truck,
      color: "text-yellow-500",
      count: stats.shipping || 0,
      countByDate: statsByDate.shipping || 0,
    },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 md:items-center md:justify-between mt-4">
        <div className="flex flex-col items-center justify-start gap-4 p-4 rounded-lg bg-background-primary w-full ">
          {/* Chọn ngày */}
          <div className="flex flex-wrap items-start justify-start gap-6 w-full">
            <div className="flex items-center gap-3">
              <label className="text-sm font-medium">From</label>
              <input
                type="date"
                className="border rounded-lg px-7 py-2 text-sm bg-secondary focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-3">
              <label className="text-sm font-medium">To</label>
              <input
                type="date"
                className="border rounded-lg px-7 py-2 text-sm bg-secondary focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>

          </div>

          {/* Search */}
          <div className="relative w-full">
            {/* Icon */}
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>

            {/* Input */}
            <input
              type="text"
              placeholder="Search by order products, customer or status..."
              className="border rounded-lg px-10 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </div>

        <div>
          {/* Icon Order Trạng thái */}
          <div className="flex flex-wrap gap-6 justify-center">
            {statusCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.key}
                  className="flex flex-col items-center justify-center w-32 h-32 bg-background-primary rounded-2xl "
                >
                  <div className={`${card.color} mb-2`}>
                    <Icon size={28} />
                  </div>
                  <div className="text-sm font-medium mb-2">{t(card.label)}</div>
                  <div className="text-base">
                    {card.countByDate} / {card.count}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Ảnh</TableHead>
            <TableHead>Mã đơn</TableHead>
            <TableHead>Sản phẩm</TableHead>
            <TableHead>Hành động</TableHead>
            <TableHead>Tổng tiền</TableHead>
            <TableHead>Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredOrders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>
                <img
                  src={order.productImage}
                  alt="product"
                  className="w-14 h-14 object-cover rounded"
                />
              </TableCell>

              <TableCell>{order.id}</TableCell>

              <TableCell>
                {" "}
                {(order.orderDetails ?? [])
                  .slice(0, 3)
                  .map((d) => d.product?.name)
                  .join(", ")}{" "}
                {order.orderDetails && order.orderDetails.length > 3 && ", ..."}{" "}
              </TableCell>

              <TableCell>
                <OrderStepper
                  steps={steps}
                  currentStep={statusToIndex(order.status)}
                />
              </TableCell>

              <TableCell>
                <div className="  font-semibold">
                  {order.total.toLocaleString("vi-VN")} ₫
                </div>
              </TableCell>

              <TableCell>
                <div className="flex items-center gap-2">
                  <button
                    className="py-1 rounded-full text-red-500 hover:bg-red-50 transition"
                    onClick={() => handleOpenDetail(order)}
                  >
                    {t("OrderDetail")}
                  </button>
                  <div>
                    <button onClick={() => handleOpenStatusDialog(order)}>
                      <EllipsisVertical />
                    </button>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={statusDialogOpen} onOpenChange={setStatusDialogOpen}>
        <DialogContent className="sm:max-w-sm">
          {selectedStatusOrder && (
            <>
              <DialogHeader>
                <DialogTitle>
                  Cập nhật trạng thái đơn #{selectedStatusOrder.id}
                </DialogTitle>
                <DialogDescription>
                  Chọn trạng thái mới cho đơn hàng này.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-2 my-4">
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full border bg-secondary rounded-lg px-3 py-2"
                >
                  <option value="">....</option>
                  <option value="CANCELLED">{t("Cancelled")}</option>
                  <option value="CONFIRMED">{t("Confirmed")}</option>
                  <option value="SHIPPING">{t("Shipping")}</option>
                  <option value="DELIVERED">{t("Delivered")}</option>
                </select>
              </div>
              <DialogFooter className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setStatusDialogOpen(false)}
                >
                  Đóng
                </Button>
                <Button
                  variant="outline"
                  onClick={async () => {
                    if (!selectedStatusOrder || !onUpdateOrder) return;
                    try {
                      const updatedOrder = await updateOrderStatus(
                        selectedStatusOrder.id,
                        newStatus
                      );
                      onUpdateOrder(updatedOrder);
                      setStatusDialogOpen(false);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                >
                  Cập nhật
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg">
          {selectedOrder && (
            <>
              <DialogHeader>
                <DialogTitle>
                  {t("Order no")} #{selectedOrder.id}
                </DialogTitle>
                <DialogDescription>
                  {t("Created at")}:{" "}
                  {new Date(selectedOrder.createdAt).toLocaleDateString(
                    "vi-VN"
                  )}
                </DialogDescription>
              </DialogHeader>

              {selectedOrder.userId && (
                <div className="mb-4 p-3 rounded-lg border">
                  <p className="text-sm">
                    <span className="font-medium">{t("Customer")}:</span>{" "}
                    {selectedOrder.userId.name}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">{t("Phone")}:</span>{" "}
                    {selectedOrder.userId.phone}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">{t("Address")}:</span>{" "}
                    {selectedOrder.address}
                  </p>
                </div>
              )}

              <div className="space-y-2">
                {selectedOrder.orderDetails.map((detail: any) => (
                  <div
                    key={detail.id}
                    className="flex items-center gap-3 border-b pb-2"
                  >
                    <img
                      src={detail.image}
                      alt={detail.product.name}
                      className="w-16 h-16 object-contain rounded"
                    />
                    <div>
                      <p className="font-medium">{detail.product.name}</p>
                      <p className="text-sm text-gray-500">
                        {t("Quantity")}: {detail.quantity}
                      </p>
                      <p className="text-sm text-gray-500">
                        {t("Price")}: {detail.price.toLocaleString("vi-VN")} ₫
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4">
                <p className="text-sm">
                  <span className="font-medium">{t("Total Money")}:</span>{" "}
                  <span className="text-red-500">
                    {selectedOrder.total.toLocaleString("vi-VN")} ₫
                  </span>
                </p>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>
                  {t("Close")}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Pagination */}
      {pagination && onPageChange && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (pagination.currentPage > 1) {
                    onPageChange(pagination.currentPage - 1);
                  }
                }}
              />
            </PaginationItem>

            {Array.from({ length: pagination.totalPages }, (_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  href="#"
                  isActive={pagination.currentPage === i + 1}
                  onClick={(e) => {
                    e.preventDefault();
                    onPageChange(i + 1);
                  }}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (!pagination.isLast) {
                    onPageChange(pagination.currentPage + 1);
                  }
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default OrdersTable;
