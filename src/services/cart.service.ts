import type { IAddCartItemRequest, ICartItem } from "@/type/cart";
import httpRequest from "@/utils/http-request";

export const fetchCartItems = async (): Promise<ICartItem[]> => {
  const res = await httpRequest.get("cart/items");
  return res.data.data.map((item: ICartItem) => ({
    ...item,
    isSelected: false,
  }));
};

export const addCartItem = async (
  body: IAddCartItemRequest
): Promise<ICartItem> => {
  const res = await httpRequest.post("cart/items", body);
  return res.data.data;
};

export const deleteCartItemRequest = async (itemId: number): Promise<void> => {
  const res = await httpRequest.delete(`cart/items/${itemId}`);
  return res.data.data;
};

export const updateQuantityCartItemRequest = async ({
  itemId,
  change,
}: {
  itemId: number;
  change: number;
}): Promise<void> => {
  const res = await httpRequest.post(`cart/items/${itemId}`, { change });
  return res.data.data;
};
