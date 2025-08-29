export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-64">
      <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin mb-4"></div>
      <p className="text-gray-600 text-lg font-medium">Loading...</p>
    </div>
  );
}