import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import httpRequest from "@/utils/http-request";

// JSON từ backend
interface OrderResponse {
  id: number;
  createdAt: string;
  total: number;
  status: string;
  payment?: {
    value: string;
  };
  orderDetails?: {
    product: {
      id: number;
      name: string;
      price: number;
    };
    quantity: number;
    price?: number;
  }[];
}

// Dùng cho FE hiển thị danh sách
export interface OrderItem {
  id: number;
  date: string;
  total: number;
  status: string;
  deliveryMethod: string;
  products: string; // danh sách tên sp nối lại
}

// Dùng cho chi tiết đơn hàng
export interface OrderDetailResponse {
  id: number;
  orderId: number;
  product: {
    id: number;
    name: string;
    price: number;
  };
  quantity: number;
  price: number;
  productVariantId?: number;
}

// Request khi thêm chi tiết đơn hàng
export interface AddOrderDetailRequest {
  orderId: number;
  productId: number;
  quantity: number;
  price: number;
  productVariantId?: number;
}

export interface PageResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

/**
 * API: Lấy danh sách đơn hàng theo user
 */
export const fetchOrdersByUser = async (
  page: number = 1,
  limit: number = 10,
  status?: string
): Promise<PageResponse<OrderItem>> => {
  try {
    const res = await httpRequest.get("/me/orders", {
      params: { page, limit, status },
    });

    const data = res.data?.data;

    const orders: OrderItem[] = ((data?.data as OrderResponse[]) || []).map(
      (o) => {
        // Lấy tên sản phẩm từ orderDetails
        const products =
          o.orderDetails
            ?.map((d) => `${d.product?.name} (x${d.quantity})`)
            .join(", ") ?? "";

        return {
          id: o.id,
          date: o.createdAt,
          total: o.total,
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
      totalPages: data?.totalPages ?? 0,
    };
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    return {
      content: [],
      page: 1,
      size: limit,
      totalElements: 0,
      totalPages: 0,
    };
  }
};

/**
 * API: Lấy chi tiết đơn hàng theo orderId
 */
export const fetchOrderDetails = async (
  orderId: number
): Promise<OrderDetailResponse[]> => {
  const res = await httpRequest.get(`/order-details/${orderId}`);
  return res.data?.data || [];
};

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
export const useOrderDetails = (orderId: number) => {
  return useQuery({
    queryKey: ["order-details", orderId],
    queryFn: () => fetchOrderDetails(orderId),
    enabled: !!orderId,
  });
};

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
