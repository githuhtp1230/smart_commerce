"use client";

import CategoriesTable from "@/components/admin/category/CategoriesTable";
import CustomTabsTrigger from "@/components/common/tabs/CustomTabsTrigger";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import { fetchCategories } from "@/services/categories.service";
import type { ICategory } from "@/type/category";
import { useEffect, useState } from "react";

const tabs = [
  { name: "Danh mục đang hoạt động", value: "false" },
  { name: "Danh mục đã xoá", value: "true" },
];

export default function TabsUnderlinedDemo() {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [tabValue, setTabValue] = useState("false");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const isDeleted = tabValue === "true";
        const data = await fetchCategories({ isDeleted });
        setCategories(data);
      } catch (error) {
        console.error("Lỗi khi lấy danh mục:", error);
      }
    };

    fetchData();
  }, [tabValue]);

  return (
    <Tabs
      defaultValue="false"
      value={tabValue}
      onValueChange={setTabValue}
      className="w-full px-4 gap-0"
    >
      <TabsList className="p-0 justify-start">
        {tabs.map((tab) => (
          <CustomTabsTrigger
            key={tab.value}
            value={tab.value}

          >
            <p className="text-[15px]">{tab.name}</p>
          </CustomTabsTrigger>
        ))}
      </TabsList>
      <div className="border border-b-border-primary mt-[3px] !h-[1px]"></div>

      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value} className="mt-4">
          <CategoriesTable categories={categories} />
        </TabsContent>
      ))}
    </Tabs>
  );
}
