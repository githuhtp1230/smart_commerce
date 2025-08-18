import httpRequest from "@/utils/http-request";

export interface PageResponse<T> {
  currentPage: number;
  totalPages: number;
  limit: number;
  totalElements: number;
  isLast: boolean;
  data: T[];
}

export interface IVoucher {
  id: number;
  code: string;
  discountAmount: number;  
}

export interface IPayment {
  id: number;
  value: string; 
  name: string;  
  code: string;  
}

export interface IOrderSummary {
  id: number;
  orderDetails: IOrderDetail[];
  voucher?: IVoucher;
  payment?: IPayment;
  total: number;
  status: string;
  createdAt: string;
  productImage: string;
  address: string; 
}

export interface IOrderDetail {
  id: number;
  product: { id: number; name: string }; 
  productVariation?: { id: number; name: string; image?: string };
  image?: string;
  quantity: number;
  price: number;
}

export const getMyOrders = async (
  status?: string,
  page = 1,
  limit = 5
): Promise<PageResponse<IOrderSummary>> => {
  const res = await httpRequest.get("/me/orders", {
    params: { status, page, limit },
  });
  return res.data.data;
};
