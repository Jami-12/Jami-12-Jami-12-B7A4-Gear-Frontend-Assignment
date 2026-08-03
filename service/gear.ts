"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

const getBaseUrl = () => {
  const url =
    process.env.BACKEND_API_URL ||
    "http://localhost:5000/api";
  return url.replace(/\/$/, "");
};

export async function createGearAction(gearData: any) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      return { success: false, message: "Unauthorized: No token provided" };
    }

    const res = await fetch(`${getBaseUrl()}/gear`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(gearData),
    });

    const data = await res.json();

    if (data.success) {
      revalidatePath("/dashboard/provider");
    }

    return data;
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to create gear" };
  }
}