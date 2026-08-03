import Link from "next/link";
import { PlusCircle, Package, ShoppingBag } from "lucide-react";

export default function ProviderDashboardPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Provider Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your rental equipment listings and incoming orders.
          </p>
        </div>

        <Link
          href="/dashboard/provider/gear/new"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2.5 rounded-lg text-sm transition shadow-sm"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add New Gear</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white border rounded-xl p-5 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              Total Equipment
            </p>
            <h3 className="text-2xl font-bold text-gray-900 mt-0.5">0</h3>
          </div>
        </div>

        <div className="bg-white border rounded-xl p-5 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-green-50 text-green-600 rounded-lg">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              Active Rentals
            </p>
            <h3 className="text-2xl font-bold text-gray-900 mt-0.5">0</h3>
          </div>
        </div>
      </div>

      <div className="bg-white border rounded-xl p-8 text-center shadow-sm">
        <p className="text-gray-500 text-sm">
          Your equipment list will appear here once loaded.
        </p>
      </div>
    </div>
  );
}