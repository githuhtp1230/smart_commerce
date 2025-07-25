import type { IAuth, ILoginRequest } from "@/type/auth";
import httpRequest from "@/utils/http-request";

export const loginRequest = async (body: ILoginRequest): Promise<IAuth> => {
  try {
    const res = await httpRequest.post("auth/login", body);
    return res.data.data;
  } catch (error) {
    throw error;
  }
};
export const changePassword = async (body: {
  currentPassword: string;
  newPassword: string;
}) => {
  const res = await httpRequest.post("/auth/change-password", body);
  return res.data;
};
export const registerRequest = async (body: {
  username: string;
  email: string;
  password: string;
}) => {
  const res = await httpRequest.post("/auth/register", body);
  return res.data;
};

export const verifyOtpRequest = async (body: {
  email: string;
  otp: string;
}) => {
  const res = await httpRequest.post("/auth/register-verify-otp", body);
  return res.data;
};

export const sendForgotPasswordOTPRequest = async (body: { email: string }) => {
  const res = await httpRequest.post("/auth/forgot-password", body);
  return res.data;
};

export const verifyForgotPasswordOtpRequest = async (body: {
  email: string;
  otp: string;
}) => {
  const res = await httpRequest.post("/auth/reset-password", body);
  return res.data;
};
