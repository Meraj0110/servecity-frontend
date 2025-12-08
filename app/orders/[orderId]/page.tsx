"use client";

import { useParams } from "next/navigation";
import { useGetOrderDetails } from "@/hooks/orders/useGetOrderDetails";
import OrderTimeline from "@/widgets/orders/OrderTimeLine"

import WorkerCard from "@/widgets/orders/WorkerCard";
import AddressCard from "@/widgets/orders/AddressCard";
import ServiceItemCard from "@/widgets/orders/ServiceItemCard";

export default function OrderDetailsPage() {
  const { orderId } = useParams();
  const { data: order, isLoading } = useGetOrderDetails(orderId as string);

  if (isLoading)
    return <div className="p-6 text-center text-neutral-500">Loading…</div>;

  if (!order)
    return <div className="p-6 text-center text-red-500">Order not found</div>;

  const items = order.items || [];

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Order #{order.id}</h1>
        <p className="text-sm text-neutral-500">
          {new Date(order.created_at).toLocaleString()}
        </p>
      </div>

      {/* Timeline */}
      <OrderTimeline status={order.orderStatus} />

      {/* Services */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Services</h2>

        {items.map((item: any) => (
          <ServiceItemCard key={item.id} item={item} />
        ))}
      </div>

      {/* Worker Info */}
      {items.some((item) => item.workers) && (
        <div>
          <h2 className="text-lg font-semibold">Assigned Worker</h2>
          <WorkerCard worker={items.find((x) => x.workers)?.workers} />
        </div>
      )}

      {/* Address */}
      <div>
        <h2 className="text-lg font-semibold">Service Address</h2>
        <AddressCard address={order.addresses} />
      </div>

      {/* Payment Summary */}
      <div className="p-4 rounded-xl bg-neutral-50 border">
        <h2 className="text-lg font-semibold mb-2">Payment Summary</h2>

        <div className="flex justify-between text-sm">
          <span>Subtotal</span>
          <span>₹{order.totalAmount}</span>
        </div>

        <div className="flex justify-between text-sm mt-1">
          <span>Discount</span>
          <span>₹0</span>
        </div>

        <div className="flex justify-between text-base font-semibold mt-3 border-t pt-3">
          <span>Total Amount</span>
          <span>₹{order.totalAmount}</span>
        </div>
      </div>
    </div>
  );
}
