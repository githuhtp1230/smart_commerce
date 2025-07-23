"use client";

import CategoriesTable from "@/components/admin/category/CategoriesTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchSubCategories } from "@/services/subcategories.service";
import type { ICategory } from "@/type/category";
import { useEffect, useState } from "react";

const tabs = [
  { name: "Danh mục con đang hoạt động", value: "false" },
  { name: "Danh mục con đã xoá", value: "true" },
];

export default function SubCategory() {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [tabValue, setTabValue] = useState("false");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const isChildren = tabValue === "true"; // chuyển về boolean
        const data = await fetchSubCategories(isChildren);
        setCategories(data);
      } catch (error) {
        console.error("Lỗi khi lấy danh mục con:", error);
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
          <CategoriesTable categories={categories} />
        </TabsContent>
      ))}
    </Tabs>
  );
}
