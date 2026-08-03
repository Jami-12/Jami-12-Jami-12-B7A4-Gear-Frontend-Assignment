import Link from "next/link";
import { User, ShoppingBag, Compass } from "lucide-react";

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <aside className="w-64 bg-white border-r p-6 space-y-6 flex-shrink-0">
        <div className="flex items-center gap-2 font-bold text-xl text-gray-900">
          <User className="text-blue-600" /> Customer Area
        </div>
        <nav className="space-y-2">
          <Link href="/dashboard/customer" className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-100 text-sm font-medium text-gray-700">
            <ShoppingBag className="w-4 h-4 text-gray-500" /> My Rental Orders
          </Link>
          <Link href="/gear" className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-100 text-sm font-medium text-gray-700">
            <Compass className="w-4 h-4 text-gray-500" /> Explore Gear
          </Link>
        </nav>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </div>
  );
}