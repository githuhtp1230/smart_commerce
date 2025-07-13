import type { IPayment } from "@/type/payment";
import httpRequest from "@/utils/http-request";

export const fetchPayments = async (): Promise<IPayment[]> => {
  const res = await httpRequest.get("payments");
  return res.data.data;
};
