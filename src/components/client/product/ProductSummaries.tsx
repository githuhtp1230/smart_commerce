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
  PaginationEllipsis,
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

  const visiblePages = 5;
  let startPage = Math.max(currentPage - Math.floor(visiblePages / 2), 1);
  let endPage = startPage + visiblePages - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(endPage - visiblePages + 1, 1);
  }

  const pages: number[] = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  const showLeftEllipsis = startPage > 1;
  const showRightEllipsis = endPage < totalPages;

  const handleEllipsisLeft = () => {
    const newPage = Math.max(1, currentPage - visiblePages);
    handlePageChange(newPage);
  };

  const handleEllipsisRight = () => {
    const newPage = Math.min(totalPages, currentPage + visiblePages);
    handlePageChange(newPage);
  };

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
        <Pagination className="cursor-pointer">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                className={cn(
                  currentPage === 1 && "pointer-events-none opacity-50 "
                )}
              />
            </PaginationItem>

            {showLeftEllipsis && (
              <PaginationItem>
                <PaginationEllipsis onClick={handleEllipsisLeft} />
              </PaginationItem>
            )}

            {pages.map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  onClick={() => handlePageChange(page)}
                  isActive={page === currentPage}
                  className={cn(
                    page === currentPage && "bg-blue-500 text-white"
                  )}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}

            {showRightEllipsis && (
              <PaginationItem>
                <PaginationEllipsis onClick={handleEllipsisRight} />
              </PaginationItem>
            )}

            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  handlePageChange(Math.min(totalPages, currentPage + 1))
                }
                className={cn(
                  currentPage === totalPages && "pointer-events-none opacity-50"
                )}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default ProductSummaries;
