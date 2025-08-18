
import type { IVoucher } from "@/services/order.service";
import type { IPayment } from "./payment";

export interface IOrderSummary {
  id: number;
  productName: string;
  voucher?: IVoucher | null;
  payment?: IPayment | null;
  total: number;
  status: "CONFIRMED" | "CANCELLED" | "SHIPPING" | "DELIVERED";
  createdAt: string;
  productImage: string;
}
