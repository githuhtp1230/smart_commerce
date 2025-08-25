import React, { useMemo, useState } from "react";
import { DataTable } from "@/components/common/table/DataTable";
import type { ColumnDef } from "@tanstack/react-table";
import type { IReview } from "@/type/review";
import { fetchAllReviews } from "@/services/review.service";
import { useQuery } from "@tanstack/react-query";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";




const TableReviews = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const { t } = useTranslation();

    const columns: ColumnDef<IReview>[] = [
        { accessorKey: "id", header: "ID", cell: ({ row }) => row.original.id },
        {
            id: "avatar", // dùng id thay cho accessorKey
            header: "Avatar",
            cell: ({ row }) => (
                <img
                    src={row.original.user?.avatar}
                    alt={row.original.user?.name || "Ẩn danh"}
                    className="w-10 h-10 object-cover rounded-full"
                />
            ),
        },

        {
            accessorKey: "user",
            header: t("Users"),
            cell: ({ row }) => row.original.user?.name || t("Anonymous"),
        },
        {
            accessorKey: "productId",
            header: t("product_id"),
            cell: ({ row }) => row.original.productId,

        },
        {
            accessorKey: "comment",
            header: t("comment"),
            cell: ({ row }) => row.original.comment,
        },
        {
            accessorKey: "rating",
            header: t("ratings"),
            cell: ({ row }) => (
                <span className="text-yellow-400">{row.original.rating}★</span>
            ),
        },
        {
            accessorKey: "createdAt",
            header: t("Created At"),
            cell: ({ row }) =>
                row.original.createdAt
                    ? new Date(row.original.createdAt).toLocaleString()
                    : "",
        },
    ];
    const queryParams = useMemo(
        () => new URLSearchParams({ page: currentPage.toString() }),
        [currentPage]
    );

    const { data, isLoading } = useQuery({
        queryKey: ["reviews", currentPage],
        queryFn: () => fetchAllReviews(queryParams),
        staleTime: 5000,
    });

    const reviews = data?.data ?? [];
    const totalPages = data?.totalPages ?? 1;


    const handlePageChange = (page: number) => setCurrentPage(page);

    // Logic tính toán dải số trang hiển thị
    const visiblePages = 5;
    let startPage = Math.max(currentPage - Math.floor(visiblePages / 2), 1);
    let endPage = startPage + visiblePages - 1;
    if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(endPage - visiblePages + 1, 1);
    }

    const pages: number[] = [];
    for (let i = startPage; i <= endPage; i++) pages.push(i);
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-96">
                <img src="/images/loader.gif" alt="Loading..." className="w-30 h-30" />
            </div>
        );
    }
    return (
        <div className="w-full px-4 mt-4 space-y-4">
            <h2 className="text-lg font-bold mb-2">Danh sách đánh giá</h2>
            <div className="bg-primary rounded-xl p-2">
                <DataTable
                    columns={columns}
                    data={reviews}
                />
            </div>


            {!isLoading && totalPages > 1 && (
                <Pagination className="flex justify-center mt-4 cursor-pointer">
                    <PaginationContent>
                        {/* Previous */}
                        <PaginationItem>
                            <PaginationPrevious
                                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                                className={cn(
                                    currentPage === 1 && "pointer-events-none opacity-50"
                                )}
                            />
                        </PaginationItem>

                        {/* Dấu ... trước */}
                        {startPage > 1 && (
                            <PaginationItem>
                                <PaginationLink onClick={() => handlePageChange(startPage - 1)}>
                                    ...
                                </PaginationLink>
                            </PaginationItem>
                        )}

                        {/* Các số trang */}
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

                        {/* Dấu ... sau */}
                        {endPage < totalPages && (
                            <PaginationItem>
                                <PaginationLink onClick={() => handlePageChange(endPage + 1)}>
                                    ...
                                </PaginationLink>
                            </PaginationItem>
                        )}

                        {/* Next */}
                        <PaginationItem>
                            <PaginationNext
                                onClick={() =>
                                    handlePageChange(Math.min(totalPages, currentPage + 1))
                                }
                                className={cn(
                                    currentPage === totalPages &&
                                    "pointer-events-none opacity-50"
                                )}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            )}
        </div>
    );
};

export default TableReviews;
