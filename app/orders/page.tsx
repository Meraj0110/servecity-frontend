"use client";

import { useOrders } from "@/hooks/orders/useGetOrders";
import OrderCardUC from "@/widgets/orders/OrderCard";
import { Package } from "lucide-react";

export default function OrdersPage() {
  const { data, isLoading, isError } = useOrders();

  if (isLoading)
    return (
      <div className="p-6 text-center text-neutral-500">Loading orders…</div>
    );

  if (isError)
    return (
      <div className="p-6 text-center text-red-500">Failed to load orders</div>
    );

  const orders = data?.orders || [];

  if (orders.length === 0)
    return (
      <div className="p-6 text-center">
        <Package className="w-10 h-10 mx-auto text-neutral-400 mb-4" />
        <p className="text-neutral-700 text-lg font-medium">No orders found</p>
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold text-neutral-900">My Orders</h1>

      {orders.map((order: any) => (
        <OrderCardUC key={order.id} order={order} />
      ))}
    </div>
  );
}
