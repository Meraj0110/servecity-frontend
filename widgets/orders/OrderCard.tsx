"use client";

import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const itemStatusColors: any = {
  unassigned: "bg-neutral-200 text-neutral-700",
  accepted: "bg-blue-100 text-blue-700",
  assigned: "bg-blue-100 text-blue-700",
  in_progress: "bg-yellow-100 text-yellow-800",
  done: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

export default function OrderCardUC({ order }: { order: any }) {
  const items = order.items || [];
  const previewItems = items.slice(0, 2);
  const remaining = items.length - 2;

  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm hover:border-neutral-300 transition">
      {/* ORDER HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-neutral-500">Order #{order.id}</p>
          <p className="text-xs text-neutral-500">
            {format(new Date(order.created_at), "dd MMM yyyy, hh:mm a")}
          </p>
        </div>

        <p className="text-sm font-medium text-neutral-800">
          {items.length} Services
        </p>
      </div>

      {/* SERVICE PREVIEW */}
      <div className="mt-4 flex items-start gap-4">
        {previewItems.map((item: any) => (
          <div
            key={item.id}
            className="border rounded-xl p-3 w-[130px] bg-neutral-50"
          >
            {/* STATUS BADGE */}
            <span
              className={cn(
                "px-2 py-1 text-[11px] font-medium rounded-full",
                itemStatusColors[item.status]
              )}
            >
              {item.status}
            </span>

            {/* SERVICE IMAGE */}
            <div className="relative w-full h-20 rounded-md bg-neutral-200 mt-2 overflow-hidden">
              <Image
                src={item.services?.image}
                alt={item.services?.title}
                fill
                className="object-cover"
              />
            </div>

            {/* TITLE */}
            <p className="text-sm font-medium mt-2">{item.services?.title}</p>

            {/* DATE & TIME */}
            <p className="text-xs text-neutral-500 mt-1">
              at {format(new Date(item.date), "dd MMM")} {item.timeSlot || ""}
            </p>
          </div>
        ))}

        {/* + MORE COUNT */}
        {remaining > 0 && (
          <div className="flex items-center justify-center text-sm text-neutral-600">
            + {remaining} more
          </div>
        )}
      </div>

      {/* FOOTER */}
      <div className="flex items-center justify-between mt-5 pt-4 border-t">
        <p className="text-sm text-neutral-700">
          Total:{" "}
          <span className="font-semibold text-neutral-900">
            ₹{order.totalAmount}
          </span>
        </p>

        <Link
          href={`/orders/${order.id}`}
          className="flex items-center gap-1 text-sm text-neutral-900 hover:underline"
        >
          View Details
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
