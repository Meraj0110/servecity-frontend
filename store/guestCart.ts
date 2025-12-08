// src/store/guestCart.ts
"use client";

import { create } from "zustand";

export const useGuestCart = create((set) => ({
  cart: [],

  addItem: (item) =>
    set((state) => {
      const existing = state.cart.find((i) => i.productId === item.productId);

      if (existing) {
        return {
          cart: state.cart.map((i) =>
            i.productId === item.productId
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          ),
        };
      }

      return { cart: [...state.cart, item] };
    }),

  removeItem: (productId) =>
    set((state) => ({
      cart: state.cart.filter((i) => i.productId !== productId),
    })),

  updateQty: (productId, qty) =>
    set((state) => ({
      cart: state.cart.map((i) =>
        i.productId === productId ? { ...i, quantity: qty } : i
      ),
    })),

  clear: () => set({ cart: [] }),
}));
