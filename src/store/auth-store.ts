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
  logout: () => {
    document.cookie = "access_token=;expires=0;"
    set({ me: null, isAuthenticated: false })
  },
}));
