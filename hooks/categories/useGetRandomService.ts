// src/hooks/categories/useGetCategories.ts
"use client";

import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export function useGetRandomService() {
  return useQuery({
    queryKey: ["randomService"],
    queryFn: async () => {
      const res = await api.get(`/services/random`);
      return res.data.data; // return only array
    },
  });
}
