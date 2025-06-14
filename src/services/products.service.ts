import type { PaginationResponse } from "@/type/common";
import type { IProductSummary } from "@/type/products";
import httpRequest from "@/utils/http-request";

type PaginationProductSummaries = PaginationResponse<IProductSummary>;

export const fetchProductSummaries = async (
  queryParams: URLSearchParams
): Promise<PaginationProductSummaries> => {
  try {
    const res = await httpRequest.get(`products?${queryParams.toString()}`);
    const data = res.data.data as PaginationProductSummaries;
    return data;
  } catch (error) {
    throw new Error("Error fetching products");
  }
};
