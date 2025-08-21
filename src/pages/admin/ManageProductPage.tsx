import React, { useEffect, useState } from "react";
import type { IProductSummary } from "@/type/products";
import { fetchAllProductSummaries } from "@/services/products.service";
import ProductTable from "@/components/client/product/ProductTable";


const ManageProductPage = () => {
  const [products, setProducts] = useState<IProductSummary[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const queryParams = new URLSearchParams();
        queryParams.set("page", "1");
        queryParams.set("limit", "1000");
        queryParams.set("all", "true");

        const res = await fetchAllProductSummaries(queryParams);
        setProducts(res.data);
      } catch (error) {
        console.error("Lỗi khi lấy sản phẩm:", error);
      }
    };

    fetchData();
  }, []);


  return (
    <div>
      <ProductTable
        products={products}
        onChange={async () => {
          // Khi toggle trạng thái, fetch lại tất cả sản phẩm
          const queryParams = new URLSearchParams();
          queryParams.set("page", "1");
          queryParams.set("limit", "1000");
          queryParams.set("all", "true");

          const res = await fetchAllProductSummaries(queryParams);
          setProducts(res.data);
        }}
      />
    </div>

  );
};

export default ManageProductPage;
