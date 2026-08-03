import Link from "next/link";
import {
  Users,
  ShoppingBag,
  DollarSign,
  ShieldCheck,
  Package,
  UserCheck,
  ArrowUpRight,
} from "lucide-react";
import { getAllRentalsFromDB, getAllUsersFromDB } from "@/service/user";

export default async function AdminDashboardPage() {
  const [fetchedUsers, fetchedRentals] = await Promise.all([
    getAllUsersFromDB(),
    getAllRentalsFromDB(),
  ]);

  const users = Array.isArray(fetchedUsers) ? fetchedUsers : [];
  const rentals = Array.isArray(fetchedRentals) ? fetchedRentals : [];

  // মোট আয় হিসাব
  const totalEarnings = rentals.reduce((sum: number, item: any) => {
    const status = item?.status || item?.rentalStatus;
    if (status !== "CANCELLED" && status !== "REJECTED") {
      return sum + Number(item?.totalAmount || item?.price || 0);
    }
    return sum;
  }, 0);

  return (
    <div className="w-full min-h-screen bg-slate-50/50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
              Admin Overview
            </h1>
            <p className="text-sm text-slate-500 mt-1 font-medium">
              Quick insights and navigation for platform metrics.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-2xl text-xs font-bold border border-emerald-200 w-fit">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            System Live & Connected
          </div>
        </div>

        {/* Dynamic Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white border border-slate-200/80 p-6 rounded-3xl shadow-sm">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Total Registered Users
              </span>
              <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                <Users className="w-5 h-5" />
              </div>
            </div>
            <h3 className="text-3xl font-black text-slate-900 mt-4">
              {users.length}
            </h3>
            <p className="text-xs text-slate-400 mt-1 font-medium">
              All accounts in DB
            </p>
          </div>

          <div className="bg-white border border-slate-200/80 p-6 rounded-3xl shadow-sm">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Rental Orders
              </span>
              <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl">
                <ShoppingBag className="w-5 h-5" />
              </div>
            </div>
            <h3 className="text-3xl font-black text-slate-900 mt-4">
              {rentals.length}
            </h3>
            <p className="text-xs text-slate-400 mt-1 font-medium">
              Gear booking transactions
            </p>
          </div>

          <div className="bg-white border border-slate-200/80 p-6 rounded-3xl shadow-sm">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Total Rental Revenue
              </span>
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
                <DollarSign className="w-5 h-5" />
              </div>
            </div>
            <h3 className="text-3xl font-black text-emerald-600 mt-4">
              ${totalEarnings.toLocaleString()}
            </h3>
            <p className="text-xs text-slate-400 mt-1 font-medium">
              Calculated rental volume
            </p>
          </div>

          <div className="bg-white border border-slate-200/80 p-6 rounded-3xl shadow-sm">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Security Mode
              </span>
              <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl">
                <ShieldCheck className="w-5 h-5" />
              </div>
            </div>
            <h3 className="text-2xl font-black text-slate-900 mt-4">
              ACTIVE
            </h3>
            <p className="text-xs text-slate-400 mt-1 font-medium">
              Admin clearance
            </p>
          </div>
        </div>

        {/* Quick Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/dashboard/admin/users"
            className="group bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm hover:border-blue-300 hover:shadow-md transition-all flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <UserCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg">Manage Users</h3>
                <p className="text-xs text-slate-500">
                  View and manage {users.length} registered accounts
                </p>
              </div>
            </div>
            <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 transition-colors" />
          </Link>

          <Link
            href="/dashboard/admin/rentals"
            className="group bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm hover:border-purple-300 hover:shadow-md transition-all flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="p-4 bg-purple-50 text-purple-600 rounded-2xl group-hover:bg-purple-600 group-hover:text-white transition-colors">
                <Package className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg">Manage Rental Orders</h3>
                <p className="text-xs text-slate-500">
                  Monitor {rentals.length} active and past bookings
                </p>
              </div>
            </div>
            <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-purple-600 transition-colors" />
          </Link>
        </div>

      </div>
    </div>
  );
}