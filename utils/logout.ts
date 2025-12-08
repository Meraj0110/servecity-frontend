import { api } from "@/lib/api";
import { useAuthStore } from "@/store/auth-store";

export const logout = async () => {
  try {
    await api.post("/auth/logout"); // backend clears cookies + redis session

    // Clear deviceId from localStorage
    localStorage.removeItem("deviceId");

    // Reset Zustand store
    useAuthStore.getState().logout();

    // Redirect
    window.location.href = "/login";
  } catch (err) {
    console.error("Logout error:", err);
  }
};
