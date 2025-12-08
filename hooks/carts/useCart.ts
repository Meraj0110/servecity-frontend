// src/hooks/cart/useCart.ts
"use client";

import { useQuery } from "@tanstack/react-query";
// import { fetchCartItems } from "@/lib/api/checkout";

import { useGuestCart } from "@/store/guestCart";
import { useEffect, useState } from "react";
import { isLoggedIn } from "@/lib/auth";
import { fetchCartItems } from "@/lib/api/cart";

export function useCart() {
  const guestCart = useGuestCart();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    isLoggedIn().then(setLoggedIn);
  }, []);

  const redisCartQuery = useQuery({
    queryKey: ["cartItems"],
    queryFn: fetchCartItems,
    enabled: loggedIn,
  });

  const cart = loggedIn ? redisCartQuery.data?.raw || [] : guestCart.cart;

  return {
    loggedIn,
    cart,
    redisCartQuery,
    guestCart,
  };
}
