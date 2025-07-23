import type { ICategory } from "@/type/category";
import httpRequest from "@/utils/http-request";

export const fetchCategories = async (
  isDeleted?: boolean
): Promise<ICategory[]> => {
  try {
    const res = await httpRequest.get("categories", {
      params: isDeleted !== undefined ? { isDeleted } : {}, // chỉ truyền khi có giá trị
    });
    return res.data.data;
  } catch (error) {
    throw error;
  }
};

export const fetchSubCategories = async (
  isDeleted: boolean
): Promise<ICategory[]> => {
  try {
    const res = await httpRequest.get("categories", {
      params: {
        isChildren: true, // Luôn lấy danh mục con
        isDeleted: isDeleted, // Theo tab đã chọn
      },
    });
    return res.data.data;
  } catch (error) {
    throw error;
  }
};
