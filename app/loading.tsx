export default function Loading() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center space-y-4">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      <p className="text-sm font-medium text-gray-500">Loading GearUp....</p>
    </div>
  );
}