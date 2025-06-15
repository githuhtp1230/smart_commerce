import type { IAuth, ILoginRequest } from "@/type/auth";
import httpRequest from "@/utils/http-request";

export const fetchCategories = async (
  body: ILoginRequest
): Promise<IAuth[]> => {
  try {
    const res = await httpRequest.post("auth/login", body);
    return res.data.data;
  } catch (error) {
    throw new Error("Error fetching products");
  }
};
