import { api } from "@/lib/api";
import { CartItem } from "@/types/checkout";

export const fetchCartItems = async (cartId: string): Promise<CartItem[]> => {
  const res = await api.get(`/carts`);
  console.log(res.data);

  return res.data;
};

import { Address } from "@/types/checkout";

export const fetchAddresses = async (): Promise<Address[]> => {
  const res = await api.get("/addresses/user");

  return res.data.addresses.map((addr: any) => ({
    id: addr.id,
    name: addr.fullName,
    phone: addr.phone,
    addressLine1: addr.roadStreet,
    addressLine2: addr.landmark || "",
    city: addr.city,
    state: addr.state,
    pincode: addr.pinCode,
    type: addr.type || "home",
    isDefault: addr.isDefault || false,
  }));
};

import { PaymentMethod } from "@/types/checkout";

export const fetchPaymentMethods = async (): Promise<PaymentMethod[]> => {
  return [
    {
      id: "upi",
      type: "upi",
      label: "UPI",
      icon: "💳",
      processingFee: 0,
    },
    {
      id: "card",
      type: "card",
      label: "Credit/Debit Card",
      icon: "💳",
      processingFee: 0,
    },
    {
      id: "cod",
      type: "cod",
      label: "Cash on Delivery",
      icon: "💵",
      processingFee: 0,
    },
  ];
};

export const updateCartItemQuantity = async (
  cartId: string,
  productId: number,
  variant: string,
  quantity: number
) => {
  const res = await api.post("/cart/update-quantity", {
    cartId,
    productId,
    variant,
    quantity,
  });

  return res.data.updatedItem;
};

export const removeCartItem = async (
  cartId: string,
  productId: number,
  variant: string
): Promise<void> => {
  await api.post("/cart/remove", {
    cartId,
    productId,
    variant,
  });
};

export const placeOrder = async (
  orderData: any
): Promise<{ orderId: string }> => {
  const res = await api.post("/orders/place-cart", orderData);

  return { orderId: res.data.orderId };
};
