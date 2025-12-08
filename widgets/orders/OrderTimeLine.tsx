"use client";

import { Check, Clock, Package, Truck, Home } from "lucide-react";
import { cn } from "@/lib/utils";

const states = [
  { key: "pending", label: "Order Placed", icon: Clock },
  { key: "confirmed", label: "Confirmed", icon: Check },
  { key: "shipped", label: "Shipped", icon: Truck },
  { key: "out_for_delivery", label: "Out for Delivery", icon: Package },
  { key: "delivered", label: "Delivered", icon: Home },
];

export default function OrderTimeline({ status }: { status: string }) {
  const currentIndex = states.findIndex((s) => s.key === status);

  return (
    <div className="flex items-center justify-between mt-6 mb-8">
      {states.map((step, i) => {
        const Icon = step.icon;
        const completed = i <= currentIndex;

        return (
          <div key={i} className="flex-1 flex flex-col items-center relative">
            {/* Circle */}
            <div
              className={cn(
                "w-9 h-9 rounded-full border flex items-center justify-center transition-all",
                completed
                  ? "bg-black text-white border-black"
                  : "bg-neutral-100 text-neutral-500 border-neutral-300"
              )}
            >
              <Icon className="w-4 h-4" />
            </div>

            {/* label */}
            <span
              className={cn(
                "text-xs mt-2 font-medium",
                completed ? "text-neutral-900" : "text-neutral-400"
              )}
            >
              {step.label}
            </span>

            {/* connector */}
            {i < states.length - 1 && (
              <div className="absolute top-4 left-1/2 w-full">
                <div className="w-full h-[2px] bg-neutral-200">
                  <div
                    className={cn(
                      "h-full bg-black transition-all duration-500",
                      completed ? "w-full" : "w-0"
                    )}
                  />
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
