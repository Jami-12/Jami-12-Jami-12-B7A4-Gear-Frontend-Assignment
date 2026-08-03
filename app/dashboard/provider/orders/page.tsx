"use client";

import { useEffect, useState } from "react";
import { IRentalOrder } from "@/lib/types";
import { getProviderOrdersAction, updateOrderStatusAction } from "@/service/order"; // সার্ভিস ফাইলের সঠিক পাথ দিন

export default function ProviderOrdersPage() {
  const [orders, setOrders] = useState<IRentalOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      const res = await getProviderOrdersAction();
      if (res?.success && res?.data) {
        setOrders(res.data);
      }
      setLoading(false);
    }

    fetchOrders();
  }, []);

  const handleStatus = async (id: string, status: string) => {
    const res = await updateOrderStatusAction(id, status);
    if (res?.success) {
      setOrders((prev) =>
        prev.map((o) => (o.id === id ? { ...o, rentalStatus: status as any } : o))
      );
    } else {
      alert(res?.message || "Status update failed");
    }
  };

  return (
    <div className="p-6 space-y-4 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900">
        Manage Incoming Rental Orders
      </h1>

      {loading ? (
        <div className="py-8 text-center text-gray-500">Loading orders...</div>
      ) : orders.length === 0 ? (
        <div className="bg-white border rounded-xl p-8 text-center text-gray-500">
          No rental orders found.
        </div>
      ) : (
        <div className="border rounded-xl bg-white overflow-hidden shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="p-4 font-semibold text-gray-700">Gear</th>
                <th className="p-4 font-semibold text-gray-700">Status</th>
                <th className="p-4 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="p-4 font-medium text-gray-900">
                    {order.gearItem?.name || "N/A"}
                  </td>
                  <td className="p-4 font-semibold text-gray-800">
                    {order.rentalStatus}
                  </td>
                  <td className="p-4 space-x-2">
                    {order.rentalStatus === "PENDING" && (
                      <button
                        onClick={() => handleStatus(order.id, "CONFIRMED")}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer"
                      >
                        Confirm
                      </button>
                    )}
                    {order.rentalStatus === "PAID" && (
                      <button
                        onClick={() => handleStatus(order.id, "PICKED_UP")}
                        className="bg-amber-600 hover:bg-amber-700 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer"
                      >
                        Picked Up
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}