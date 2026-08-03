import { getAllRentalsFromDB } from "@/service/user";
import { Package } from "lucide-react";

// Ensure Next.js renders this dynamic server page properly
export const dynamic = "force-dynamic";

export default async function AdminRentalsPage() {
  let rentals: any[] = [];

  try {
    const fetchedRentals = await getAllRentalsFromDB();

    // API Response Object নাকি Direct Array তা হ্যান্ডেল করার লজিক
    if (Array.isArray(fetchedRentals)) {
      rentals = fetchedRentals;
    } else if (fetchedRentals && Array.isArray((fetchedRentals as any).data)) {
      rentals = (fetchedRentals as any).data;
    } else if (fetchedRentals && Array.isArray((fetchedRentals as any).result)) {
      rentals = (fetchedRentals as any).result;
    } else if (fetchedRentals && Array.isArray((fetchedRentals as any).rentals)) {
      rentals = (fetchedRentals as any).rentals;
    }
  } catch (error) {
    console.error("Error fetching rentals in AdminRentalsPage:", error);
    rentals = [];
  }

  return (
    <div className="w-full p-6 md:p-8 space-y-6">
      {/* Top Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
            Rental Orders
          </h1>
          <p className="text-sm text-slate-500 mt-1 font-medium">
            Monitor and process gear rentals and customer transactions.
          </p>
        </div>
        <span className="text-xs font-bold bg-purple-50 text-purple-700 px-4 py-2 rounded-2xl border border-purple-100 w-fit">
          {rentals.length} Total Bookings
        </span>
      </div>

      {/* Rentals Table */}
      <div className="bg-white border border-slate-200/80 rounded-3xl shadow-sm overflow-hidden">
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-100/60 text-slate-500 font-bold uppercase text-[11px] tracking-wider">
              <tr>
                <th className="p-4 pl-6">Equipment Item</th>
                <th className="p-4">Customer Email</th>
                <th className="p-4">Amount</th>
                <th className="p-4 pr-6">Rental Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {rentals.length > 0 ? (
                rentals.map((r: any, idx: number) => {
                  const itemId = r?.id || r?._id || `rental-${idx}`;
                  const itemName = r?.gearItem?.name || r?.gear?.name || r?.itemName || "Equipment";
                  const customerEmail = r?.customer?.email || r?.user?.email || r?.email || "Customer";
                  const amount = r?.totalAmount ?? r?.price ?? 0;
                  const status = r?.rentalStatus || r?.status || "PENDING";

                  const isCompleted = status === "COMPLETED";
                  const isApproved = status === "APPROVED";

                  return (
                    <tr key={itemId} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-4 pl-6 font-bold text-slate-900">
                        {itemName}
                      </td>
                      <td className="p-4 text-slate-600">
                        {customerEmail}
                      </td>
                      <td className="p-4 font-black text-emerald-600">
                        ${amount}
                      </td>
                      <td className="p-4 pr-6">
                        <span
                          className={`px-3 py-1 text-[11px] font-bold rounded-xl border ${
                            isCompleted
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                              : isApproved
                              ? "bg-blue-50 text-blue-700 border-blue-200"
                              : "bg-slate-100 text-slate-700 border-slate-200"
                          }`}
                        >
                          {status}
                        </span>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={4} className="p-12 text-center text-slate-400">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <Package className="w-8 h-8 text-slate-300" />
                      <p className="font-semibold text-slate-600">
                        No rental bookings available
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}