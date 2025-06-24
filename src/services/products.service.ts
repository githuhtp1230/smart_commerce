import type { PaginationResponse } from "@/type/common";
import type { IProductDetail, IProductSummary } from "@/type/products";
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
    throw error;
  }
};

export const fetchProductDetail = async (
  productId: number
): Promise<IProductDetail> => {
  try {
    const res = await httpRequest.get(`products/${productId}`);
    const data = res.data.data as IProductDetail;
    return data;
  } catch (error) {
    throw error;
  }
};
