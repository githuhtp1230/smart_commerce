"use client";
import PromotionsTable from "@/components/admin/promotion/PromotionsTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchPromotions } from "@/services/promotions.service";
import type { IPromotion } from "@/type/promotion";
import { useEffect, useState } from "react";

const tabs = [
  { name: "Khuyến mãi đang hoạt động", value: "false" },
  { name: "Khuyến mãi đã hết hạn", value: "true" },
];

export default function ManagePromotionPage() {
  const [promotions, setPromotions] = useState<IPromotion[]>([]);
  const [tabValue, setTabValue] = useState("false");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const isActived = tabValue === "true"; // chuyển về boolean
        const data = await fetchPromotions(isActived);
        setPromotions(data);
      } catch (error) {
        console.error("Lỗi khi lấy khuyến mãi:", error);
      }
    };

    fetchData();
  }, [tabValue]);

  return (
    <Tabs
      defaultValue="false"
      value={tabValue}
      onValueChange={setTabValue}
      className="w-full"
    >
      <TabsList className="w-full p-0 justify-start border-b rounded-none">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className=" bg-background h-full"
          >
            <p className="text-[15px]">{tab.name}</p>
          </TabsTrigger>
        ))}
      </TabsList>

      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          <PromotionsTable promotions={promotions} />
        </TabsContent>
      ))}
    </Tabs>
  );
}
