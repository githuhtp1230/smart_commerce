"use client";

import AddAttributes from "@/components/admin/attribute/AddAttributes";
import AttributesTable from "@/components/admin/attribute/AttributesTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchAttributes } from "@/services/attributes.service";
import type { IAttribute } from "@/type/attribute";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const tabs = [
  { name: "Thuộc tính đang hoạt động", value: "false" },
  { name: "Thuộc tính đã xoá", value: "true" },
];

export default function ManageAttributePage() {
  const [tabValue, setTabValue] = useState("false");

  const isDeleted = tabValue === "true";
  const {
    data: attribute = [],
    isLoading,
    refetch,
  } = useQuery<IAttribute[]>({
    queryKey: ["attributes", tabValue],
    queryFn: () => fetchAttributes({ isDeleted }),
  });

  return (
    <div>
      <div className="mb-4">
        <AddAttributes onSuccess={refetch} currentTab={tabValue} />
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
                Đang tải thuộc tính...
              </div>
            ) : (
              <AttributesTable
                attributes={attribute}
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
