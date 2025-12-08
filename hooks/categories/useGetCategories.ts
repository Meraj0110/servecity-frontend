// src/hooks/categories/useGetCategories.ts
"use client";

import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export function useGetCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await api.get("/categories");
      return res.data.data; // return only array
    },
  });
}
