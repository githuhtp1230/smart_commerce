import React, { useEffect, useState } from "react";
import type { IProductSummary } from "@/type/products";
import { fetchProductSummariesByStatus } from "@/services/products.service";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import ProductTable from "@/components/client/product/ProductTable";
import CustomTabsTrigger from "@/components/common/tabs/CustomTabsTrigger";



const ManageProductPage = () => {
  const [activeProducts, setActiveProducts] = useState<IProductSummary[]>([]);
  const [deletedProducts, setDeletedProducts] = useState<IProductSummary[]>([]);
  const [tabValue, setTabValue] = useState("false");
  const tabs = [
    { name: "Sản phẩm đang hoạt động", value: "false" },
    { name: "Sản phẩm đã xoá", value: "true" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const isDeleted = tabValue === "true";
        const data = await fetchProductSummariesByStatus(isDeleted, 1, 1000);
        if (isDeleted) {
          setDeletedProducts(data.data);
        } else {
          setActiveProducts(data.data);
        }
      } catch (error) {
        console.error("Lỗi khi lấy sản phẩm:", error);
      }
    };

    fetchData();
  }, [tabValue]);

  return (
    <Tabs
      defaultValue="false"
      value={tabValue}
      onValueChange={setTabValue}
      className="w-full gap-0 px-4"
    >
      <TabsList className="p-0 justify-start">
        {tabs.map((tab) => (
          <CustomTabsTrigger key={tab.value} value={tab.value}>
            <p className="text-[15px]">{tab.name}</p>
          </CustomTabsTrigger>
        ))}
      </TabsList>
      <div className="border border-b-border-primary mt-[3px] !h-[1px]"></div>

      <TabsContent value="false" className="mt-4">
        <ProductTable
          products={activeProducts}
          onDeleted={async () => {
            const res = await fetchProductSummariesByStatus(false, 1, 1000);
            setActiveProducts(res.data);
          }}
        />
      </TabsContent>

      <TabsContent value="true" className="mt-4">
        <ProductTable products={deletedProducts} readOnly />
      </TabsContent>
    </Tabs>
  );
};

export default ManageProductPage;
