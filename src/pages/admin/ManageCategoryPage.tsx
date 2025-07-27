"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import AddCategoriesParent from "@/components/admin/category/AddCategoriesParent";
import CategoriesTable from "@/components/admin/category/CategoriesTable";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchCategories } from "@/services/categories.service";
import type { ICategory } from "@/type/category";

const tabs = [
  { name: "Danh mục đang hoạt động", value: "false" },
  { name: "Danh mục đã xoá", value: "true" },
];

export default function ManageCategoryPage() {
  const [tabValue, setTabValue] = useState("false");

  const isDeleted = tabValue === "true";
  const { data: categories = [], isLoading } = useQuery<ICategory[]>({
    queryKey: ["categories", tabValue],
    queryFn: () => fetchCategories({ isDeleted }),
  });

  return (
    <div>
      <div className="mb-4">
        <AddCategoriesParent />
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
              className="bg-background h-full"
            >
              <p className="text-[15px]">{tab.name}</p>
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            {isLoading ? (
              <div className="text-gray-500 px-4 py-6">
                Đang tải danh mục...
              </div>
            ) : (
              <CategoriesTable
                categories={categories}
                onSwitchTab={
                  tab.value === "false" ? () => setTabValue("true") : undefined
                }
              />
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
