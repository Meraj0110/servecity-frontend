"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { isLoggedIn } from "@/lib/auth";
import { useGuestCart } from "@/store/guestCart";

export function useRemoveFromCart() {
  const guestCart = useGuestCart();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    onMutate: async (productId) => {
      const logged = await isLoggedIn();

      if (!logged) {
        guestCart.removeItem(productId);
        return;
      }

      await queryClient.cancelQueries(["cartItems"]);

      const prevCart = queryClient.getQueryData(["cartItems"]);

      queryClient.setQueryData(["cartItems"], (old: any) => {
        if (!old?.raw) return old;

        return {
          ...old,
          raw: old.raw.filter((item: any) => item.productId !== productId),
        };
      });

      return { prevCart };
    },

    mutationFn: async (serviceId) => {
      const logged = await isLoggedIn();

      if (!logged) return { status: "guest" };

      return api.post("/carts/remove", { serviceId });
    },

    onError: (err, variables, context: any) => {
      if (context?.prevCart) {
        queryClient.setQueryData(["cartItems"], context.prevCart);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries(["cartItems"]);
    },
  });

  return {
    remove: mutation.mutate,
    ...mutation,
  };
}
