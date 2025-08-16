import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { IOrder } from "@/type/order";
import OrdersTable from "./OrdersTable";
import { getMyOrdersByStatus } from "@/services/order.service";
import { useTranslation } from "react-i18next";

const tabs = [
  { name: "Confirmed", value: "CONFIRMED" },
  { name: "Cancelled", value: "CANCELLED" },
  { name: "Shipping", value: "SHIPPING" },
  { name: "Shipped", value: "SHIPPED" },
];

const UserOrderPage = () => {
  const { t } = useTranslation();
  const [tabValue, setTabValue] = useState("CONFIRMED");
  const [ordersByStatus, setOrdersByStatus] = useState<Record<string, IOrder[]>>({
    CONFIRMED: [],
    CANCELLED: [],
    SHIPPING: [],
    SHIPPED: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMyOrdersByStatus();
        setOrdersByStatus({
          CONFIRMED: data.confirmed || [],
          CANCELLED: data.cancelled || [],
          SHIPPING: data.shipping || [],
          SHIPPED: data.shipped || [],
        });
      } catch (error) {
        console.error("Lỗi khi lấy danh sách đơn hàng:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Tabs
      defaultValue="CONFIRMED"
      value={tabValue}
      onValueChange={setTabValue}
      className="w-full"
    >
      <TabsList className="w-full p-0 justify-start border-b rounded-none">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="bg-background h-full"
          >
            <p className="text-[15px]">{t(tab.name)}</p>
          </TabsTrigger>
        ))}
      </TabsList>

      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          <OrdersTable orders={ordersByStatus[tab.value]} />
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default UserOrderPage;
