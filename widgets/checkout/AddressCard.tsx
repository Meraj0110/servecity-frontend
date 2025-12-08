"use client";

import React from "react";
import { Home, Briefcase, Check } from "lucide-react";
import { Address } from "@/types/checkout";
import { cn } from "@/lib/utils";

interface AddressCardProps {
  address: Address;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export const AddressCard: React.FC<AddressCardProps> = ({
  address,
  isSelected,
  onSelect,
}) => {
  return (
    <div
      onClick={() => onSelect(address.id)}
      className={cn(
        "cursor-pointer rounded-xl border bg-white p-4 transition-all",
        "hover:border-neutral-300",
        "flex items-start justify-between",
        isSelected &&
          "border-black shadow-sm ring-1 ring-black/10 hover:border-black"
      )}
    >
      <div className="flex items-start gap-4">

        {/* Icon */}
        <div
          className={cn(
            "p-2 rounded-lg",
            address.type === "home"
              ? "bg-neutral-100 text-neutral-700"
              : "bg-neutral-100 text-neutral-700"
          )}
        >
          {address.type === "home" ? (
            <Home className="w-5 h-5" />
          ) : (
            <Briefcase className="w-5 h-5" />
          )}
        </div>

        {/* Info Block */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h3 className="font-medium text-neutral-900">
              {address.fullName}
            </h3>

            {address.isDefault && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-neutral-200 text-neutral-700">
                Default
              </span>
            )}
          </div>

          <p className="text-sm text-neutral-600">{address.phone}</p>

          <p className="text-sm text-neutral-700">
            {address.roadStreet}
            {address.city && `, ${address.city}`}
          </p>

          <p className="text-sm text-neutral-700">
            {address.city}, {address.state} – {address.pinCode}
          </p>
        </div>
      </div>

      {/* Checkmark */}
      {isSelected && (
        <div className="mt-1">
          <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center">
            <Check className="w-4 h-4 text-white" />
          </div>
        </div>
      )}
    </div>
  );
};
