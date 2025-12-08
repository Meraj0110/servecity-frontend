// src/hooks/useSignup.ts
"use client";

import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";

export function useSignup() {
  return useMutation({
    mutationFn: async (payload: { email: string; password: string }) => {
      const { data } = await api.post("/auth/signup", payload);
      return data;
    },
  });
}
