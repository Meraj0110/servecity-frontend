// src/lib/auth.ts
import Cookies from "js-cookie";
import { api } from "@/lib/api";

export async function isLoggedIn(): Promise<boolean> {
  // 1️⃣ Check if token exists in cookies
  const token = Cookies.get("access_token");
  if (!token) return false;

  try {
    // 2️⃣ Validate token by calling backend
    const res = await api.get("/auth/me");

    if (res?.data?.user?.id) {
      return true; // valid session
    }

    return false;
  } catch (err: any) {
    // 3️⃣ If 401 → token expired but axios interceptor will refresh it
    if (err?.response?.status === 401) {
      return false;
    }

    // 4️⃣ Other errors → treat as logged out
    return false;
  }
}
