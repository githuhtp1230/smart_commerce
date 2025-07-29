"use client";

import AttributesTable from "@/components/admin/attribute/AttributesTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchAttributes } from "@/services/attributes.service";
import type { IAttribute } from "@/type/attribute";
import { useEffect, useState } from "react";

const tabs = [
  { name: "Thuộc tính đang hoạt động", value: "false" },
  { name: "Thuộc tính đã xoá", value: "true" },
];

export default function ManageAttributePage() {
  const [attributes, setAttributes] = useState<IAttribute[]>([]);
  const [tabValue, setTabValue] = useState("false");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const isDeleted = tabValue === "true";
        const data = await fetchAttributes({ isDeleted });
        setAttributes(data);
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
          <AttributesTable attributes={attributes} />
        </TabsContent>
      ))}
    </Tabs>
  );
}
