import Link from "next/link";

export default function PaymentCancelPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
      <h1 className="text-3xl font-bold text-red-600 mb-2">Payment Cancelled</h1>
      <p className="text-gray-600 mb-6">You cancelled the payment transaction.</p>
      <Link
        href="/dashboard/customer"
        className="bg-gray-800 text-white px-4 py-2 rounded-md font-medium"
      >
        Return to Dashboard
      </Link>
    </div>
  );
}