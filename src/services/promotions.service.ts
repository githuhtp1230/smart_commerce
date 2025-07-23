import type { IPromotion } from "@/type/promotion";
import httpRequest from "@/utils/http-request";

export const fetchPromotions = async (
  isActived?: boolean
): Promise<[IPromotion]> => {
  try {
    const res = await httpRequest.get("promotions", {
      params: isActived !== undefined ? { isActived } : {}, // chỉ truyền khi có giá trị
    });
    return res.data.data;
  } catch (error) {
    throw error;
  }
};
