"use client";

import { CheckCircle2 } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { useGetOrderDetails } from "@/hooks/orders/useGetOrderDetails";
import Image from "next/image";
import { useEffect } from "react";
import confetti from "canvas-confetti";

export default function OrderSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get("orderId");

  const { data: order, isLoading } = useGetOrderDetails(orderId || "");

  // 🎉 Trigger CONFETTI on mount
  useEffect(() => {
    if (!orderId) return;

    const duration = 2000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 70,
        origin: { x: 0 },
      });

      confetti({
        particleCount: 4,
        angle: 120,
        spread: 70,
        origin: { x: 1 },
      });

      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  }, [orderId]);

  // 🔁 Auto redirect after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/orders");
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  if (!orderId)
    return <div className="text-center p-10 text-red-600">Invalid Order</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex flex-col items-center px-4">
      
      {/* SUCCESS ICON */}
      <div className="mt-16 mb-6">
        <CheckCircle2 className="w-20 h-20 text-green-600" />
      </div>

      <h1 className="text-3xl font-semibold text-neutral-800">
        Order Placed Successfully!
      </h1>

      <p className="text-neutral-600 mt-2">
        Redirecting to your orders in <span className="font-bold">5 seconds...</span>
      </p>

      <p className="text-neutral-600 mt-1">
        Order ID: <span className="font-medium">#{orderId}</span>
      </p>

      {/* CTA Buttons */}
      <div className="flex gap-3 mt-6">
        <button
          onClick={() => router.push("/orders")}
          className="px-5 py-2 rounded-lg bg-black text-white hover:bg-black/90 transition"
        >
          View All Orders
        </button>

        <button
          onClick={() => router.push(`/orders/${orderId}`)}
          className="px-5 py-2 rounded-lg border border-neutral-300 hover:bg-neutral-100 transition"
        >
          View Details
        </button>
      </div>

      {/* Loading */}
      {isLoading && <p className="mt-10 text-neutral-500">Fetching order…</p>}

      {/* Order Summary */}
      {!isLoading && order && (
        <div className="mt-10 w-full max-w-xl rounded-2xl bg-white shadow-sm border p-6">
          <h2 className="text-xl font-semibold mb-4">
            Services Booked
          </h2>

          <div className="space-y-4">
            {order.items.map((item: any) => (
              <div key={item.id} className="flex items-center gap-4 border-b pb-4 last:border-none">
                <div className="relative w-16 h-16 rounded-md overflow-hidden bg-neutral-100">
                  <Image
                    src={item.services.image}
                    alt={item.services.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1">
                  <p className="font-medium">{item.services.title}</p>
                  <p className="text-sm text-neutral-500">
                    {item.date} {item.timeSlot && `• ${item.timeSlot}`}
                  </p>
                </div>

                <p className="font-semibold">₹{item.price}</p>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="flex justify-between mt-4 pt-4 border-t">
            <p className="text-sm">Total</p>
            <p className="text-lg font-semibold">₹{order.totalAmount}</p>
          </div>
        </div>
      )}

      {/* Back Home */}
      <button
        onClick={() => router.push("/")}
        className="mt-10 text-blue-600 hover:underline font-medium"
      >
        Back to Home →
      </button>
    </div>
  );
}
