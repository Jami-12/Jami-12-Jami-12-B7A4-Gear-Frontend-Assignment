"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

// URL এর শেষে বাড়তি / থাকলে তা সরিয়ে সেফ URL তৈরি করা
const getBaseUrl = () => {
  const url =
    process.env.NEXT_PUBLIC_BACKEND_API_URL ||
    process.env.BACKEND_API_URL ||
    "http://localhost:5000/api";
  return url.replace(/\/$/, "");
};

const API_BASE_URL = getBaseUrl();

export async function loginAction(credentials: {
  email: string;
  password: string;
}) {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    const data = await res.json();

    if (data.success && data.data?.accessToken) {
      const cookieStore = await cookies();
      cookieStore.set("accessToken", data.data.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      });

      // 🔴 মূল সমাধান: লগইন করার পর পুরো Layout রিভ্যালিডেট করবে
      revalidatePath("/", "layout");
    }

    return data;
  } catch (error: any) {
    console.error("Login Action Error:", error);
    return { success: false, message: error.message || "Failed to login" };
  }
}

export async function registerAction(userData: {
  name: string;
  email: string;
  password: string;
  role: "CUSTOMER" | "PROVIDER";
}) {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    return await res.json();
  } catch (error: any) {
    console.error("Register Action Error:", error);
    return { success: false, message: error.message || "Failed to register" };
  }
}

export async function getMeAction() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      return { success: false, data: null };
    }

    const res = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      return { success: false, data: null };
    }

    const data = await res.json();
    return data;
  } catch (error: any) {
    console.error("GetMe Action Error:", error);
    return { success: false, data: null };
  }
}

export async function logoutAction() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("accessToken");

    revalidatePath("/", "layout");

    return { success: true };
  } catch (_error) {
    return { success: false };
  }
}