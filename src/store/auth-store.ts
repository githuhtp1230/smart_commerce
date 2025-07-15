import type { IUser } from "@/type/auth";
import { create } from "zustand";

interface AuthState {
  me?: IUser | null;
  isAuthenticated: boolean;
  setMe: (me: IUser) => void;
  logout: () => void;
  // hỏi chat gpt cái này là gì, rồi hỏi cách sửa tên, phone, có thể hiểu đây là state toàn cục, bình thường dùng useState phải truyền từ cha xuống
}

export const useAuthStore = create<AuthState>((set) => ({
  me: undefined,
  isAuthenticated: false,
  setMe: (me) => set({ me, isAuthenticated: !!me }),
  logout: () => set({ me: null, isAuthenticated: false }),
}));
