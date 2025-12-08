import { create } from "zustand";
import Cookies from "js-cookie";
import { api } from "@/lib/api"; // <-- axios instance
import { logout as logoutFn } from "@/utils/logout";

type Role = "admin" | "vendor" | "customer" | null;

interface AuthState {
  user: any | null;
  accessToken: string | null;
  role: Role;
  isAuthenticated: boolean;

  setAuth: (payload: { user: any; token: string }) => void;
  restore: () => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  role: null,
  isAuthenticated: false,

  // -------------------------
  // LOGIN: store token + user
  // -------------------------
  setAuth: ({ user, token }) => {
    Cookies.set("access_token", token, { expires: 7 });

    set({
      user,
      accessToken: token,
      role: user.role,
      isAuthenticated: true,
    });
  },

  // -------------------------
  // RESTORE SESSION
  // (Fetch /auth/me to get role)
  // -------------------------
  restore: async () => {
    const token = Cookies.get("access_token");

    if (!token) {
      return set({
        user: null,
        accessToken: null,
        role: null,
        isAuthenticated: false,
      });
    }

    try {
      const { data } = await api.get("/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Expecting: { user: { id, email, profile: { role } } }
      const user = data.user;
      console.log(user);
      console.log(data);

      set({
        user,
        accessToken: token,
        role: user.role ?? data.profile?.role ?? null,
        isAuthenticated: true,
      });
    } catch (err) {
      // token expired or invalid
      Cookies.remove("access_token");

      set({
        user: null,
        accessToken: null,
        role: null,
        isAuthenticated: false,
      });
    }
  },

  // -------------------------
  // LOGOUT
  // -------------------------
  logout: async () => {
    try {
      await logoutFn();
    } catch (error) {
      console.error("Logout API failed:", error);
    } finally {
      Cookies.remove("access_token");
      localStorage.removeItem("deviceId");

      set({
        user: null,
        accessToken: null,
        role: null,
        isAuthenticated: false,
      });
    }
    window.location.href = "/login";
  },
}));
