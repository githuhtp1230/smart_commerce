import React, { useEffect, useState } from "react";
import type { IProductSummary } from "@/type/products";
import {fetchDeletedProductSummaries, fetchProductSummaries } from "@/services/products.service";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductTable from "@/components/client/product/ProductTable";

const tabs = [
  { name: "Danh mục đang hoạt động", value: "false" },
  { name: "Danh mục đã xoá", value: "true" },
];

const ManageProductPage = () => {
  const [activeProducts, setActiveProducts] = useState<IProductSummary[]>([]);
  const [deletedProducts, setDeletedProducts] = useState<IProductSummary[]>([]);
  const [tabValue, setTabValue] = useState("false");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (tabValue === "true") {
          // Tab sản phẩm đã xóa
          const data = await fetchDeletedProductSummaries(1, 1000);
          setDeletedProducts(data.data);
        } else {
          // Tab sản phẩm đang hoạt động
          const queryParams = new URLSearchParams();
          queryParams.set("page", "1");
          queryParams.set("limit", "1000");

          const data = await fetchProductSummaries(queryParams);
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

      <TabsContent value="false">
        <ProductTable products={activeProducts} />
      </TabsContent>

      <TabsContent value="true">
        <ProductTable products={deletedProducts} readOnly  />
      </TabsContent>
    </Tabs>
  );
};

export default ManageProductPage;
