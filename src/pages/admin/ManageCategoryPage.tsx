"use client";

import AddCategories from "@/components/admin/category/AddCategories";
import CategoriesTable from "@/components/admin/category/CategoriesTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
        const isDeleted = tabValue === "true"; // chuyển về boolean
        const data = await fetchCategories(isDeleted);
        setCategories(data);
      } catch (error) {
        console.error("Lỗi khi lấy danh mục:", error);
      }
    };

    fetchData();
  }, [tabValue]);

  return (
    <div className="flex flex-col gap-4 ">
      <div className="ml-10">
        <AddCategories />
      </div>
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
    </div>
  );
}
