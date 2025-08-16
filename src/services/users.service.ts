import type { IUser } from "@/type/auth";
import httpRequest from "@/utils/http-request";

/** Lấy tất cả người dùng */
export const fetchUsers = async (): Promise<IUser[]> => {
  try {
    const res = await httpRequest.get("users");
    return res.data.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

/** Lấy khách hàng */
export const fetchCustomer = async (): Promise<IUser[]> => {
  try {
    const res = await httpRequest.get("users?isCustomer=true");
    return res.data.data;
  } catch (error) {
    console.error("Error fetching customers:", error);
    throw error;
  }
};

/** Lấy thành viên */
export const fetchMembership = async (): Promise<IUser[]> => {
  try {
    const res = await httpRequest.get("users?isMemberShip=true");
    return res.data.data;
  } catch (error) {
    console.error("Error fetching members:", error);
    throw error;
  }
};
