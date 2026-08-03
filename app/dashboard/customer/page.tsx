"use client";

import { useEffect, useState } from "react";
import {
  getMyRentalsAction,
  createPaymentCheckoutAction,
} from "@/service/rental";

export default function CustomerDashboardPage() {
  const [rentals, setRentals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchRentals = async () => {
  //     try {
  //       setLoading(true);
  //       const res = await getMyRentalsAction();

  //       if (res?.success) {
  //         const list =
  //           (Array.isArray(res?.data) && res.data) ||
  //           (Array.isArray(res?.data?.data) && res.data.data) ||
  //           (Array.isArray(res?.data?.rentals) && res.data.rentals) ||
  //           (Array.isArray(res?.data?.result) && res.data.result) ||
  //           [];
  //         setRentals(list);
  //       } else if (
  //         res?.message === "Rental order not found." ||
  //         res?.message?.toLowerCase().includes("not found")
  //       ) {
  //         setRentals([]);
  //       } else {
  //         console.error("Failed to fetch rentals:", res?.message);
  //         setRentals([]);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching rentals:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchRentals();
  // }, []);


  // app/dashboard/customer/page.tsx

useEffect(() => {
  const fetchRentals = async () => {
    try {
      setLoading(true);
      const res = await getMyRentalsAction();

      if (res?.success) {
        const list =
          (Array.isArray(res?.data) && res.data) ||
          (Array.isArray(res?.data?.data) && res.data.data) ||
          (Array.isArray(res?.data?.rentals) && res.data.rentals) ||
          (Array.isArray(res?.data?.result) && res.data.result) ||
          [];
        setRentals(list);
      } else if (
        res?.message === "Rental order not found." ||
        res?.message?.toLowerCase().includes("not found")
      ) {
        setRentals([]);
      } else {
        console.error("Failed to fetch rentals:", res?.message);
        setRentals([]);
      }
    } catch (error) {
      console.error("Error fetching rentals:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchRentals();
}, []);
  const handlePay = async (rentalId: string) => {
    try {
      const res = await createPaymentCheckoutAction(rentalId);
      if (res?.success && res.data?.paymentUrl) {
        window.location.assign(res.data.paymentUrl);
      } else {
        alert(res?.message || "Failed to initialize payment session.");
      }
    } catch (err) {
      alert("Something went wrong with payment initialization.");
    }
  };

  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">My Rental Orders</h1>

      {loading ? (
        <div className="p-8 text-center text-gray-500">
          <p className="animate-pulse">Loading your rentals...</p>
        </div>
      ) : rentals.length === 0 ? (
        <div className="border rounded-xl p-8 bg-white text-center text-gray-500">
          You have no active or past rentals yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {rentals.map((r: any) => {
            const rentalId = r.id || r._id;
            const gear = r.gearItem || r.gear;

            return (
              <div
                key={rentalId}
                className="bg-white border rounded-xl p-6 shadow-sm space-y-4"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">
                      {gear?.name || "Equipment"}
                    </h3>
                    <p className="text-xs text-gray-500">
                      Brand: {gear?.brand || "N/A"}
                    </p>
                  </div>
                  <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                    {r.rentalStatus || r.status || "PENDING"}
                  </span>
                </div>

                <div className="text-sm text-gray-600 space-y-1">
                  <p>
                    Dates:{" "}
                    {r.startDate
                      ? new Date(r.startDate).toLocaleDateString()
                      : "N/A"}{" "}
                    -{" "}
                    {r.endDate
                      ? new Date(r.endDate).toLocaleDateString()
                      : "N/A"}
                  </p>
                  <p className="font-bold text-gray-900 text-base">
                    Total Amount: ${r.totalAmount || r.price || 0}
                  </p>
                </div>

                {(r.rentalStatus === "PENDING" || r.status === "PENDING") && (
                  <button
                    onClick={() => handlePay(rentalId)}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 rounded-lg transition text-sm cursor-pointer"
                  >
                    Pay Now with Stripe
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}