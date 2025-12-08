// src/hooks/cart/useAddToCart.ts

import { api } from "@/lib/api";
import { isLoggedIn } from "@/lib/auth";
import { useGuestCart } from "@/store/guestCart";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useAddToCart() {
  const guestCart = useGuestCart();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: any) => {
      const logged = await isLoggedIn();
      if (!logged) {
        guestCart.addItem(payload);
        return { status: "guest", payload };
      }

      return api.post("/carts/add", payload);
    },

    // ⭐ OPTIMISTIC UPDATE
    onMutate: async (newItem) => {
      const logged = await isLoggedIn();
      if (!logged) return;

      await queryClient.cancelQueries(["cartItems"]);

      const previousCart = queryClient.getQueryData(["cartItems"]);

      // ⭐ add item instantly
      queryClient.setQueryData(["cartItems"], (old: any) => {
        if (!old) return { raw: [newItem] };

        return {
          raw: [...old.raw, newItem],
        };
      });

      return { previousCart };
    },

    onError: (_err, _newItem, context) => {
      // rollback if failed
      if (context?.previousCart) {
        queryClient.setQueryData(["cartItems"], context.previousCart);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries(["cartItems"]);
    },
  });
}

export const  handleAddToCart =  async (product:any,isAuthenticated:any) => {
      const payload = {
        productId: product.id,
        quantity:1,
      };
      
      const addToCartMutation = useAddToCart();
      try {
        await addToCartMutation.mutateAsync(payload);
        alert(
          isAuthenticated
          ? "Item added to your cart!"
          : "Added to cart (Guest Mode)"
        );
      } catch (err) {
        alert("Failed to add to cart");
      }
    }
