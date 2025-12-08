"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookingDialogButton } from "../cart/BookingDialog";

export default function ServiceCard({ service }: any) {
  // limit description to 15 words
  const shortenDescription = (text: string, limit = 15) => {
    const words = text.split(" ");
    return words.length > limit
      ? words.slice(0, limit).join(" ") + "..."
      : text;
  };

  return (
    <Card className="w-full border border-neutral-200/60 rounded-xl shadow-sm hover:shadow-md hover:border-neutral-300 transition-all duration-200 bg-white">
      <CardContent className="p-4 flex justify-between gap-4">
        {/* LEFT SECTION */}
        <div className="flex flex-col gap-2">
          <p className="text-[15px] font-semibold text-neutral-800 leading-tight">
            {service.title}
          </p>

          {/* Pricing Row */}
          <div className="text-sm flex items-center gap-2">

              ₹{service.price}

            <span className="text-neutral-500 text-xs">
              • {service.totalDuration}
            </span>
          </div>

          {/* Description */}
          <p className="text-xs text-neutral-600 w-[90%] leading-relaxed">
            {shortenDescription(service.description)}
          </p>

          <button className="text-xs text-neutral-700 hover:text-neutral-900 underline underline-offset-2 transition">
            View details
          </button>
        </div>

        {/* RIGHT IMAGE + BUTTON */}
        <div className="relative min-w-[110px] flex flex-col items-end">
          <Image
            src={service.image}
            alt={service.title}
            width={110}
            height={110}
            className="rounded-lg object-cover w-[110px] h-[110px] shadow-sm border border-neutral-200"
          />

          <div className="mt-2 w-full">
            <BookingDialogButton serviceId={service.id} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
