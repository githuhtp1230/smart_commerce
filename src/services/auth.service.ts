import type { IAuth, ILoginRequest } from "@/type/auth";
import httpRequest from "@/utils/http-request";

export const loginRequest = async (body: ILoginRequest): Promise<IAuth> => {
  try {
    const res = await httpRequest.post("auth/login", body);
    return res.data.data;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
};
