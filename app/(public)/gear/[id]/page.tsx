"use client";

import { useEffect, useState, use } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Calendar, Tag } from "lucide-react";
import { createRentalBookingAction } from "@/service/rental";

export default function GearDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const [gear, setGear] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_API ||
      process.env.NEXT_PUBLIC_BACKEND_API ||
      "http://localhost:5000/api";

    fetch(`${baseUrl.replace(/\/$/, "")}/gear/${resolvedParams.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setGear(data.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [resolvedParams.id]);

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (new Date(startDate) >= new Date(endDate)) {
      setError("End Date must be after Start Date.");
      return;
    }

    setSubmitting(true);

    // 🎯 gearId এবং gearItemId দুটোই পাস করা হয়েছে যাতে ব্যাকএন্ড যেকোনো একটি গ্রহণ করতে পারে
    const payload = {
      gearId: resolvedParams.id,
      gearItemId: resolvedParams.id,
      startDate,
      endDate,
    };

    const res = await createRentalBookingAction(payload);
    setSubmitting(false);

    console.log("Create Rental Booking Response:", res); // Debug log

    if (res?.success) {
      alert("Rental order created! Redirecting to your dashboard...");
      router.push("/dashboard/customer");
    } else {
      // ❌ ব্যাকএন্ড থেকে এরর আসলে সরাসরি স্ক্রিনে সেই এররটি দেখাবে
      setError(
        res?.message || "Failed to create booking. Please check backend response."
      );
    }
  };

  if (loading)
    return (
      <div className="p-12 text-center text-gray-500">
        Loading equipment details...
      </div>
    );
  if (!gear)
    return (
      <div className="p-12 text-center text-red-500">Equipment not found.</div>
    );

  return (
    <div className="container mx-auto px-6 py-10 max-w-5xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white border rounded-2xl p-6 md:p-8 shadow-sm">
        <div className="relative h-80 md:h-full min-h-[300px] rounded-xl overflow-hidden bg-gray-100 border">
          <Image
            src={
              gear.imageUrl ||
              "https://images.unsplash.com/photo-1517649763962-0c623266cfc0"
            }
            alt={gear.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold bg-blue-100 text-blue-800 px-2.5 py-1 rounded-full uppercase">
                {gear.brand}
              </span>
              <span className="text-xs font-medium text-gray-500 flex items-center gap-1">
                <Tag className="w-3 h-3" /> Stock: {gear.availableStock}
              </span>
            </div>

            <h1 className="text-3xl font-bold text-gray-900">{gear.name}</h1>
            <p className="text-gray-600 mt-3 text-sm leading-relaxed">
              {gear.description}
            </p>

            <div className="mt-6 p-4 bg-slate-50 border rounded-lg flex items-center justify-between">
              <span className="text-gray-600 text-sm">Daily Rental Rate</span>
              <span className="text-2xl font-extrabold text-blue-600">
                ${gear.dailyRate}{" "}
                <span className="text-sm text-gray-500 font-normal">/ day</span>
              </span>
            </div>
          </div>

          <form onSubmit={handleBooking} className="border-t pt-4 space-y-4">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-600" /> Select Rental
              Duration
            </h3>

            {error && (
              <div className="text-xs text-red-600 bg-red-50 p-3 rounded border border-red-200">
                {error}
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  required
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full border rounded p-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  required
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full border rounded p-2 text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting || gear.availableStock <= 0}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50"
            >
              {submitting
                ? "Placing Booking..."
                : gear.availableStock > 0
                ? "Rent Equipment Now"
                : "Out of Stock"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}