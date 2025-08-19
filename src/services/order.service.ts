// src/services/order.service.ts
import httpRequest from "@/utils/http-request";

/** Generic paging response */
export interface PageResponse<T> {
  currentPage: number;
  totalPages: number;
  limit: number;
  totalElements: number;
  isLast: boolean;
  data: T[];
}

/** Voucher */
export interface IVoucher {
  id: number;
  code: string;
  discountAmount: number;
}

/** Payment method */
export interface IPayment {
  id: number;
  value: string;
  name: string;
  code: string;
}

/** Order detail */
export interface IOrderDetail {
  id: number;
  product: { id: number; name: string };
  productVariation?: { id: number; name: string; image?: string };
  image?: string;
  quantity: number;
  price: number;
}

/** Order summary */
export interface IOrderSummary {
  id: number;
  orderDetails: IOrderDetail[];
  userId: IUser;
  voucher?: IVoucher;
  payment?: IPayment;
  total: number;
  status: string;
  createdAt: string;
  productImage: string;
  address: string;
  receiver: string;
}

export interface IUser {
  id: number;
  name: string;
  phone: string;
}
/** Simple order item (for lists) */
export interface IOrderItem {
  id: string;
  date: string;
  total: string;
  status: string;
}

/**
 * Lấy danh sách đơn hàng của user hiện tại
 * @param status lọc theo trạng thái
 * @param page trang hiện tại
 * @param limit số lượng item/trang
 */
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

/**
 * Lấy danh sách đơn hàng của 1 user theo userId
 * @param userId id user
 */
export const fetchOrdersByUser = async (
  userId: number
): Promise<IOrderItem[]> => {
  try {
    const res = await httpRequest.get(`/users/${userId}/orders`);
    return Array.isArray(res.data?.data) ? res.data.data : [];
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    return [];
  }
};
