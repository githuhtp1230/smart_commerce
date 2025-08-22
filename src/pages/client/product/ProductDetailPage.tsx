import ProductDetailInformation from "@/components/client/product-detail/ProductDetailInformation";
import ProductDetailTabs from "@/components/client/product-detail/ProductDetailTabs";
import { fetchProductDetail } from "@/services/products.service";
import type { IProductDetail } from "@/type/products";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const numericProductId = Number(productId);
  const [productDetail, setProductDetail] = useState<IProductDetail>();

  const { data, isSuccess } = useQuery({
    queryKey: ["productSummaries", numericProductId],
    queryFn: () => fetchProductDetail(numericProductId),
  });

  useEffect(() => {
    if (data) {
      setProductDetail(data);
    }
  }, [data, isSuccess]);

  return (
    <div className="space-y-2">
      <ProductDetailInformation productDetail={productDetail} />

      <ProductDetailTabs productDetail={productDetail} />
    </div>
  );
};

export default ProductDetailPage;
