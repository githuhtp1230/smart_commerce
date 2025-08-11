import httpRequest from "@/utils/http-request";
import type { IOrder } from "@/type/order";

export interface OrdersByStatusResponse {
  confirmed: IOrder[];
  cancelled: IOrder[];
  shipping: IOrder[];
  shipped: IOrder[];
}

export const getMyOrdersByStatus = async (): Promise<OrdersByStatusResponse> => {
  const res = await httpRequest.get("/orders/orders-by-status");
  return res.data.data;
};
