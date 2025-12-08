"use client";

import React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCheckoutStore } from "@/store/checkout-store";

interface ProgressStepsProps {
  currentStep: number;
}

const steps = ["Cart", "Address", "Payment", "Review"];

export const ProgressSteps: React.FC<ProgressStepsProps> = ({
  currentStep,
}) => {
  const { setStep } = useCheckoutStore();

  const handleClick = (index: number) => {
    // ❗ Prevent jumping ahead without completing previous steps
    if (index <= currentStep) setStep(index);
  };

  return (
    <div className="rounded-xl border bg-white p-5 mb-6">
      <div className="relative flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;

          return (
            <React.Fragment key={index}>
              {/* Each Step */}
              <div className="flex flex-col items-center flex-1">
                <button
                  onClick={() => handleClick(index)}
                  className={cn(
                    "w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium transition-all",
                    "border group cursor-pointer",
                    isCompleted && "bg-black text-white border-black",
                    isActive &&
                      "bg-neutral-900 text-white border-neutral-900 shadow-sm",
                    !isCompleted &&
                      !isActive &&
                      "bg-neutral-100 text-neutral-500 border-neutral-300",
                    "hover:border-neutral-500"
                  )}
                >
                  {isCompleted ? <Check className="w-4 h-4" /> : index + 1}
                </button>

                <span
                  className={cn(
                    "mt-2 text-xs transition-colors font-medium",
                    isCompleted || isActive
                      ? "text-neutral-900"
                      : "text-neutral-400 group-hover:text-neutral-600"
                  )}
                >
                  {step}
                </span>
              </div>

              {/* Animated line connector */}
              {index < steps.length - 1 && (
                <div className="flex-1 flex items-center">
                  <div className="relative w-full h-[2px] bg-neutral-200 rounded-full overflow-hidden">
                    <div
                      className={cn(
                        "absolute left-0 top-0 h-full bg-black rounded-full transition-all duration-500",
                        isCompleted ? "w-full" : "w-0"
                      )}
                    />
                  </div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
