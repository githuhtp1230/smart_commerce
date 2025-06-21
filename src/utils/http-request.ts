import { SECURITY } from "@/constants/common";
import axios from "axios";
import { getCookie } from "typescript-cookie";

const httpRequest = axios.create({
  baseURL: import.meta.env.VITE_SMART_COMMERCE_API,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

httpRequest.interceptors.request.use((config) => {
  const accessToken = getCookie(SECURITY.ACCESS_TOKEN);
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

export default httpRequest;
