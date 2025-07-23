import type { ICategory } from "@/type/category";
import httpRequest from "@/utils/http-request";

/**
 * Fetch subcategories (child categories) based on deleted status.
 *
 * @param isDeleted - true to fetch deleted subcategories, false to fetch active ones
 * @returns List of ICategory
 */
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
