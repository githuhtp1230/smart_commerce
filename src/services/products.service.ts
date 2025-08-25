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

export const fetchNewProductSummaries = async (
  queryParams: URLSearchParams,
  limit = 7
): Promise<PaginationProductSummaries> => {
  queryParams.set("limit", limit.toString());

  const res = await httpRequest.get(
    `products/summaries?${queryParams.toString()}`
  );

  const data = res.data.data as PaginationProductSummaries;
  return data;
};

export const fetchProductSummariesByName = async (
  name: string,
  page = 1,
  limit = 15
): Promise<PaginationProductSummaries> => {
  const queryParams = new URLSearchParams();
  queryParams.set("limit", limit.toString());
  queryParams.set("page", page.toString());
  queryParams.set("query", name);

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

export const fetchProductSummariesByStatus = async (
  isDeleted: boolean,
  page = 1,
  limit = 15
): Promise<PaginationProductSummaries> => {
  const queryParams = new URLSearchParams();
  queryParams.set("page", page.toString());
  queryParams.set("limit", limit.toString());
  queryParams.set("deleted", isDeleted.toString()); // true hoặc false

  const res = await httpRequest.get(
    `products/status-summaries?${queryParams.toString()}`
  );
  const data = res.data.data as PaginationProductSummaries;
  return data;
};
export const deleteProduct = async (productId: number): Promise<void> => {
  await httpRequest.delete(`products/${productId}/delete`);
};

export const createProduct = async (productData: {
  categoryId: number;
  title: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
}) => {
  const res = await httpRequest.post("/products", productData);
  return res.data.data;
};

export const fetchRandomProducts = async (): Promise<IProductSummary[]> => {
  const res = await httpRequest.get("products/random");
  const data = res.data.data as IProductSummary[];
  return data;
};

export const fetchRandomHotProducts = async (): Promise<IProductSummary[]> => {
  const res = await httpRequest.get("products/random-hot");
  const data = res.data.data as IProductSummary[];
  return data;
};
