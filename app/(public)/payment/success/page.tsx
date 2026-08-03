import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function PaymentSuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
      <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
      <h1 className="text-3xl font-bold text-gray-800">Payment Successful!</h1>
      <p className="text-gray-600 mt-2 max-w-md">
        Your rental payment has been completed successfully. Your order is now confirmed.
      </p>
      <Link
        href="/dashboard/customer"
        className="mt-6 bg-blue-600 text-white px-6 py-2.5 rounded-md font-medium hover:bg-blue-700 transition"
      >
        Go to Customer Dashboard
      </Link>
    </div>
  );
}