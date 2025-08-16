// src/services/order.service.ts
import httpRequest from "@/utils/http-request";

export interface OrderItem {
  id: string;
  date: string;
  total: string;
  status: string;
  deliveryMethod: string;
}

export const fetchOrdersByUser = async (
  userId: number
): Promise<OrderItem[]> => {
  try {
    const res = await httpRequest.get(`/orders?userId=${userId}`);
    // đảm bảo luôn trả về mảng
    return Array.isArray(res.data?.data) ? res.data.data : [];
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    return [];
  }
};
