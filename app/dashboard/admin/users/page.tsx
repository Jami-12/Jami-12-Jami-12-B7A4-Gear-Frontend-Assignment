import { getAllUsersFromDB } from "@/service/user";
import { Users, Mail } from "lucide-react";

export default async function AdminUsersPage() {
  const fetchedUsers = await getAllUsersFromDB();
  const users = Array.isArray(fetchedUsers) ? fetchedUsers : [];

  return (
    <div className="w-full p-6 md:p-8 space-y-6">
      {/* Top Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
            Registered Users
          </h1>
          <p className="text-sm text-slate-500 mt-1 font-medium">
            Manage and view all registered system users and their assigned roles.
          </p>
        </div>
        <span className="text-xs font-bold bg-blue-50 text-blue-700 px-4 py-2 rounded-2xl border border-blue-100 w-fit">
          {users.length} Total Accounts
        </span>
      </div>

      {/* Users Table */}
      <div className="bg-white border border-slate-200/80 rounded-3xl shadow-sm overflow-hidden">
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-100/60 text-slate-500 font-bold uppercase text-[11px] tracking-wider">
              <tr>
                <th className="p-4 pl-6">User Name</th>
                <th className="p-4">Email Address</th>
                <th className="p-4">Role</th>
                <th className="p-4 pr-6">Account Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {users.length > 0 ? (
                users.map((u: any) => (
                  <tr key={u.id || u._id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4 pl-6 font-bold text-slate-900">
                      {u.name || "N/A"}
                    </td>
                    <td className="p-4 text-slate-600">
                      <span className="inline-flex items-center gap-1.5 break-all">
                        <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        {u.email}
                      </span>
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 text-[11px] font-bold rounded-xl uppercase tracking-wider ${
                          u.role === "ADMIN"
                            ? "bg-purple-100 text-purple-700 border border-purple-200"
                            : u.role === "PROVIDER"
                            ? "bg-amber-100 text-amber-700 border border-amber-200"
                            : "bg-blue-100 text-blue-700 border border-blue-200"
                        }`}
                      >
                        {u.role || "CUSTOMER"}
                      </span>
                    </td>
                    <td className="p-4 pr-6">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-emerald-700 bg-emerald-50 rounded-xl border border-emerald-100">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        {u.activeStatus || "ACTIVE"}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-12 text-center text-slate-400">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <Users className="w-8 h-8 text-slate-300" />
                      <p className="font-semibold text-slate-600">No users found</p>
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