import type { IPromotion } from "@/type/promotion";
import httpRequest from "@/utils/http-request";

interface PromotionParams {
  isActive?: boolean;
}

// Lấy danh sách khuyến mãi
export const fetchPromotions = async ({
  isActive,
}: PromotionParams = {}): Promise<IPromotion[]> => {
  const params: PromotionParams = {};
  if (isActive !== undefined) params.isActive = isActive;

  const res = await httpRequest.get("/promotions", { params });
  return res.data.data;
};

// Tạo mới khuyến mãi
export const createPromotion = async (data: {
  description: string;
  discountValuePercent: number;
  startDate: string; // ISO string
  endDate: string; // ISO string
}): Promise<IPromotion> => {
  const res = await httpRequest.post("/promotions", data);
  return res.data.data;
};

// Cập nhật khuyến mãi
export const updatePromotion = async (
  id: number | string,
  data: {
    description: string;
    discountValuePercent: number;
    startDate: string; // ISO string
    endDate: string; // ISO string
  }
): Promise<IPromotion> => {
  const res = await httpRequest.put(`/promotions/${id}`, data);
  return res.data.data;
};

// Bật/tắt (xóa mềm) khuyến mãi
export const togglePromotion = async (id: number): Promise<IPromotion> => {
  const res = await httpRequest.post(`/promotions/${id}/delete`);
  return res.data.data;
};

export const promotionApi = {
  fetchPromotions,
  createPromotion,
  updatePromotion,
  togglePromotion,
};
