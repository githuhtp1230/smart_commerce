"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import type { IUser } from "@/type/auth";
import ProfileUser from "./ProfileUser";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchOrdersByUser, type OrderItem } from "@/services/order.service";
import { Loader2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog as DialogDetail,
  DialogContent as DialogContentDetail,
  DialogHeader as DialogHeaderDetail,
  DialogTitle as DialogTitleDetail,
  DialogDescription as DialogDescriptionDetail,
} from "@/components/ui/dialog";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import { useTranslation } from "react-i18next";

interface EmployeePermissionsDialogProps {
  user: IUser | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface PermissionItem {
  name: string;
  enabled: boolean;
}

export default function EmployeePermissionsDialog({
  user,
  open,
  onOpenChange,
}: EmployeePermissionsDialogProps) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<"History Orders" | "Permissions">(
    "Permissions"
  );

  const [permissions, setPermissions] = useState<PermissionItem[]>([
    { name: t("View user list"), enabled: true },
    { name: t("Add new user"), enabled: false },
    { name: t("Update user"), enabled: false },
    { name: t("Delete user"), enabled: true },
    { name: t("View statistics"), enabled: false },
  ]);

  const togglePermission = (index: number) => {
    setPermissions((prev) =>
      prev.map((p, i) => (i === index ? { ...p, enabled: !p.enabled } : p))
    );
  };

  /** Orders state */
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<OrderItem | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    if (!user) return;

    const loadOrders = async (currentPage: number) => {
      setLoadingOrders(true);
      try {
        const res = await fetchOrdersByUser(user.id, currentPage, pageSize);

        if (
          res.data.length === 0 &&
          res.totalElements > 0 &&
          currentPage !== 1
        ) {
          setPage(1);
          return;
        }

        setOrders(res.data);
        setTotalPages(res.totalPages || 1);
      } catch (err) {
        console.error("Failed to load orders:", err);
        setOrders([]);
        setTotalPages(1);
      } finally {
        setLoadingOrders(false);
      }
    };

    loadOrders(page);
  }, [user, page]);

  useEffect(() => {
    setActiveTab("Permissions");
    setPage(1);
  }, [user]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "!w-[70vw] !h-[75vh] !max-w-none !max-h-none",
          "overflow-auto scrollbar-hide p-6 bg-background-primary rounded-xl shadow-xl"
        )}
      >
        <DialogHeader className="mb-4">
          <DialogTitle className="text-xl font-bold text-txt-primary">
            {t("Employee Details")}
          </DialogTitle>
          <DialogDescription className="text-sm text-txt-primary mt-1">
            {t("View and manage employee permissions and order history")}
          </DialogDescription>
        </DialogHeader>

        {user ? (
          <>
            <div className="mb-4">
              <ProfileUser user={user} />
            </div>

            <div className="flex border-b border-gray-200 mb-4">
              {["History Orders", "Permissions"].map((tab) => (
                <button
                  key={tab}
                  onClick={() =>
                    setActiveTab(tab as "History Orders" | "Permissions")
                  }
                  className={cn(
                    "px-4 py-2 text-sm font-medium transition-all",
                    activeTab === tab
                      ? "border-b-4 border-green-500 text-green-600"
                      : "text-gray-500 hover:text-gray-700"
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="min-h-[250px]">
              {activeTab === "History Orders" && (
                <Card className="shadow-md">
                  <CardContent className="p-4">
                    {loadingOrders ? (
                      <div className="flex items-center justify-center py-10">
                        <Loader2 className="h-6 w-6 animate-spin text-gray-500 dark:text-gray-300" />
                      </div>
                    ) : orders.length === 0 ? (
                      <p className="text-center text-gray-700 dark:text-gray-300">
                        {t("You have no orders yet.")}
                      </p>
                    ) : (
                      <>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>{t("ID")}</TableHead>
                              <TableHead>{t("Product")}</TableHead>
                              <TableHead>{t("Image")}</TableHead>
                              <TableHead>{t("Total")}</TableHead>
                              <TableHead>{t("Date")}</TableHead>
                              <TableHead>{t("Delivery Method")}</TableHead>
                              <TableHead>{t("Status")}</TableHead>
                              <TableHead>{t("Details")}</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {orders.map((order) => (
                              <TableRow key={order.id}>
                                <TableCell>{order.id}</TableCell>
                                <TableCell>
                                  {order.orderDetails
                                    .map((d) => d.product.name)
                                    .join(", ")}
                                </TableCell>
                                <TableCell className="flex gap-2">
                                  {order.orderDetails.map((d, idx) => (
                                    <img
                                      key={idx}
                                      src={d.image ?? "/default-product.png"}
                                      alt={d.product.name}
                                      className="h-10 w-10 object-cover rounded border"
                                    />
                                  ))}
                                </TableCell>
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
                                    onClick={() => setSelectedOrder(order)}
                                  >
                                    <Eye className="h-4 w-4" /> Xem
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>

                        {/* Pagination */}
                        <div className="mt-4 flex justify-center">
                          <Pagination>
                            <PaginationContent>
                              <PaginationItem>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  disabled={page === 1}
                                  onClick={() =>
                                    setPage((prev) => Math.max(prev - 1, 1))
                                  }
                                >
                                  <PaginationPrevious />
                                </Button>
                              </PaginationItem>
                              {[...Array(totalPages)].map((_, idx) => {
                                const pageNum = idx + 1;
                                return (
                                  <PaginationItem key={pageNum}>
                                    <Button
                                      variant={
                                        page === pageNum ? "default" : "outline"
                                      }
                                      size="sm"
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
                                    setPage((prev) =>
                                      Math.min(prev + 1, totalPages)
                                    )
                                  }
                                >
                                  <PaginationNext />
                                </Button>
                              </PaginationItem>
                            </PaginationContent>
                          </Pagination>
                        </div>

                        {/* Dialog chi tiết */}
                        <DialogDetail
                          open={!!selectedOrder}
                          onOpenChange={() => setSelectedOrder(null)}
                        >
                          <DialogContentDetail className="max-w-lg">
                            <DialogHeaderDetail>
                              <DialogTitleDetail>
                                {t("Order details #{selectedOrder?.id}")}
                              </DialogTitleDetail>
                              <DialogDescriptionDetail>
                                {t("Order details placed.")}
                              </DialogDescriptionDetail>
                            </DialogHeaderDetail>

                            {selectedOrder && (
                              <div className="space-y-3 text-gray-800 dark:text-gray-100">
                                <p>
                                  <strong>{t("Order date:")}</strong>{" "}
                                  {new Date(selectedOrder.date).toLocaleString(
                                    "vi-VN"
                                  )}
                                </p>
                                <p>
                                  <strong>{t("Total amount:")}</strong>{" "}
                                  {selectedOrder.total.toLocaleString("vi-VN")}{" "}
                                  đ
                                </p>
                                <p>
                                  <strong>{t("Delivery method:")}</strong>{" "}
                                  {selectedOrder.deliveryMethod}
                                </p>
                                <p>
                                  <strong>{t("Status:")}</strong>{" "}
                                  {selectedOrder.status}
                                </p>
                                <div>
                                  <strong>{t("Products:")}</strong>
                                  <ul className="list-disc pl-5 mt-1">
                                    {selectedOrder.orderDetails.map(
                                      (d, idx) => (
                                        <li key={idx}>
                                          {d.product.name} x{d.quantity}
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </div>
                                <div className="flex gap-2 items-center">
                                  <strong>{t("Image:")}</strong>
                                  {selectedOrder.orderDetails.map((d, idx) => (
                                    <img
                                      key={idx}
                                      src={d.image ?? "/default-product.png"}
                                      alt={d.product.name}
                                      className="h-12 w-12 object-cover rounded border"
                                    />
                                  ))}
                                </div>
                              </div>
                            )}
                          </DialogContentDetail>
                        </DialogDetail>
                      </>
                    )}
                  </CardContent>
                </Card>
              )}

              {activeTab === "Permissions" && (
                <div className="grid grid-cols-2 gap-3">
                  {permissions.map((p, index) => (
                    <div
                      key={p.name}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border hover:shadow-sm transition"
                    >
                      <span className="text-gray-700 text-sm">{p.name}</span>
                      <button
                        onClick={() => togglePermission(index)}
                        className={cn(
                          "w-9 h-4 rounded-full p-0.5 transition-colors",
                          p.enabled ? "bg-green-500" : "bg-gray-300"
                        )}
                      >
                        <span
                          className={cn(
                            "block w-3.5 h-3.5 bg-white rounded-full shadow transform transition-transform",
                            p.enabled ? "translate-x-5" : "translate-x-0"
                          )}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        ) : (
          <p className="text-gray-500">{t("No user selected")}</p>
        )}
      </DialogContent>
    </Dialog>
  );
}
