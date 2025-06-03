import GeneralProducts from "@/components/client/product/GeneralProducts";
import React from "react";

const Products = () => {
  return (
    <div className="flex">
      <div className="flex-1">Side bar products</div>
      <div className="flex-3">
        <GeneralProducts />
      </div>
    </div>
  );
};

export default Products;
