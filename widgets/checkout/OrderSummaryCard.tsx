"use client";

import React from "react";
import { Tag, Loader2 } from "lucide-react";
import { formatPrice } from "@/utils/formatters";
import { OrderSummary } from "@/types/checkout";
import { cn } from "@/lib/utils";

interface OrderSummaryCardProps {
  summary: OrderSummary;
  itemCount: number;
  onPlaceOrder: () => void;
  isPlacingOrder?: boolean;
}

export const OrderSummaryCard: React.FC<OrderSummaryCardProps> = ({
  summary,
  itemCount,
  onPlaceOrder,
  isPlacingOrder = false,
}) => {
  return (
    <div className="rounded-xl border bg-white p-5 sticky top-24">
      <h3 className="text-lg font-medium text-neutral-900 mb-4">
        Order Summary
      </h3>

      {/* Breakdown */}
      <div className="space-y-3 mb-4 text-sm">
        <div className="flex justify-between text-neutral-600">
          <span>Price ({itemCount} items)</span>
          <span>{formatPrice(summary.subtotal)}</span>
        </div>

        {summary.discount > 0 && (
          <div className="flex justify-between text-neutral-600">
            <span>Discount</span>
            <span className="text-red-600">-{formatPrice(summary.discount)}</span>
          </div>
        )}

        <div className="flex justify-between text-neutral-600">
          <span>Delivery Charges</span>
          <span
            className={cn(
              summary.deliveryCharges === 0 &&
                "text-green-600 font-medium text-sm"
            )}
          >
            {summary.deliveryCharges === 0
              ? "FREE"
              : formatPrice(summary.deliveryCharges)}
          </span>
        </div>

        {summary.processingFee > 0 && (
          <div className="flex justify-between text-neutral-600">
            <span>Processing Fee</span>
            <span>{formatPrice(summary.processingFee)}</span>
          </div>
        )}
      </div>

      {/* Total */}
      <div className="border-t border-neutral-200 pt-3 mb-4">
        <div className="flex justify-between text-base font-semibold text-neutral-900">
          <span>Total Amount</span>
          <span>{formatPrice(summary.total)}</span>
        </div>
      </div>

      {/* Discount Saved Box */}
      {summary.discount > 0 && (
        <div className="bg-neutral-100 border border-neutral-200 rounded-lg p-3 mb-4">
          <div className="flex items-center gap-2 text-neutral-700">
            <Tag className="w-4 h-4" />
            <span className="text-xs font-medium">
              You saved {formatPrice(summary.discount)} on this order
            </span>
          </div>
        </div>
      )}

      {/* Place Order Button */}
      <button
        onClick={onPlaceOrder}
        disabled={isPlacingOrder}
        className={cn(
          "w-full py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2",
          "bg-black text-white hover:bg-black/90",
          "disabled:opacity-50 disabled:cursor-not-allowed"
        )}
      >
        {isPlacingOrder ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Processing...
          </>
        ) : (
          "Place Order"
        )}
      </button>

      <p className="text-xs text-neutral-500 text-center mt-3">
        By placing your order, you agree to our Terms & Conditions.
      </p>
    </div>
  );
};
