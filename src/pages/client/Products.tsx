import GeneralProducts from "@/components/client/product/ProductSummaries";
import React from "react";
import { ProductFilters } from "./ProductFilterSidebar";

const Products = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar bộ lọc (chiếm 1/4 trên màn hình lớn) */}
        <aside className="lg:col-span-1 space-y-4">
          <ProductFilters />
        </aside>

        {/* Khu vực sản phẩm (chiếm 3/4) */}
        <main className="lg:col-span-3 space-y-4">
          <GeneralProducts />
        </main>
      </div>
    </div>
  );
};

export default Products;
