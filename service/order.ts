"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

const getBaseUrl = () => {
  const url =
    process.env.NEXT_PUBLIC_BACKEND_API_URL ||
    process.env.BACKEND_API_URL ||
    "http://localhost:5000/api";
  return url.replace(/\/$/, "");
};

// প্রোভাইডারের অর্ডার লিস্ট আনার ফাংশন
export async function getProviderOrdersAction() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      return { success: false, data: [] };
    }

    const res = await fetch(`${getBaseUrl()}/provider/orders`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) return { success: false, data: [] };

    return await res.json();
  } catch (error) {
    console.error("Get Orders Error:", error);
    return { success: false, data: [] };
  }
}

// অর্ডার স্ট্যাটাস আপডেট করার ফাংশন
export async function updateOrderStatusAction(orderId: string, status: string) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      return { success: false, message: "Unauthorized" };
    }

    const res = await fetch(`${getBaseUrl()}/orders/${orderId}/status`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ rentalStatus: status }),
    });

    const data = await res.json();

    if (data.success) {
      revalidatePath("/dashboard/provider/orders");
    }

    return data;
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to update status" };
  }
}