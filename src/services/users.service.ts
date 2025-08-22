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

/** Tạo người dùng mới */
export interface ICreateUser {
  name: string;
  email: string;
  password: string;
  phone: string;
  roleId?: number; // backend nhận roleId (optional, default = USER)
  avatar?: string; // backend nhận string URL
  isActive?: boolean; // backend nhận boolean (true/false)
}

export const createUser = async (data: ICreateUser): Promise<IUser> => {
  try {
    const res = await httpRequest.post("users", data); // gửi JSON
    return res.data.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const toggleIsActiveUser = async (userId: number): Promise<IUser> => {
  try {
    const res = await httpRequest.post(`users/${userId}/toggle-is-active-user`);
    return res.data.data;
  } catch (error) {
    console.error(`Error toggling user status (id=${userId}):`, error);
    throw error;
  }
};

/** Cập nhật người dùng */
export interface IUpdateUserRequest {
  id: number;
  name: string;
  email: string;
  phone: string;
  roleId?: number;
  isActive?: boolean;
  avatar?: string;
}

export const updateUser = async (data: IUpdateUserRequest): Promise<IUser> => {
  try {
    const { id, ...payload } = data; // tách id ra, payload còn lại
    const res = await httpRequest.put(`users/${id}`, payload); // gửi tới /users/:id
    return res.data.data;
  } catch (error) {
    console.error(`Error updating user (id=${data.id}):`, error);
    throw error;
  }
};
