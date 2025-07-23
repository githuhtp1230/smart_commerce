import type { RoleType } from "@/type/common";

export interface IAuth {
  user: IUser;
  accessToken: string;
}

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface IUser {
  id: number;
  email: string;
  name: string;
  avatar: string;
  phone: string;
  role: RoleType;
  isActive: boolean
}
