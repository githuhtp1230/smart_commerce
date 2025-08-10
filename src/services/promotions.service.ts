import type { IPromotion } from "@/type/promotion";
import httpRequest from "@/utils/http-request";

interface PromotionParams {
  isActived?: boolean;
}

export const fetchPromotions = async ({
  isActived,
}: PromotionParams): Promise<IPromotion[]> => {
  const params: PromotionParams = {};
  if (isActived !== undefined) {
    params.isActived = isActived;
  }
  const res = await httpRequest.get("promotions", { params });
  return res.data.data;
};

export const createPromotion = async (data: {
  description: string;
  discountValuePercent: number;
  startDate: string;
  endDate: string;
}): Promise<IPromotion> => {
  const res = await httpRequest.post("promotions", data);
  return res.data.data;
};

export const deletePromotion = async (id: number): Promise<void> => {
  await httpRequest.delete(`/promotions/${id}/delete`);
};

export const updatePromotion = async (
  id: number | string,
  data: Partial<
    Pick<
      IPromotion,
      "description" | "discountValuePercent" | "startDate" | "endDate"
    >
  >
): Promise<IPromotion> => {
  const res = await httpRequest.put(`/promotions/${id}`, data);
  return res.data.data;
};

export const fetchPromotionApi = {
  fetchPromotions,
  createPromotion,
  deletePromotion,
  updatePromotion,
};
