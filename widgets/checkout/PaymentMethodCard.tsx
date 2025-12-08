"use client";

import React from "react";
import { Check } from "lucide-react";
import { PaymentMethod } from "@/types/checkout";
import { formatPrice } from "@/utils/formatters";
import { cn } from "@/lib/utils";

interface PaymentMethodCardProps {
  method: PaymentMethod;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export const PaymentMethodCard: React.FC<PaymentMethodCardProps> = ({
  method,
  isSelected,
  onSelect,
}) => {
  return (
    <div
      onClick={() => onSelect(method.id)}
      className={cn(
        "cursor-pointer rounded-xl border bg-white p-4 flex items-center justify-between transition-all",
        "hover:border-neutral-300",
        isSelected && "border-black ring-1 ring-black/10 shadow-sm"
      )}
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl">{method.icon}</span>

        <div className="flex flex-col">
          <span className="font-medium text-neutral-900">{method.label}</span>

          {method.processingFee > 0 && (
            <span className="text-xs text-neutral-500">
              + {formatPrice(method.processingFee)} processing fee
            </span>
          )}
        </div>
      </div>

      {isSelected && (
        <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center">
          <Check className="w-4 h-4 text-white" />
        </div>
      )}
    </div>
  );
};
