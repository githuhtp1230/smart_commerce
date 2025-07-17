import type { IUser } from "@/type/auth";
import { create } from "zustand";

interface AuthState {
  me?: IUser | null;
  isAuthenticated: boolean;
  setMe: (me: IUser) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  me: undefined,
  isAuthenticated: false,
  setMe: (me) => set({ me, isAuthenticated: !!me }),
  logout: () => set({ me: null, isAuthenticated: false }),
}));
