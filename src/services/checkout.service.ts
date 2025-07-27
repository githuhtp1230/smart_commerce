import httpRequest from "@/utils/http-request";

interface ICheckoutProps {
  cartItemIds: number[];
  addressId: number;
  paymentId: number;
}

export const checkout = async (req: ICheckoutProps) => {
  const res = await httpRequest.post("/checkout", req);
  return res.data;
};
