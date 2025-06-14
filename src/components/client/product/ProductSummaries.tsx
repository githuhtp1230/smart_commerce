import { useQuery } from "@tanstack/react-query";
import { fetchProductSummaries } from "@/services/products.service";
import ProductSummaryItem from "./ProductSummaryItem";
import { use, useEffect } from "react";
import useProductSummariesStore from "@/store/product-summaries-store";
import { useLocation, useSearchParams } from "react-router-dom";
import { queryFilter } from "@/helper/query-filter";

const ProductSummaries = () => {
  const { productSummaries, setProductSummaries } = useProductSummariesStore();
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const queryParams = queryFilter(searchParams, "categoryId");

  const { data } = useQuery({
    queryKey: ["productSummaries", queryParams.toString()],
    queryFn: () => fetchProductSummaries(queryParams),
  });

  useEffect(() => {
    if (data) {
      setProductSummaries(data.data);
    }
  }, [data]);

  return (
    <div className="grid grid-cols-3 gap-x-4 gap-y-4">
      {productSummaries.map((productSummary) => (
        <ProductSummaryItem product={productSummary} key={productSummary.id} />
      ))}
    </div>
  );
};

export default ProductSummaries;
