import { api } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/store/auth-store";

export function useLogin() {
  const setAuth = useAuthStore((s) => s.setAuth);

  return useMutation({
    mutationFn: async ({ email, password }) => {
      const res = await api.post("/auth/login", { email, password });
      return res.data;
    },

    onSuccess: (data) => {
      setAuth({
        user: data.user,
        token: data.session.access_token,
      });
    },
  });
}
