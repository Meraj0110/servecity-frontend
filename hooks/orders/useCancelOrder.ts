// src/hooks/orders/useCancelOrder.ts

"use client";

import { api } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCancelOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (orderId: number) => {
      return api.post(`/orders/${orderId}/cancel`);
    },

    // ⭐ Optimistic Update
    onMutate: async (orderId) => {
      await queryClient.cancelQueries({ queryKey: ["orders"] });

      const previousData = queryClient.getQueryData(["orders"]);

      queryClient.setQueryData(["orders"], (old: any) => {
        if (!old || !old.orders) return old;

        return {
          ...old,
          orders: old.orders.map((o: any) =>
            o.id === orderId ? { ...o, status: "cancelled" } : o
          ),
        };
      });

      return { previousData };
    },

    // Rollback if failed
    onError: (_err, _vars, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(["orders"], context.previousData);
      }
    },

    // Refetch to sync
    onSettled: () => {
      queryClient.invalidateQueries(["orders"]);
      queryClient.invalidateQueries(["order"]);
    },
  });
}
