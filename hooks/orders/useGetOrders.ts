// src/hooks/orders/useOrders.ts

"use client";

import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export function useOrders(page: number = 1, limit: number = 20) {
  return useQuery({
    queryKey: ["orders", page],
    queryFn: async () => {
      const res = await api.get(`/orders/list?page=${page}&limit=${limit}`);
      return res.data;
    },
    // staleTime: 1000 * 30, // 30s cache
  });
}
