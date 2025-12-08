// src/hooks/orders/useOrderDetails.ts

"use client";

import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export function useOrderDetails(orderId: string | number) {
  return useQuery({
    queryKey: ["order", orderId],
    queryFn: async () => {
      const res = await api.get(`/orders/${orderId}`);
      console.log("llklk")
      return res.data;
    },
    enabled: !!orderId,
  });
}
