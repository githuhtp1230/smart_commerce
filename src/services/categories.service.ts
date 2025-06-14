import type { ICategory } from "@/type/category";
import httpRequest from "@/utils/http-request";

export const fetchCategories = async (): Promise<ICategory[]> => {
  try {
    const res = await httpRequest.get("categories");
    return res.data.data;
  } catch (error) {
    throw new Error("Error fetching products");
  }
};
