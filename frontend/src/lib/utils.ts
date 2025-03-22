import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { useAuthStore } from "@/stores/use-auth-store";
import axios from "axios";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const axiosWithAuth = axios.create({
  baseURL: "/",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosWithAuth.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
