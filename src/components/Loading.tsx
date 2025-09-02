import deleting from "../assets/images/delete.gif"

export default function Loading({ type = "loading" }: { type?: "loading" | "delete" }) {
  return (
    <div className="flex flex-col items-center justify-center h-64">


      {type === "delete" && (
        <>
          <p className="text-gray-600 text-lg font-medium mb-4">Deleting...</p>
          <img src={deleting} alt="Deleting..." className="w-12 h-12" />
        </>
      )}

      <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin mb-4"></div>
      <p className="text-gray-600 text-lg font-medium">Loading...</p>
    </div>
  );
}