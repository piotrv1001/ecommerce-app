import { create } from "zustand";
import { persist } from "zustand/middleware";

type State = {
  token: string | null;
};

type Actions = {
  login: (token: string) => void;
  logout: () => void;
};

export const useAuthStore = create<State & Actions>()(
  persist(
    (set) => ({
      token: null,
      login: (token) => set({ token }),
      logout: () => set({ token: null }),
    }),
    {
      name: "auth-storage",
    }
  )
);
