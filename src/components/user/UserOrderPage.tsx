import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import OrdersTable from "./OrdersTable";
import { getMyOrders, type IOrderSummary, type PageResponse } from "@/services/order.service";
import { useTranslation } from "react-i18next";
import CustomTabsTrigger from "../common/tabs/CustomTabsTrigger";

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
          <CustomTabsTrigger key={tab.value} value={tab.value} className="bg-background h-full">
            <p className="text-[15px]">{t(tab.name)}</p>
          </CustomTabsTrigger>
        ))}
      </TabsList>

      <TabsContent value={tabValue}>
        {orders.length === 0 ? (
          <div className="text-center text-gray-500 py-10 text-lg font-semibold">
            <div className="flex justify-center mb-4 ">
              <img src="https://cdni.iconscout.com/illustration/premium/thumb/woman-with-empty-shopping-cart-illustration-svg-png-download-10018099.png" alt="" className="w-32" />
            </div>
            Không có đơn hàng nào cả
          </div>
        ) : (
          <OrdersTable
            orders={orders}
            pagination={pagination}
            onPageChange={setCurrentPage}
          />
        )}
      </TabsContent>
    </Tabs>
  );
};

export default UserOrderPage;
