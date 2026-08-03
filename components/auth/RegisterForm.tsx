"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerAction } from "@/service/auth";

export function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"CUSTOMER" | "PROVIDER">("CUSTOMER");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await registerAction({ name, email, password, role });
    setLoading(false);

    if (res.success) {
      alert("Registration successful! Please login.");
      router.push("/auth/login");
    } else {
      setError(res.message || "Failed to create account.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="rounded-lg bg-red-50 p-3 text-xs text-red-600 border border-red-200">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="John Doe"
          className="w-full rounded-lg border p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="user@example.com"
          className="w-full rounded-lg border p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="w-full rounded-lg border p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Account Role</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value as "CUSTOMER" | "PROVIDER")}
          className="w-full rounded-lg border p-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          <option value="CUSTOMER">Customer (Rent Sports Gear)</option>
          <option value="PROVIDER">Provider (List Equipment for Rent)</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg text-sm transition disabled:opacity-50"
      >
        {loading ? "Registering..." : "Create Account"}
      </button>
    </form>
  );
}