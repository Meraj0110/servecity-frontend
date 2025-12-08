"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/carts/useCart";
import { useUpdateQty } from "@/hooks/carts/useUpdateQuantity";
import { useRemoveFromCart } from "@/hooks/carts/useRemoveFromCart";

// -----------------------------
// Quantity Controls Component
// -----------------------------
function QuantityControls({
  qty,
  onIncrease,
  onDecrease,
}: {
  qty: number;
  onIncrease: () => void;
  onDecrease: () => void;
}) {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={onDecrease}
        className="w-8 h-8 rounded-md border flex items-center justify-center hover:bg-gray-100"
      >
        -
      </button>

      <span className="text-sm font-medium">{qty}</span>

      <button
        onClick={onIncrease}
        className="w-8 h-8 rounded-md border flex items-center justify-center hover:bg-gray-100"
      >
        +
      </button>
    </div>
  );
}

// -----------------------------
// Summary Row Component
// -----------------------------
function SummaryRow({ label, value }: { label: any; value: any }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-gray-600">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

// -----------------------------
// Main Cart Page
// -----------------------------
export default function CartPage() {
  const { cart, loggedIn, redisCartQuery } = useCart();
  const { update } = useUpdateQty();
  const { remove } = useRemoveFromCart();

  const isLoading = loggedIn && redisCartQuery.isLoading;

  const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.quantity * (item.servicePrice || 100),
    0
  );

  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center py-20">
        <p className="text-lg font-medium">Loading cart...</p>
      </div>
    );
  }

  if (cart.length === 0 && isLoading) {
    return (
      <div className="w-full flex flex-col items-center py-20">
        <p className="text-xl font-semibold">Your cart is empty</p>
        <Link href="/products">
          <Button className="mt-4">Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
      {/* CART ITEMS */}
      <div className="lg:col-span-2 space-y-6">
        <h1 className="text-2xl font-bold">Shopping Cart</h1>

        {cart.map((item) => (
          <div
            key={`${item.id}-${item.variant || "default"}`}
            className="flex gap-4 p-4 border rounded-xl shadow-sm bg-white"
          >
            {/* Product Image */}
            <div className="w-32 h-32 relative rounded-md overflow-hidden bg-gray-100">
              <Image
                src={item.image ? item.image : "/goth.gif"}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Details */}
            <div className="flex flex-col flex-1 justify-between">
              <div>
                <h2 className="font-semibold text-lg">{item.serviceName}</h2>

                {item.variant && (
                  <p className="text-sm text-gray-500">
                    Variant: {item.variant}
                  </p>
                )}

                <p className="text-blue-600 font-semibold mt-1">
                  ₹{item.servicePrice || "no price "}
                </p>
              </div>

              <div className="flex items-center justify-between mt-3">
                <QuantityControls
                  qty={item.quantity}
                  onIncrease={() =>
                    update({
                      productId: item.serviceId,
                      quantity: item.quantity + 1,
                    })
                  }
                  onDecrease={() =>
                    item.quantity > 1 &&
                    update({
                      productId: item.serviceId,
                      quantity: item.quantity - 1,
                    })
                  }
                />

                <button
                  className="text-red-500 text-sm font-medium"
                  onClick={() => remove(item.serviceId)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* PRICE SUMMARY */}
      <div className="p-6 rounded-xl border shadow bg-white h-fit sticky top-20">
        <h2 className="text-lg font-bold mb-4">Price Details</h2>

        <div className="space-y-2 mb-4">
          <SummaryRow label="Total Items" value={totalQty} />
          <SummaryRow label="Total Price" value={`₹${totalPrice}`} />
          <SummaryRow label="Delivery Charges" value="FREE" />
        </div>

        <div className="h-px w-full bg-gray-200 my-4" />

        <SummaryRow
          label={<span className="font-semibold">Grand Total</span>}
          value={
            <span className="font-semibold text-green-600">₹{totalPrice}</span>
          }
        />

        <Link href="/checkout">
          <Button className="w-full mt-6">Proceed to Checkout</Button>
        </Link>
      </div>
    </div>
  );
}
