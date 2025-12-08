"use client";

import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetOrderDetails = (orderId: string) => {
  return useQuery({
    queryKey: ["order-details", orderId],
    queryFn: async () => {
      const res = await api.get(`/orders/order/${orderId}`);
      return res.data.order;
    },
    enabled: !!orderId,
  });
};
