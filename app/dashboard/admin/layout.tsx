import Link from "next/link";
import { LayoutDashboard, Users, Package } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col p-4 border-r border-slate-800 shrink-0">
        <div className="p-4 font-black text-xl text-white flex items-center gap-2 border-b border-slate-800/80 mb-4">
          <LayoutDashboard className="w-6 h-6 text-blue-500" />
          <span>Admin Panel</span>
        </div>

        <nav className="flex flex-col gap-1.5 flex-1">
          <Link
            href="/dashboard/admin"
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 hover:text-white transition-all font-medium text-sm"
          >
            <LayoutDashboard className="w-4 h-4 text-blue-400" />
            Overview
          </Link>

          <Link
            href="/dashboard/admin/users"
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 hover:text-white transition-all font-medium text-sm"
          >
            <Users className="w-4 h-4 text-emerald-400" />
            Users
          </Link>

          <Link
            href="/dashboard/admin/rentals"
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 hover:text-white transition-all font-medium text-sm"
          >
            <Package className="w-4 h-4 text-purple-400" />
            Rental Orders
          </Link>
        </nav>
      </aside>

      {/* Main Dynamic Content Area */}
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}