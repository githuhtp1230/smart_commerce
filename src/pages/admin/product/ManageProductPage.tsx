import React, { useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchProductSummaries } from "@/services/products.service";
import ProductTable from "@/components/client/product/ProductTable";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

const ManageProductPage = () => {
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);

  const queryParams = useMemo(
    () => new URLSearchParams({ page: currentPage.toString() }),
    [currentPage]
  );

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["allProducts", currentPage],
    queryFn: () => fetchProductSummaries(queryParams),
    staleTime: 5000,
  });

  const products = data?.data ?? [];
  const totalPages = data?.totalPages ?? 1;

  const handlePageChange = (page: number) => setCurrentPage(page);

  const visiblePages = 5;
  let startPage = Math.max(currentPage - Math.floor(visiblePages / 2), 1);
  let endPage = startPage + visiblePages - 1;
  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(endPage - visiblePages + 1, 1);
  }
  const pages: number[] = [];
  for (let i = startPage; i <= endPage; i++) pages.push(i);

  return (
    <div className="w-full px-4 mt-4 space-y-4">
      <h2 className="text-lg font-bold mb-2">Danh sách sản phẩm</h2>
      <ProductTable
        products={products}
        isLoading={isLoading || isFetching}
        onDeleted={async () =>
          queryClient.invalidateQueries({
            queryKey: ["allProducts", currentPage],
          })
        }
      />

      {!isLoading && totalPages > 1 && (
        <Pagination className="flex justify-center mt-4 cursor-pointer">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                className={cn(
                  currentPage === 1 && "pointer-events-none opacity-50"
                )}
              />
            </PaginationItem>

            {startPage > 1 && (
              <PaginationItem>
                <PaginationLink onClick={() => handlePageChange(startPage - 1)}>
                  ...
                </PaginationLink>
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

            {endPage < totalPages && (
              <PaginationItem>
                <PaginationLink onClick={() => handlePageChange(endPage + 1)}>
                  ...
                </PaginationLink>
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

export default ManageProductPage;
