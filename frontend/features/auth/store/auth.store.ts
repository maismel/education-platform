import { create } from "zustand";

export type User = {
  id: string;
  email: string;
  role?: "STUDENT" | "TEACHER" | "ADMIN";
};

interface AuthState {
  user: User | null;
  accessToken: string | null;

  login: (user: User, accessToken: string) => void;
  logout: () => void;

  setUser: (user: User | null) => void;
  setAccessToken: (token: string | null) => void;

  isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  accessToken: null,

  login: (user, accessToken) =>
    set({
      user,
      accessToken,
    }),

  logout: () =>
    set({
      user: null,
      accessToken: null,
    }),

  setUser: (user) => set({ user }),

  setAccessToken: (token) => set({ accessToken: token }),

  isAuthenticated: () => {
    const { user, accessToken } = get();
    return !!user && !!accessToken;
  },
}));
