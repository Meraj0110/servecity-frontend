"use client";

import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useAuthStore } from "@/store/auth-store"; // your zustand store
import { useQueryClient } from "@tanstack/react-query";

export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const clearAuth = useAuthStore((state) => state.logout); // you must have clearAuth()

  const logout = () => {
    // 1. Clear Zustand user data
    clearAuth();

    // 2. Remove cookies
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    Cookies.remove("deviceId");

    // 3. Clear browser storage
    localStorage.clear();
    sessionStorage.clear();

    // 4. Clear React Query cache
    queryClient.clear();

    // 5. Redirect
    router.push("/login");
  };

  return logout;
}
