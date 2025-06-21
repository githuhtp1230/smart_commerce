import type { IUser } from "@/type/auth";
import httpRequest from "@/utils/http-request";

export const fetchMe = async (): Promise<IUser> => {
  try {
    const res = await httpRequest.get("me/profile");
    return res.data.data;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
};
