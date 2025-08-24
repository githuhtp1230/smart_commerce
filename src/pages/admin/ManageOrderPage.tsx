import OrdersTable from "@/components/admin/order/OrdersTable";
import {
  getAllOrders,
  getOrderStats,
  type IOrderSummary,
  type PageResponse,
} from "@/services/order.service";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { use, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import CustomTabsTrigger from "@/components/common/tabs/CustomTabsTrigger";

const tabs = [
  { name: "ALL", value: "ALL" },
  { name: "Confirmed", value: "CONFIRMED" },
  { name: "Cancelled", value: "CANCELLED" },
  { name: "Shipping", value: "SHIPPING" },
  { name: "Delivered", value: "DELIVERED" },
];
export default function ManageOrderPage() {
  const { t } = useTranslation();
  const [tabValue, setTabValue] = useState("ALL");
  const [orders, setOrders] = useState<IOrderSummary[]>([]);
  const [pagination, setPagination] =
    useState<Omit<PageResponse<IOrderSummary>, "data">>();
  const [filterStatus, setFilterStatus] = useState<string>("ALL");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 20;
  const [stats, setStats] = useState<Record<string, number>>({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const status =
          filterStatus === "ALL" ? undefined : filterStatus.toLowerCase();
        const [ordersRes, statsRes] = await Promise.all([
          getAllOrders(status, currentPage, pageSize, searchTerm),
          getOrderStats(),
        ]);

        setOrders(ordersRes.data);
        setPagination({
          currentPage: ordersRes.currentPage,
          totalPages: ordersRes.totalPages,
          limit: ordersRes.limit,
          totalElements: ordersRes.totalElements,
          isLast: ordersRes.isLast,
        });
        setStats(statsRes);
      } catch (e) {
        console.error("Lỗi khi lấy danh sách đơn hàng:", e);
      }
    };
    fetchData();
  }, [filterStatus, searchTerm, currentPage, pageSize]);
  const handleTabChange = (value: string) => {
    setTabValue(value);
    setFilterStatus(value);
    setCurrentPage(1);
  };

  return (
    <>
      <Tabs
        value={tabValue}
        onValueChange={handleTabChange}
        className="w-full gap-0 px-4"
      >
        <TabsList className="p-0 justify-start">
          {tabs.map((tab) => (
            <CustomTabsTrigger
              key={tab.name}
              value={tab.value}
              className="bg-background h-full"
            >
              <p className="text-[15px]">{t(tab.name)}</p>
            </CustomTabsTrigger>
          ))}
        </TabsList>
        <TabsContent value={tabValue}>
          <OrdersTable
            orders={orders}
            pagination={pagination}
            onPageChange={setCurrentPage}
            filterStatus={filterStatus}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            stats={stats}
            onUpdateOrder={(updatedOrder: IOrderSummary) => {
              setOrders((prev) =>
                prev.map((o) => (o.id === updatedOrder.id ? updatedOrder : o))
              );
            }}
          />
        </TabsContent>
      </Tabs>
    </>
  );
}
