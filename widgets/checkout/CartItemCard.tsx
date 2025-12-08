"use client";

import React from "react";
import Image from "next/image";
import { Minus, Plus, Trash2, Loader2 } from "lucide-react";
import { CartItem } from "@/types/checkout";
import { formatPrice } from "@/utils/formatters";
import { cn } from "@/lib/utils";

interface CartItemCardProps {
  item: CartItem;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
  isUpdating?: boolean;
}

export const CartItemCard: React.FC<CartItemCardProps> = ({
  item,
  onUpdateQuantity,
  onRemove,
  isUpdating = false,
}) => {
  const imageSrc =
    typeof item.image === "string" && item.image.length > 0
      ? item.image
      : "/placeholder.png";

  return (
    <div
      className={cn(
        "flex gap-4 p-4 rounded-xl border bg-white transition-all",
        "hover:border-neutral-300",
        isUpdating && "opacity-50 pointer-events-none"
      )}
    >
      {/* IMAGE */}
      <div className="relative w-20 h-20 bg-neutral-100 rounded-md overflow-hidden">
        <Image
          src={item.image}
          alt={item.serviceName}
          fill
          className="object-cover"
          sizes="80px"
        />
      </div>

      {/* CONTENT */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-medium text-neutral-900 leading-tight">
            {item.serviceName}
          </h3>

          {item.variant && (
            <p className="text-sm text-neutral-500 mt-1">
              Variant: {item.variant}
            </p>
          )}

        
        </div>

        {/* QUANTITY + PRICE */}
        <div className="flex items-center justify-between mt-3">

          {/* Quantity Controls */}
          <div className="flex items-center gap-2">

            {/* - */}
            <button
              onClick={() =>
                onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))
              }
              disabled={isUpdating || item.quantity <= 1}
              className={cn(
                "w-8 h-8 rounded-md border flex items-center justify-center",
                "border-neutral-300 hover:bg-neutral-100",
                "disabled:opacity-50 disabled:cursor-not-allowed transition"
              )}
            >
              <Minus className="w-4 h-4 text-neutral-600" />
            </button>

            {/* Quantity */}
            <span className="font-medium w-8 text-center text-neutral-800">
              {isUpdating ? (
                <Loader2 className="w-4 h-4 animate-spin mx-auto text-neutral-500" />
              ) : (
                item.quantity
              )}
            </span>

            {/* + */}
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              disabled={isUpdating || item.quantity >= item.stock}
              className={cn(
                "w-8 h-8 rounded-md border flex items-center justify-center",
                "border-neutral-300 hover:bg-neutral-100",
                "disabled:opacity-50 disabled:cursor-not-allowed transition"
              )}
            >
              <Plus className="w-4 h-4 text-neutral-600" />
            </button>
          </div>

          {/* PRICE + DELETE */}
          <div className="flex items-center gap-4">
            <span className="font-semibold text-neutral-900">
              {formatPrice(item.servicePrice * item.quantity)}
            </span>

            <button
              onClick={() => onRemove(item.serviceId)}
              disabled={isUpdating}
              className="text-neutral-500 hover:text-red-600 transition-colors disabled:opacity-50"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
