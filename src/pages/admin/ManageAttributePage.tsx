"use client";

import AddAttributes from "@/components/admin/attribute/AddAttributes";
import AttributesTable from "@/components/admin/attribute/AttributesTable";
import CustomTabsTrigger from "@/components/common/tabs/CustomTabsTrigger";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import { fetchAttributes } from "@/services/attributes.service";
import type { IAttribute } from "@/type/attribute";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function ManageAttributePage() {
  const [tabValue, setTabValue] = useState("false");
  const { t } = useTranslation();
  const isDeleted = tabValue === "true";
  const tabs = [
    { name: t("active_attribute"), value: "false" },
    { name: t("inactive_attribute"), value: "true" },
  ];
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
          <TabsContent key={tab.value} value={tab.value} className="mt-4">
            {isLoading ? (
              <div className="flex justify-center items-center h-96">
                <img
                  src="/images/loader.gif"
                  alt="Loading..."
                  className="w-30 h-30"
                />
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
