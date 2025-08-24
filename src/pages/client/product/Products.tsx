import GeneralProducts from "@/components/client/product/ProductSummaries";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const Products = () => {
  const [searchParams] = useSearchParams();
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    const query = searchParams.get("query") || "";
    setKeyword(query);
  }, [searchParams]);

  return (
    <div className="flex">
      <div className="flex-1">Side bar products</div>
      <div className="flex-3">
        <GeneralProducts keyword={keyword} />
      </div>
    </div>
  );
};

export default Products;
