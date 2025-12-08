// src/lib/api.ts
import axios from "axios";
import Cookies from "js-cookie";
import { useDeviceStore } from "@/store/device-store";
import { useAuthStore } from "@/store/auth-store";

export const api = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true, // 🔑 send cookies on every request
});

// REQUEST INTERCEPTOR
api.interceptors.request.use((config) => {
  // attach deviceId as query param
  const deviceId = useDeviceStore.getState().deviceId;

  config.params = {
    ...(config.params || {}),
    deviceId,
  };

  // (optional) also send Authorization header from cookie
  const token = Cookies.get("access_token");
  if (token) {
    config.headers = config.headers || {};
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  if (deviceId) {
    config.headers["deviceid"] = deviceId; // ✅ prod mode
  }

  return config;
});

// RESPONSE INTERCEPTOR – auto refresh on 401
let isRefreshing = false;
let requestQueue: ((token: string) => void)[] = [];

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }

    // avoid infinite loop
    if (originalRequest._retry) {
      return Promise.reject(error);
    }
    originalRequest._retry = true;

    if (isRefreshing) {
      // queue pending requests while refresh in progress
      return new Promise((resolve) => {
        requestQueue.push((newToken: string) => {
          originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
          resolve(api(originalRequest));
        });
      });
    }

    isRefreshing = true;

    try {
      // call backend refresh – deviceId automatically added via interceptor
      const res = await api.post("/auth/refresh-token");

      const newToken = res.data.access_token;
      const user = res.data.user;
      console.log(newToken, user);
      // update cookies
      Cookies.set("access_token", newToken, { expires: 7 });
      if (user?.role) Cookies.set("role", user.role, { expires: 7 });

      // update zustand
      const setAuth = useAuthStore.getState().setAuth;
      setAuth({ user, token: newToken });

      // replay queued requests
      requestQueue.forEach((cb) => cb(newToken));
      requestQueue = [];
      isRefreshing = false;

      // retry original request
      originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
      return api(originalRequest);
    } catch (err) {
      isRefreshing = false;
      requestQueue = [];

      // refresh failed → logout
      const logout = useAuthStore.getState().logout;
      logout();

      return Promise.reject(err);
    }
  }
);
