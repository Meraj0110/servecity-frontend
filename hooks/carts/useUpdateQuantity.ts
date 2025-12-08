"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { isLoggedIn } from "@/lib/auth";
import { useGuestCart } from "@/store/guestCart";

export function useUpdateQty() {
  const guestCart = useGuestCart();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    // ⭐ OPTIMISTIC UPDATE
    onMutate: async ({ productId, quantity }) => {
      const logged = await isLoggedIn();

      if (!logged) {
        guestCart.updateQty(productId, quantity);
        return;
      }

      // Cancel ongoing fetch for cart
      await queryClient.cancelQueries(["cartItems"]);

      // Previous cart snapshot
      const prevCart = queryClient.getQueryData(["cartItems"]);

      // Optimistically update
      queryClient.setQueryData(["cartItems"], (old: any) => {
        if (!old?.raw) return old;

        return {
          ...old,
          raw: old.raw.map((item: any) =>
            item.productId === productId ? { ...item, quantity } : item
          ),
        };
      });

      return { prevCart };
    },

    mutationFn: async ({ productId, quantity, date, time }) => {
      const logged = await isLoggedIn();
      console.log("maybe somehint happen");
      if (!logged) {
        return { status: "guest" };
      }

      return api.post("/carts/update-qty", { productId, quantity });
    },

    // ⛔ If backend failed → rollback
    onError: (err, variables, context: any) => {
      if (context?.prevCart) {
        queryClient.setQueryData(["cartItems"], context.prevCart);
      }
    },

    // 🔄 After API resolves → revalidate
    onSettled: () => {
      queryClient.invalidateQueries(["cartItems"]);
    },
  });

  return {
    update: mutation.mutate,
    ...mutation,
  };
}
