"use client";

import React, { useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { CheckoutHeader } from "@/widgets/checkout/CheckoutHeader";
import { ProgressSteps } from "@/widgets/checkout/ProgressSteps";
import { CartItemCard } from "@/widgets/checkout/CartItemCard";
import { AddressCard } from "@/widgets/checkout/AddressCard";
import { PaymentMethodCard } from "@/widgets/checkout/PaymentMethodCard";
import { OrderSummaryCard } from "@/widgets/checkout/OrderSummaryCard";
import { PromoCodeInput } from "@/widgets/checkout/PromoCodeInput";
import {
  fetchAddresses,
  fetchPaymentMethods,
  updateCartItemQuantity,
  removeCartItem,
  placeOrder,
} from "@/lib/api/checkout";

import { calculateOrderSummary } from "@/utils/formatters";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

import Link from "next/link";

import { useCart } from "@/hooks/carts/useCart";
import { useRemoveFromCart } from "@/hooks/carts/useRemoveFromCart";
import { useCheckoutStore } from "@/store/checkout-store";

export default function CheckoutPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { remove } = useRemoveFromCart();

  const {
    step,
    selectedAddressId,
    selectedPaymentId,
    appliedPromoCode,
    setSelectedAddress,
    setSelectedPayment,
  } = useCheckoutStore();

  // 🔹 Smart cart: guest (localStorage) or logged-in (Redis via React Query)
  const { cart: cartItems, loggedIn, redisCartQuery, guestCart } = useCart();

  const isLoadingCart = loggedIn ? redisCartQuery.isLoading : false;

  // 🔹 Addresses – only fetch when logged in
  const { data: addresses = [], isLoading: isLoadingAddresses } = useQuery({
    queryKey: ["addresses"],
    queryFn: fetchAddresses,
    enabled: loggedIn,
  });

  // 🔹 Payment methods – only fetch when logged in
  const { data: paymentMethods = [], isLoading: isLoadingPayments } = useQuery({
    queryKey: ["paymentMethods"],
    queryFn: fetchPaymentMethods,
    enabled: loggedIn,
  });

  // 🔹 Update quantity mutation (Redis only)
  const updateQuantityMutation = useMutation({
    mutationFn: ({ id, quantity }: { id: string; quantity: number }) =>
      updateCartItemQuantity(id, quantity),
    onMutate: async ({ id, quantity }) => {
      await queryClient.cancelQueries({ queryKey: ["cartItems"] });
      const previousCart = queryClient.getQueryData(["cartItems"]);

      queryClient.setQueryData(["cartItems"], (old: any) =>
        old?.map((item: any) => (item.id === id ? { ...item, quantity } : item))
      );

      return { previousCart };
    },
    onError: (_err, _variables, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(["cartItems"], context.previousCart);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["cartItems"] });
    },
  });

  // 🔹 Remove item mutation (Redis only)
  const removeItemMutation = useMutation({
    mutationFn: removeCartItem,
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: ["cartItems"] });
      const previousCart = queryClient.getQueryData(["cartItems"]);

      queryClient.setQueryData(["cartItems"], (old: any) =>
        old?.filter((item: any) => item.id !== id)
      );

      return { previousCart };
    },
    onError: (_err, _variables, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(["cartItems"], context.previousCart);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["cartItems"] });
    },
  });

  // 🔹 Place order mutation (works for both guest + logged-in)
  const placeOrderMutation = useMutation({
    mutationFn: placeOrder,
    onSuccess: (data) => {
      router.push(`/orders/success?orderId=${data.orderId}`);
    },
    onError: (error: any) => {
      const reason = error.code || "payment_failed";
      router.push(`/orders/failed?reason=${reason}`);
    },
  });

  // 🔹 Selected payment method
  const selectedPaymentMethod =
    paymentMethods.find((pm: any) => pm.id === selectedPaymentId) || null;

  // 🔹 Order summary
  const orderSummary = useMemo(
    () =>
      calculateOrderSummary(cartItems, appliedPromoCode, selectedPaymentMethod),
    [cartItems, appliedPromoCode, selectedPaymentMethod]
  );

  const totalItems = cartItems.reduce(
    (sum: number, item: any) => sum + item.quantity,
    0
  );

  const handlePlaceOrder = () => {
    if (!selectedAddressId || !selectedPaymentId) {
      alert("Please select delivery address and payment method");
      return;
    }

    placeOrderMutation.mutate({
      addressId: Number(selectedAddressId),
      paymentMethod: selectedPaymentId, // ✔ CORRECT
      // promoCode: appliedPromoCode?.code,
    });
  };

  // 🔹 Handle quantity change based on login status
  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (loggedIn) {
      updateQuantityMutation.mutate({ id, quantity });
    } else {
      guestCart.updateQuantity(id, quantity);
    }
  };

  // 🔹 Handle remove item based on login status
  const handleRemoveItem = (id: string) => {
    if (loggedIn) {
      removeItemMutation.mutate(id);
    } else {
      guestCart.removeItem(id);
    }
  };

  // 🔹 Auto-select default address (only when logged in)
  React.useEffect(() => {
    if (loggedIn && addresses.length > 0 && !selectedAddressId) {
      const defaultAddress = addresses.find((addr: any) => addr.isDefault);
      if (defaultAddress) {
        setSelectedAddress(defaultAddress.id);
      }
    }
    console.log(addresses);
  }, [loggedIn, addresses, selectedAddressId, setSelectedAddress]);

  if (isLoadingCart || isLoadingAddresses || isLoadingPayments) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <CheckoutHeader />
        <div className="flex items-center justify-center h-[calc(100vh-80px)]">
          <div className="text-center">
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
            <p className="text-gray-600 font-semibold">Loading checkout...</p>
          </div>
        </div>
      </div>
    );
  }

  const isGuest = !loggedIn;

  return (
    <div className="min-h-screen bg-neutral-50">
      <CheckoutHeader />

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Steps */}
        <div className="mb-8">
          <ProgressSteps currentStep={step} />
        </div>

        {/* Guest Banner */}
        {isGuest && (
          <div className="mb-4 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-700">
            You are checking out as a guest. Login to sync your cart across
            devices.
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-6">
          {/* LEFT CONTENT */}
          <div className="lg:col-span-2 space-y-6">
            {/* CART ITEMS */}
            <div className="rounded-xl border bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-neutral-800">
                  Cart Items ({totalItems})
                </h2>
              </div>

              {cartItems.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-neutral-500 text-lg">Your cart is empty</p>
                  <button
                    onClick={() => router.push("/")}
                    className="mt-4 px-6 py-2 rounded-lg bg-black text-white hover:bg-black/80 transition"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {cartItems.map((item: any) => (
                    <CartItemCard
                      key={item.serviceId}
                      item={item}
                      onUpdateQuantity={handleUpdateQuantity}
                      onRemove={() => remove(item.serviceId)}
                      isUpdating={
                        loggedIn &&
                        updateQuantityMutation.isPending &&
                        updateQuantityMutation.variables?.id === item.id
                      }
                    />
                  ))}
                </div>
              )}
            </div>

            {/* ADDRESS */}
            {cartItems.length > 0 && loggedIn && (
              <div className="rounded-xl border bg-white p-5 shadow-sm">
                <h2 className="text-xl font-semibold text-neutral-800 mb-4">
                  Delivery Address
                </h2>

                <div className="space-y-3">
                  {addresses.map((adr: any) => (
                    <AddressCard
                      key={adr.id}
                      address={adr}
                      isSelected={selectedAddressId === adr.id}
                      onSelect={setSelectedAddress}
                    />
                  ))}
                </div>

                <Link
                  href="/address"
                  className="inline-block mt-4 text-sm font-medium text-blue-600 hover:underline"
                >
                  + Add New Address
                </Link>
              </div>
            )}

            {/* PAYMENT */}
            {cartItems.length > 0 && loggedIn && (
              <div className="rounded-xl border bg-white p-5 shadow-sm">
                <h2 className="text-xl font-semibold text-neutral-800 mb-4">
                  Payment Method
                </h2>

                <div className="space-y-3">
                  {paymentMethods.map((method: any) => (
                    <PaymentMethodCard
                      key={method.id}
                      method={method}
                      isSelected={selectedPaymentId === method.id}
                      onSelect={setSelectedPayment}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Guest CTA */}
            {isGuest && cartItems.length > 0 && (
              <div className="rounded-xl border bg-white p-4 shadow-sm">
                <p className="text-sm text-neutral-600">
                  Login to save your address & payment preferences.
                </p>
                <button
                  onClick={() => router.push("/login")}
                  className="mt-2 text-blue-600 font-medium hover:underline"
                >
                  Login →
                </button>
              </div>
            )}
          </div>

          {/* RIGHT SIDEBAR */}
          {cartItems.length > 0 && (
            <div className="space-y-4">
              <PromoCodeInput />
              <OrderSummaryCard
                summary={orderSummary}
                itemCount={totalItems}
                onPlaceOrder={handlePlaceOrder}
                isPlacingOrder={placeOrderMutation.isPending}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
