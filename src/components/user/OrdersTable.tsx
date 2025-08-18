import { t } from "i18next";
import OrderStepper from "./OrderStepper";
import steps, { statusToIndex } from "@/utils/order-steps";
import type { IOrderSummary, PageResponse } from "@/services/order.service";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../ui/pagination";

interface OrdersTableProps {
  orders: IOrderSummary[];
  pagination?: Omit<PageResponse<IOrderSummary>, "data">;
  onPageChange?: (page: number) => void;
}

const OrdersTable = ({
  orders,
  pagination,
  onPageChange,
}: OrdersTableProps) => {
  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div
          key={order.id}
          className="flex flex-col p-4 bg-primary border-gray-200 rounded-xl shadow-sm"
        >
          <div className="flex justify-between items-start gap-6">
            <img
              className="w-52 h-44 object-cover rounded-lg shadow-md border border-gray-200 flex-shrink-0"
              src={order.productImage}
            />

            <div className="flex-1 flex flex-col justify-start">
              <h3 className="text-2xl font-bold text-secondary-foreground mb-2">
                {t("Order no")} #{order.id}
              </h3>
              <p className="text-m mb-2">
                {t("Products")}:{" "}
                {order.orderDetails
                  .slice(0, 3)
                  .map((order) => order.product.name)
                  .join(", ")}
                  {order.orderDetails.length > 3 && ", ..."}
              </p>
              <div className="flex items-center gap-2 mb-2">
                <p className="flex text-secondary-foreground font-medium">
                  {t("Total Money")}:
                </p>
                <div className="text-red-500">
                  {order.total.toLocaleString("vi-VN")} vn₫
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <button className="px-4 py-1 rounded-full bg-green-500 text-white hover:bg-green-600 transition">
                {t("Buy back")}
              </button>
              <button className="px-4 py-1 rounded-full text-red-500 hover:bg-red-50 transition">
                {t("OrderDetail")}
              </button>
            </div>
          </div>

          <div>
            <OrderStepper
              steps={steps}
              currentStep={statusToIndex(order.status)}
            />
          </div>
          <div className="text-sm text-gray-500 flex flex-wrap gap-x-4 gap-y-1">
            <span>
              {new Date(order.createdAt).toLocaleDateString("vi-VN", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
            <span>{order.address}</span>
          </div>
        </div>
      ))}

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
