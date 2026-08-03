import Link from "next/link";
import { Store, PlusCircle, Package } from "lucide-react";

export default function ProviderLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <aside className="w-64 bg-white border-r p-6 space-y-6 flex-shrink-0">
        <div className="flex items-center gap-2 font-bold text-xl text-gray-900">
          <Store className="text-blue-600" /> Provider Portal
        </div>
        <nav className="space-y-2">
          <Link href="/dashboard/provider" className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-100 text-sm font-medium text-gray-700">
            <Package className="w-4 h-4 text-gray-500" /> My Gear Listings
          </Link>
          <Link href="/dashboard/provider/gear/new" className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-100 text-sm font-medium text-gray-700">
            <PlusCircle className="w-4 h-4 text-gray-500" /> Add New Gear
          </Link>
        </nav>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </div>
  );
}