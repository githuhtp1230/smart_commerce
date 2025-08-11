export interface IOrder {
  id: number;
  userId: number;
  voucherId?: number;
  paymentId: number;
  address?: string;
  total: number;
  status: "CONFIRMED" | "CANCELLED" | "SHIPPING" | "SHIPPED";
  createdAt: string;
}