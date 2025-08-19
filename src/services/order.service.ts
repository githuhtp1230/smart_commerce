import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import httpRequest from "@/utils/http-request";

/** Generic paging response */
export interface PageResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

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

/** Simple order item (for lists) */
export interface IOrderItem {
  id: number;
  date: string;
  total: number;
  status: string;
  deliveryMethod: string;
  products: string; // danh sách tên sản phẩm nối lại
}

/**
 * Lấy danh sách đơn hàng của user hiện tại
 * @param status lọc theo trạng thái
 * @param page trang hiện tại
 * @param limit số lượng item/trang
 */
export const fetchOrdersByUser = async (
  page = 1,
  limit = 10,
  status?: string
): Promise<PageResponse<IOrderItem>> => {
  try {
    const res = await httpRequest.get("/me/orders", {
      params: { page, limit, status },
    });

    const data = res.data?.data;

    const orders: IOrderItem[] = ((data?.data as IOrderSummary[]) || []).map(
      (o) => {
        const products =
          o.orderDetails
            ?.map((d) => `${d.product?.name} (x${d.quantity})`)
            .join(", ") ?? "";

        return {
          id: o.id,
          date: o.createdAt,
          total: o.total, // Giữ nguyên number
          status: o.status,
          deliveryMethod: o.payment?.value ?? "",
          products,
        };
      }
    );

    return {
      content: orders,
      page: data?.currentPage ?? 1,
      size: data?.limit ?? limit,
      totalElements: data?.totalElements ?? 0,
      totalPages: data?.totalPages ?? 1,
    };
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    return {
      content: [],
      page: 1,
      size: limit,
      totalElements: 0,
      totalPages: 1,
    };
  }
};

/**
 * API: Lấy chi tiết đơn hàng theo orderId
 */
export interface OrderDetailResponse {
  id: number;
  orderId: number;
  product: { id: number; name: string; price: number };
  quantity: number;
  price: number;
  productVariantId?: number;
}

export const fetchOrderDetails = async (
  orderId: number
): Promise<OrderDetailResponse[]> => {
  const res = await httpRequest.get(`/order-details/${orderId}`);
  return res.data?.data || [];
};

/** Request khi thêm chi tiết đơn hàng */
export interface AddOrderDetailRequest {
  orderId: number;
  productId: number;
  quantity: number;
  price: number;
  productVariantId?: number;
}

/**
 * API: Thêm chi tiết đơn hàng
 */
export const addOrderDetail = async (
  request: AddOrderDetailRequest
): Promise<OrderDetailResponse> => {
  const res = await httpRequest.post("/order-details", request);
  return res.data?.data;
};

/**
 * Hook: lấy danh sách chi tiết đơn hàng
 */
export const useOrderDetails = (orderId: number) =>
  useQuery({
    queryKey: ["order-details", orderId],
    queryFn: () => fetchOrderDetails(orderId),
    enabled: !!orderId,
  });

/**
 * Hook: thêm chi tiết đơn hàng
 */
export const useAddOrderDetail = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addOrderDetail,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["order-details", data.orderId],
      });
    },
  });
};
