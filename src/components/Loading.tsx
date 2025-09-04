import deleting from "../assets/images/delete.gif"

export default function Loading({ type = "loading" }: { type?: "loading" | "delete" }) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-svh size-full">


      {type === "delete" && (
        <>
          <p className="text-gray-600 text-lg font-medium mb-4">Deleting...</p>
          <img src={deleting} alt="Deleting..." className="w-12 h-12" />
        </>
      )}

      <div className="w-20 h-20 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin mb-4"></div>
      <p className="text-gray-600 text-lg font-medium">Loading...</p>
    </div>
  );
}