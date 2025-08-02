"use client";

import AddAttributeValues from "@/components/admin/attribute-value/AddAttributeValues";
import AttributeValuesTable from "@/components/admin/attribute-value/AttributeValuesTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchAttributeValues } from "@/services/attributes.service";
import type { IAttributeValue } from "@/type/attribute";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

const tabs = [
  { name: "AttributeValue đang hoạt động", value: "false" },
  { name: "AttributeValue đã xoá", value: "true" },
];

export default function ManageAttributePage() {
  const [tabValue, setTabValue] = useState("false");
  const isDeleted = tabValue === "true";

  const {
    data: attributeValues = [],
    isLoading,
    refetch,
  } = useQuery<IAttributeValue[]>({
    queryKey: ["attributeValues", tabValue],
    queryFn: () => fetchAttributeValues({ isDeleted }),
  });

  return (
    <div>
      <div className="mb-4">
        <AddAttributeValues onSuccess={refetch} currentTab={tabValue} />
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
                Loading attributes...
              </div>
            ) : (
              <AttributeValuesTable
                attributevalues={attributeValues}
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
