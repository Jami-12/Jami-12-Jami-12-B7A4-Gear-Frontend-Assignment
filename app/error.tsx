"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center space-y-4 text-center px-4">
      <AlertTriangle className="h-12 w-12 text-red-500" />
      <h2 className="text-2xl font-bold text-gray-800">Something went wrong!</h2>
      <p className="text-sm text-gray-500 max-w-md">
        An unexpected error occurred while processing your request. Please try again.
      </p>
      <button
        onClick={() => reset()}
        className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition"
      >
        Try Again
      </button>
    </div>
  );
}