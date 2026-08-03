import { cookies } from "next/headers";

const getAuthHeaders = async () => {
  const cookieStore = await cookies();
  const token =
    cookieStore.get("accessToken")?.value || cookieStore.get("token")?.value;

  return {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  };
};

const getBaseUrl = () => {
  const url = process.env.BACKEND_API_URL || "http://localhost:5000/api";
  return url.replace(/\/$/, "");
};

export async function getAllUsersFromDB() {
  try {
    const headers = await getAuthHeaders();
    // 🎯 /users এর বদলে /auth/users ব্যবহার করা হয়েছে
    const res = await fetch(`${getBaseUrl()}/auth/users`, {
      method: "GET",
      headers,
      cache: "no-store",
    });

    const data = await res.json();
    if (!res.ok) return [];

    return Array.isArray(data?.data) ? data.data : data?.data?.result || [];
  } catch (error) {
    console.error("Get Users Error:", error);
    return [];
  }
}

export async function getAllRentalsFromDB() {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${getBaseUrl()}/rentals`, {
      method: "GET",
      headers,
      cache: "no-store",
    });

    const data = await res.json();
    if (!res.ok) return [];

    return Array.isArray(data?.data) ? data.data : data?.data?.result || [];
  } catch (error) {
    console.error("Get Rentals Error:", error);
    return [];
  }
}

