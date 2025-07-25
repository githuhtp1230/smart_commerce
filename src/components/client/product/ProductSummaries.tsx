import { useQuery } from "@tanstack/react-query";
import { fetchProductSummaries } from "@/services/products.service";
import ProductSummaryItem from "./ProductSummaryItem";
import { useEffect, useState } from "react";
import useProductSummariesStore from "@/store/product-summaries-store";
import { useLocation, useSearchParams } from "react-router-dom";
import { queryFilter } from "@/helper/query-filter";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

const ProductSummaries = () => {
  const { productSummaries, setProductSummaries } = useProductSummariesStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);

  // Add page parameter to queryParams
  const queryParams = queryFilter(searchParams, "categoryId");
  queryParams.set("page", currentPage.toString());

  const { data, isSuccess } = useQuery({
    queryKey: ["productSummaries", queryParams.toString()],
    queryFn: () => fetchProductSummaries(queryParams),
  });

  useEffect(() => {
    if (data) {
      setProductSummaries(data.data);
    }
  }, [data, isSuccess]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setSearchParams({
      ...Object.fromEntries(searchParams),
      page: page.toString(),
    });
  };

  const totalPages = data?.totalPages || 1;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-x-4 gap-y-4">
        {productSummaries.map((productSummary) => (
          <ProductSummaryItem
            product={productSummary}
            key={productSummary.id}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                className={
                  currentPage === 1 ? "pointer-events-none opacity-50 " : ""
                }
              />
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  onClick={() => handlePageChange(page)}
                  isActive={currentPage === page}
                  className={cn(
                    currentPage == page && "bg-blue-500 text-white"
                  )}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  handlePageChange(Math.min(totalPages, currentPage + 1))
                }
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default ProductSummaries;
