import type { ICategory } from "@/type/category";
import httpRequest from "@/utils/http-request";

export const fetchCategories = async (
  isDeleted?: boolean
): Promise<ICategory[]> => {
  const res = await httpRequest.get("categories", {
    params: isDeleted !== undefined ? { isDeleted } : {},
  });
  return res.data.data;
};

export const fetchSubCategories = async (
  isDeleted: boolean
): Promise<ICategory[]> => {
  const res = await httpRequest.get("categories", {
    params: {
      isChildren: true, // Luôn lấy danh mục con
      isDeleted: isDeleted, // Theo tab đã chọn
    },
  });
  return res.data.data;
};
