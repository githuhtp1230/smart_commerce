import type { IUser } from "@/type/auth";
import httpRequest from "@/utils/http-request";

export const fetchMe = async (): Promise<IUser> => {
  try {
    const res = await httpRequest.get("me/profile");
    return res.data.data;
  } catch (error) {
    throw error;
  }
};

export const updateProfile = async (body: Partial<IUser>): Promise<IUser> => {
  try {
    const res = await httpRequest.post("me/profile/update", body);
    return res.data.data;
  } catch (error) {
    throw error;
  }
};

export const sendEmailContact = async (body: { title: string; message: string }): Promise<void> => {
  try {
    await httpRequest.post("me/send-email-contact", body);
  } catch (error) {
    throw error;
  }
};
