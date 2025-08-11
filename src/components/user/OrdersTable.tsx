// src/components/user/orders/OrdersTable.tsx
import { DataTable } from "@/components/common/table/DataTable";
import type { IOrder } from "@/type/order";
import type { ColumnDef } from "@tanstack/react-table";
import { AppBadge } from "@/components/common/badge/AppBadge";
import { t } from "i18next";

interface OrdersTableProps {
  orders: IOrder[];
}
type BadgeColor = "red" | "blue" | "amber" | "emerald" | "green";
const statusBadgeColor = (status?: string): BadgeColor => {
  const s = (status || "").toLowerCase();
  if (["confirmed", "completed", "delivered", "paid"].includes(s)) return "green";
  if (["pending", "processing", "shipping"].includes(s)) return "amber";
  if (["cancelled", "canceled", "refunded"].includes(s)) return "red";
  return "blue"; 
};

const OrdersTable = ({ orders }: OrdersTableProps) => {
  const columns: ColumnDef<IOrder>[] = [
    {
      accessorKey: "id",
      header: () => <div>{t("Single code")}</div>,
      cell: ({ row }) => <div>{row.original.id}</div>,
    },
    {
      accessorKey: "createdAt",
      header: () => <div>{t("Order date")}</div>,
      cell: ({ row }) => (
        <div className="text-muted-foreground">
          {new Date(row.original.createdAt).toLocaleDateString("vi-VN", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: () => <div>{t("Order status")}</div>,
      cell: ({ row }) => (
        <AppBadge
          badgeColor={statusBadgeColor(row.original.status)}
          content={t(row.original.status || "Unknown")}
        />
      ),
    },
    {
      accessorKey: "total",
      header: () => <div >{t("Total amount")}</div>,
      cell: ({ row }) => (
        <div className="text-right font-semibold text-success">
          {row.original.total.toLocaleString("vi-VN")} ₫
        </div>
      ),
    },
  ];

  return (
    <div className="bg-primary rounded-xl p-3">
      <DataTable columns={columns} data={orders} />
    </div>
  );
};

export default OrdersTable;
