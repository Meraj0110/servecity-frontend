"use client";

import Image from "next/image";
import { format } from "date-fns";

export default function ServiceItemCardUC({ item }: { item: any }) {
  return (
    <div className="border rounded-xl p-4 bg-white flex gap-4">
      {/* IMAGE */}
      <div className="relative w-20 h-20 rounded-md overflow-hidden bg-neutral-200">
        <Image
          src={item.services?.image}
          alt={item.services?.title}
          fill
          className="object-cover"
        />
      </div>

      {/* DETAILS */}
      <div className="flex-1">
        <p className="font-semibold">{item.services?.title}</p>
        <p className="text-sm text-neutral-500">
          {item.date && format(new Date(item.date), "dd MMM")} •{" "}
          {item.timeSlot || "No time"}
        </p>

        <p className="text-sm mt-1 text-neutral-700">₹{item.price}</p>

        <span
          className={`text-xs px-2 py-1 mt-2 inline-block rounded-full ${
            item.status === "assigned"
              ? "bg-blue-100 text-blue-700"
              : item.status === "in_progress"
              ? "bg-yellow-100 text-yellow-700"
              : item.status === "completed"
              ? "bg-green-100 text-green-700"
              : "bg-neutral-200 text-neutral-700"
          }`}
        >
          {item.status}
        </span>
      </div>
    </div>
  );
}
