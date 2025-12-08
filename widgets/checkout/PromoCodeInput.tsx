"use client";

import React, { useState } from "react";
import { Tag, X, Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
// import { validatePromoCode } from "@/lib/api/checkout";

import { cn } from "@/lib/utils";
import { useCheckoutStore } from "@/store/checkout-store";
import { validatePromoCode } from "@/lib/api/checkout";

export const PromoCodeInput: React.FC = () => {
  const [promoCode, setPromoCode] = useState("");
  const { appliedPromoCode, setAppliedPromoCode } = useCheckoutStore();

  const { mutate: applyPromo, isPending } = useMutation({
    mutationFn: validatePromoCode,
    onSuccess: (data) => {
      if (data) {
        setAppliedPromoCode(data);
        setPromoCode("");
      } else {
        alert("Invalid promo code");
      }
    },
  });

  const handleRemove = () => {
    setAppliedPromoCode(null);
  };

  /* -------------------------------
      APPLIED PROMO STATE
  ------------------------------- */
  if (appliedPromoCode) {
    return (
      <div className="rounded-xl border bg-white p-4 mb-6">
        <div className="flex items-center justify-between bg-neutral-100 border border-neutral-200 rounded-lg p-3">
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-neutral-700" />
            <div>
              <p className="font-medium text-neutral-900">
                {appliedPromoCode.code}
              </p>
              <p className="text-xs text-neutral-600">
                {appliedPromoCode.type === "percentage"
                  ? `${appliedPromoCode.discount}% off`
                  : `₹${appliedPromoCode.discount} off`}
              </p>
            </div>
          </div>

          <button
            onClick={handleRemove}
            className="text-neutral-500 hover:text-red-600 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  /* -------------------------------
      EMPTY PROMO INPUT STATE
  ------------------------------- */
  return (
    <div className="rounded-xl border bg-white p-4 mb-6">
      <div className="flex gap-3">
        {/* Input with icon */}
        <div className="flex-1 relative">
          <Tag className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />

          <input
            type="text"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
            placeholder="Enter promo code"
            className={cn(
              "w-full pl-10 pr-4 py-2 rounded-lg border",
              "border-neutral-300 focus:border-black focus:ring-0",
              "text-sm text-neutral-800 placeholder-neutral-400"
            )}
          />
        </div>

        {/* Apply button */}
        <button
          onClick={() => applyPromo(promoCode)}
          disabled={!promoCode.trim() || isPending}
          className={cn(
            "px-6 py-2 rounded-lg font-medium text-sm transition-all flex items-center gap-2",
            "bg-black text-white hover:bg-black/90",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
        >
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Applying...
            </>
          ) : (
            "Apply"
          )}
        </button>
      </div>

      <p className="text-xs text-neutral-500 mt-2">
        Try: SAVE10, FLAT500, MEGA20
      </p>
    </div>
  );
};
