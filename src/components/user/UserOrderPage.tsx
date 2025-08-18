import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OrdersTable from "./OrdersTable";
import { getMyOrders, type IOrderSummary, type PageResponse } from "@/services/order.service";
import { useTranslation } from "react-i18next";

const tabs = [
  { name: "ALL", value: "ALL" },
  { name: "Confirmed", value: "CONFIRMED" },
  { name: "Cancelled", value: "CANCELLED" },
  { name: "Shipping", value: "SHIPPING" },
  { name: "Delivered", value: "DELIVERED" },
];

const UserOrderPage = () => {
  const { t } = useTranslation();
  const [tabValue, setTabValue] = useState("ALL");
  const [orders, setOrders] = useState<IOrderSummary[]>([]);
  const [pagination, setPagination] = useState<Omit<PageResponse<IOrderSummary>, "data">>();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  // Fetch data khi tab hoặc page thay đổi
  useEffect(() => {
    const fetchData = async () => {
      try {
        const status = tabValue === "ALL" ? undefined : tabValue.toLowerCase();
        const res = await getMyOrders(status, currentPage, pageSize);

        setOrders(res.data);
        setPagination({
          currentPage: res.currentPage,
          totalPages: res.totalPages,
          limit: res.limit,
          totalElements: res.totalElements,
          isLast: res.isLast,
        });
      } catch (error) {
        console.error("Lỗi khi lấy danh sách đơn hàng:", error);
      }
    };
    fetchData();
  }, [tabValue, currentPage]);

  // Reset page về 1 khi đổi tab
  const handleTabChange = (value: string) => {
    setTabValue(value);
    setCurrentPage(1);
  };

  return (
    <Tabs value={tabValue} onValueChange={handleTabChange} className="w-full">
      <TabsList className="w-full p-0 justify-start border-b rounded-none">
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value} className="bg-background h-full">
            <p className="text-[15px]">{t(tab.name)}</p>
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value={tabValue}>
        <OrdersTable
          orders={orders}
          pagination={pagination}
          onPageChange={setCurrentPage}
        />
      </TabsContent>
    </Tabs>
  );
};

export default UserOrderPage;
