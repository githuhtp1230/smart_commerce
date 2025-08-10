"use client";

import AddPromotions from "@/components/admin/promotion/AddPromotions";
import PromotionsTable from "@/components/admin/promotion/PromotionsTable";
import CustomTabsTrigger from "@/components/common/tabs/CustomTabsTrigger";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import { fetchPromotions } from "@/services/promotions.service";
import type { IPromotion } from "@/type/promotion";
import { useEffect, useState } from "react";

const tabs = [
  { name: "Khuyến mãi đang hoạt động", value: "true" },
  { name: "Khuyến mãi ngừng hoạt động", value: "false" },
];

export default function ManagePromotionPage() {
  const [promotions, setPromotions] = useState<IPromotion[]>([]);
  const [tabValue, setTabValue] = useState("true");
  const [loading, setLoading] = useState(false);

  const loadPromotions = async (isActived: boolean) => {
    try {
      setLoading(true);
      const data = await fetchPromotions({ isActived });
      setPromotions(data);
    } catch (error) {
      console.error("Lỗi khi lấy khuyến mãi:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPromotions(tabValue === "true");
  }, [tabValue]);

  return (
    <div>
      <div>
        <AddPromotions onSuccess={() => loadPromotions(tabValue === "true")} />
      </div>
      <Tabs value={tabValue} onValueChange={setTabValue} className="w-full">
        <TabsList className="w-full p-0 justify-start border-b rounded-none">
          {tabs.map((tab) => (
            <CustomTabsTrigger
              key={tab.value}
              value={tab.value}
              className="bg-background h-full"
            >
              <p className="text-[15px]">{tab.name}</p>
            </CustomTabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={tabValue}>
          {loading ? (
            <p>Đang tải dữ liệu...</p>
          ) : (
            <PromotionsTable promotions={promotions} />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
