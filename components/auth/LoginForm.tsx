"use client";

import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { loginAction } from "@/service/auth";

interface DecodedToken {
  role?: string;
  userRole?: string;
  [key: string]: any;
}

export function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await loginAction(formData);

      if (res?.success && res?.data?.accessToken) {
        const token = res.data.accessToken;

        const decoded: DecodedToken = jwtDecode(token);
        const role = decoded?.role || decoded?.userRole;

        if (role === "ADMIN") {
          window.location.href = "/dashboard/admin";
        } else if (role === "PROVIDER") {
          window.location.href = "/dashboard/provider";
        } else if (role === "CUSTOMER") {
          window.location.href = "/dashboard/customer";
        } else {
          alert(`Role not found in JWT Token! Decoded data: ${JSON.stringify(decoded)}`);
          window.location.href = "/";
        }
      } else {
        alert(res?.message || "Invalid email or password");
      }
    } catch (error: any) {
      alert("Something went wrong during login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
        <input
          type="email"
          required
          placeholder="name@example.com"
          className="w-full rounded-lg border p-2.5 text-sm outline-none focus:border-blue-600 text-black"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <input
          type="password"
          required
          placeholder="••••••••"
          className="w-full rounded-lg border p-2.5 text-sm outline-none focus:border-blue-600 text-black"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition disabled:opacity-50 cursor-pointer"
      >
        {loading ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
}