import React, { useEffect, useState } from "react";
import type { IProductSummary } from "@/type/products";
import { fetchProductSummariesByStatus } from "@/services/products.service";
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
        <ProductTable
          products={activeProducts}
          onDeleted={async () => {
            const res = await fetchProductSummariesByStatus(false, 1, 1000);
            setActiveProducts(res.data);
          }}
        />
      </TabsContent>

      <TabsContent value="true">
        <ProductTable products={deletedProducts} readOnly />
      </TabsContent>
    </Tabs>
  );
};

export default ManageProductPage;
