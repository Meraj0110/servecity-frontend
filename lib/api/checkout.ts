// src/lib/api.ts
import { api } from "../api"; // your Axios instance

/* ============================================
    1. GET USER ADDRESSES
============================================ */
export async function fetchAddresses() {
  const res = await api.get("/addresses/all-addresses");
  return res.data?.addresses;
}

/* ============================================
    2. GET PAYMENT METHODS
============================================ */
// src/lib/api/payment.ts

interface PaymentMethod {
  id: string;
  icon: string;
  label: string;
  processingFee: number;
}
export function fetchPaymentMethods(): PaymentMethod[] {
  return [
    {
      id: "upi",
      icon: "💳", // you can swap for a lucide icon if needed
      label: "UPI",
      processingFee: 0,
    },
    {
      id: "cod",
      icon: "💵",
      label: "Cash on Delivery",
      processingFee: 0,
    },
  ];
}

/* ============================================
    3. UPDATE CART ITEM QUANTITY
============================================ */
export async function updateCartItemQuantity({
  productId,
  quantity,
  date,
  time,
}: {
  productId: number;
  quantity: number;
  date?: string;
  time?: string;
}) {
  const res = await api.post("/carts/update-qty", {
    productId,
    quantity,
    date,
    time,
  });

  return res.data;
}

/* ============================================
    4. REMOVE A CART ITEM
============================================ */
export async function removeCartItem(productId: number) {
  const res = await api.post("/carts/remove", { productId });
  return res.data;
}

/* ============================================
    5. PLACE ORDER
============================================ */
export async function placeOrder({
  addressId,
  paymentMethod,
  
}: {
  addressId: number;
  paymentMethod: string;

}) {
  const res = await api.post("/orders/place-order", {
    addressId,
    paymentMethod
  });

  return res.data;
}

export async function validatePromoCode(code: string) {
  if (!code) return null;

  try {
    const res = await api.post("/checkout/validate-promo", { code });

    // Expecting backend to return:
    // { code: "SAVE10", type: "percentage", discount: 10 }
    return res.data || null;
  } catch (err) {
    console.error("Promo code validation failed:", err);
    return null;
  }
}
