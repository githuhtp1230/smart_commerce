import type { RoleType } from "@/type/common";

export interface IAuth {
  user: IUser;
  accessToken: string;
}

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface Address {
  id: number;
  province: string;
  district: string;
  ward: string;
  streetAddress: string;
  isDefault?: boolean;
}

export interface IUser {
  id: number;
  email: string;
  name: string;
  avatar: string;
  phone: string;
  role: RoleType;
  isActive: boolean;
  addresses?: Address[];
}
