// service/rental.ts

"use server";

import { cookies } from "next/headers";

async function getAuthAndBaseUrl() {
  const cookieStore = await cookies();
  const token =
    cookieStore.get("accessToken")?.value || cookieStore.get("token")?.value;

  const baseUrl = process.env.BACKEND_API_URL || "http://localhost:5000/api";

  const cleanBaseUrl = baseUrl.replace(/\/$/, "");

  return { token, cleanBaseUrl };
}

export async function getMyRentalsAction() {
  try {
    const { token, cleanBaseUrl } = await getAuthAndBaseUrl();

    const res = await fetch(`${cleanBaseUrl}/rentals`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: data?.message || "Failed to fetch rental orders",
      };
    }

    return data;
  } catch (error: any) {
    console.error("Get my rentals error:", error);
    return {
      success: false,
      message: error?.message || "Rental service unavailable",
    };
  }
}

export async function createRentalAction(rentalData: any) {
  try {
    const { token, cleanBaseUrl } = await getAuthAndBaseUrl();

    const res = await fetch(`${cleanBaseUrl}/rentals`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify(rentalData),
      cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: data?.message || "Failed to create rental order",
      };
    }

    return data;
  } catch (error: any) {
    console.error("Create rental error:", error);
    return {
      success: false,
      message: error?.message || "Failed to submit rental request",
    };
  }
}

export { createRentalAction as createRentalBookingAction };

export async function createPaymentCheckoutAction(rentalId: string) {
  try {
    const { token, cleanBaseUrl } = await getAuthAndBaseUrl();

    const res = await fetch(`${cleanBaseUrl}/rentals/${rentalId}/pay`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: data?.message || "Failed to initialize payment",
      };
    }

    return data;
  } catch (error: any) {
    console.error("Payment checkout error:", error);
    return {
      success: false,
      message: error?.message || "Payment service unavailable",
    };
  }
}
