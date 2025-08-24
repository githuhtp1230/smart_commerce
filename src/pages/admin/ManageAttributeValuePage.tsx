"use client";

import AddAttributeValues from "@/components/admin/attribute-value/AddAttributeValues";
import AttributeValuesTable from "@/components/admin/attribute-value/AttributeValuesTable";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import { fetchAttributeValues } from "@/services/attributes.service";
import type { IAttributeValue } from "@/type/attribute";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import CustomTabsTrigger from "@/components/common/tabs/CustomTabsTrigger";
import { useTranslation } from "react-i18next";



export default function ManageAttributePage() {
  const [tabValue, setTabValue] = useState("false");
  const isDeleted = tabValue === "true";
  const { t } = useTranslation();

  const tabs = [
    { name: t("active_attributevalue"), value: "false" },
    { name: t("inactive_attributevalue"), value: "true" },
  ];
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
        className="w-full px-4 gap-0"
      >
        <TabsList className="p-0 justify-start">
          {tabs.map((tab) => (
            <CustomTabsTrigger
              key={tab.value}
              value={tab.value}
              className="bg-background h-full"
            >
              <p className="text-[15px]">{tab.name}</p>
            </CustomTabsTrigger>
          ))}
        </TabsList>
        <div className="border border-b-border-primary mt-[3px] !h-[1px]"></div>

        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value} className="mt-4" >
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
