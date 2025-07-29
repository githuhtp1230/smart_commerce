"use client";

import AttributeValuesTable from "@/components/admin/attribute-value/AttributeValuesTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchAttributevalues } from "@/services/attributes.service";
import type { IAttributeValue } from "@/type/attribute";
import { useEffect, useState } from "react";

const tabs = [
  { name: "AttributeValue đang hoạt động", value: "false" },
  { name: "AttributeValue đã xoá", value: "true" },
];

export default function ManageAttributePage() {
  const [attributevalues, setAttributevalues] = useState<IAttributeValue[]>([]);
  const [tabValue, setTabValue] = useState("false");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const isDeleted = tabValue === "true";
        const data = await fetchAttributevalues({ isDeleted });
        setAttributevalues(data);
      } catch (error) {
        console.error("Lỗi khi lấy attributevalue:", error);
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
          <AttributeValuesTable attributevalues={attributevalues} />
        </TabsContent>
      ))}
    </Tabs>
  );
}
