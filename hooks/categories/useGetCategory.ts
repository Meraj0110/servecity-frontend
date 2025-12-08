// src/hooks/categories/useGetCategories.ts
"use client";

import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export function useGetCategory(id) {
  return useQuery({
    queryKey: ["categories",id],
    queryFn: async () => {
      const res = await api.get(`/categories/${id}`);
      return res.data.data; // return only array
    },
  });
}
