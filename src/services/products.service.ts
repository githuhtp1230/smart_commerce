import type { PaginationResponse } from "@/type/common";
import type { IProductDetail, IProductSummary } from "@/type/products";
import httpRequest from "@/utils/http-request";

type PaginationProductSummaries = PaginationResponse<IProductSummary>;

export const fetchProductSummaries = async (
  queryParams: URLSearchParams
): Promise<PaginationProductSummaries> => {
  const res = await httpRequest.get(
    `products/summaries?${queryParams.toString()}`
  );
  const data = res.data.data as PaginationProductSummaries;
  return data;
};

export const fetchProductDetail = async (
  productId: number
): Promise<IProductDetail> => {
  const res = await httpRequest.get(`products/summaries/${productId}`);
  const data = res.data.data as IProductDetail;
  return data;
};

export const fetchDeletedProductSummaries = async (
  page = 1,
  limit = 15
): Promise<PaginationProductSummaries> => {
  const queryParams = new URLSearchParams();
  queryParams.set("page", page.toString());
  queryParams.set("limit", limit.toString());

  const res = await httpRequest.get(
    `products/deleted-summaries?${queryParams.toString()}`
  );
  const data = res.data.data as PaginationProductSummaries;
  return data;
};

export const deleteProduct = async (productId: number): Promise<void> => {
  await httpRequest.delete(`products/${productId}/delete`);
};
