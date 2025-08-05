"use client";

import CategoriesTable from "@/components/admin/category/CategoriesTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchSubCategories } from "@/services/categories.service";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import AddSubCategory from "./AddSubCategories";

const tabs = [
  { name: "Danh mục con đang hoạt động", value: "false" },
  { name: "Danh mục con đã xoá", value: "true" },
];

export default function SubCategory() {
  const [tabValue, setTabValue] = useState("false");

  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["categories", { deleted: tabValue === "true" }],
    queryFn: () => fetchSubCategories(tabValue === "true"),
  });

  return (
    <div>
      <div className="ml-70">
        <AddSubCategory />
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
            {isLoading ? (
              <p>Đang tải...</p>
            ) : (
              <CategoriesTable
                categories={categories}
                onSwitchTab={() => setTabValue("true")}
              />
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
