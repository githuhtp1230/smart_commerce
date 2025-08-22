
import httpRequest from "@/utils/http-request";

/** User */
export interface IUser {
  id: number;
  name: string;
  phone: string;
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
  product: { id?: number; name: string };
  image?: string;
  quantity: number;
  price?: number;
}

/** Order summary (chi tiết) */

export interface IOrderSummary {
  id: number;
  orderDetails: IOrderDetail[];
  userId: IUser;
  voucher?: IVoucher;
  payment?: IPayment;
  total: number;
  status: string;
  createdAt: string;
  productImage?: string;
  address?: string;
  receiver?: string;
}

/** Simple order item (FE table) */
export interface OrderItem {
  id: number;
  date: string;
  total: number;
  status: string;
  deliveryMethod: string;
  orderDetails: IOrderDetail[];
}

/** Pagination chung */
export interface PageResponse<T> {
  currentPage: number;
  totalPages: number;
  limit: number;
  totalElements: number;
  isLast: boolean;
  data: T[];
}

/** API trả về thực tế */
interface ApiOrderDetail {
  product: { name: string; image?: string };
  quantity: number;
}

interface ApiOrder {
  id: number;
  createdAt: string;
  total: number;
  status: string;
  payment?: { value: string };
  orderDetails?: ApiOrderDetail[];
}

interface ApiResponseData {
  currentPage: number;
  totalPages: number;
  limit: number;
  totalElements: number;
  isLast: boolean;
  data: ApiOrder[];
}

/** Lấy đơn hàng của chính user */

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

/** Lấy đơn hàng theo userId */
export const fetchOrdersByUser = async (
  userId: number,
  page = 1,
  limit = 15,
  status?: string
): Promise<PageResponse<OrderItem>> => {
  try {
    const res = await httpRequest.get(`/users/${userId}/orders`, {
      params: {
        page: page > 0 ? page - 1 : 0, // FE page bắt đầu từ 1 → BE từ 0
        limit,
        ...(status ? { status } : {}),
      },
    });

    const apiData: ApiResponseData = res.data?.data;

    if (!apiData || !Array.isArray(apiData.data)) {
      return {
        currentPage: page,
        totalPages: 1,
        limit,
        totalElements: 0,
        isLast: true,
        data: [],
      };
    }

    const orders: OrderItem[] = apiData.data.map((o) => {
      const orderDetails: IOrderDetail[] =
        o.orderDetails?.map((d, idx) => ({
          id: idx,
          product: { name: d.product.name },
          image: d.product.image ?? "/default-product.png",
          quantity: d.quantity,
        })) || [];

      return {
        id: o.id,
        date: o.createdAt,
        total: o.total,
        status: o.status,
        deliveryMethod: o.payment?.value ?? "—",
        orderDetails,
      };
    });

    return {
      currentPage: apiData.currentPage ?? 1,
      totalPages: apiData.totalPages ?? 1,
      limit: apiData.limit ?? limit,
      totalElements: apiData.totalElements ?? orders.length,
      isLast: apiData.isLast ?? true,
      data: orders,
    };
  } catch (err) {
    console.error("Failed to fetch orders:", err);
    return {
      currentPage: page,
      totalPages: 1,
      limit,
      totalElements: 0,
      isLast: true,
      data: [],
    };

  }
};
