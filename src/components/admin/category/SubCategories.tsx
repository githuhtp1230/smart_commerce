"use client";

import CategoriesTable from "@/components/admin/category/CategoriesTable";
import CustomTabsTrigger from "@/components/common/tabs/CustomTabsTrigger";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
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
        className="w-full px-4 gap-0"
      >
        <TabsList className="p-0 justify-start">
          {tabs.map((tab) => (
            <CustomTabsTrigger
              key={tab.value}
              value={tab.value}
              className=" bg-background h-full"
            >
              <p className="text-[15px]">{tab.name}</p>
            </CustomTabsTrigger>
          ))}
        </TabsList>
        <div className="border border-b-border-primary mt-[3px] !h-[1px]"></div>

        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value} className="mt-4">
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
