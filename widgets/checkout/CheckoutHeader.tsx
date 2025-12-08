"use client";

import React from "react";
import { ShoppingBag, Lock, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export const CheckoutHeader: React.FC = () => {
  const router = useRouter();

  return (
    <div className="sticky top-0 z-50 bg-white border-b">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">

          {/* LEFT */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className={cn(
                "p-2 rounded-md transition-colors",
                "hover:bg-neutral-100 active:bg-neutral-200"
              )}
            >
              <ArrowLeft className="w-5 h-5 text-neutral-700" />
            </button>

            <div className="flex items-center gap-2">
              <ShoppingBag className="w-6 h-6 text-neutral-800" />
              <h1 className="text-lg font-medium text-neutral-900">
                Checkout
              </h1>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-2 text-neutral-600">
            <Lock className="w-4 h-4" />
            <span className="text-sm">Secure Checkout</span>
          </div>
        </div>
      </div>
    </div>
  );
};
