"use client";

import { XCircle } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";

export default function OrderFailedPage() {
  const searchParams = useSearchParams();
  const reason = searchParams.get("reason") || "payment_failed";
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex flex-col items-center px-4">
      {/* FAILED ICON */}
      <div className="mt-16 mb-6">
        <XCircle className="w-20 h-20 text-red-600" />
      </div>

      <h1 className="text-3xl font-semibold text-red-700">Payment Failed</h1>

      <p className="text-neutral-600 mt-2">
        Reason: <span className="font-medium capitalize">{reason}</span>
      </p>

      <p className="text-neutral-600 mt-1">
        Try again or use another payment method.
      </p>

      {/* Buttons */}
      <div className="flex gap-3 mt-6">
        <button
          onClick={() => router.push("/checkout")}
          className="px-5 py-2 rounded-lg bg-black text-white hover:bg-black/90 transition"
        >
          Retry Payment
        </button>

        <button
          onClick={() => router.push("/")}
          className="px-5 py-2 rounded-lg border border-neutral-300 hover:bg-neutral-100 transition"
        >
          Go Home
        </button>
      </div>
    </div>
  );
}
