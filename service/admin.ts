"use server";

import { cookies } from "next/headers";

const API_BASE_URL = process.env.BACKEND_API_URL|| "http://localhost:5000/api";

async function getAuthHeader() {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  return {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  };
}

export async function getAllUsersAction() {
  try {
    const headers = await getAuthHeader();
    const res = await fetch(`${API_BASE_URL}/users`, {
      headers,
      cache: "no-store",
    });
    return await res.json();
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to fetch users" };
  }
}

export async function updateUserStatusAction(userId: string, status: string) {
  try {
    const headers = await getAuthHeader();
    const res = await fetch(`${API_BASE_URL}/users/${userId}/status`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ status }),
    });
    return await res.json();
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to update user status" };
  }
}

export async function getAdminMetricsAction() {
  try {
    const headers = await getAuthHeader();
    const res = await fetch(`${API_BASE_URL}/admin/metrics`, {
      headers,
      cache: "no-store",
    });
    return await res.json();
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to fetch admin metrics" };
  }
}