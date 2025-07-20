import type { ICategory } from "@/type/category";
import httpRequest from "@/utils/http-request";

export const fetchCategories = async (isDeleted?: boolean): Promise<ICategory[]> => {
  try {
    const res = await httpRequest.get("categories", {
      params: isDeleted !== undefined ? { isDeleted } : {}, // chỉ truyền khi có giá trị
    });
    return res.data.data;
  } catch (error) {
    throw error;
  }
};
