import { FiSearch } from "react-icons/fi";
import { useAuth } from "../contexts/authContext";

export default function Header() {
  const { user } = useAuth();

  return (
    <header className="text-gray-800 p-4 m-2 rounded-xl">
      <h2 className="text-2xl text-center font-poppins">Welcome! {user ? user.name : ""} 👋🏻</h2>
      <h3 className="text-lg text-center font-poppins">Here you can find and search for articles.</h3>
      <form className="w-full flex items-center relative mt-4">
      <label htmlFor="search" className="sr-only">Search Articles</label>
      
      <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />

      <input
        type="text"
        id="search"
        placeholder="Search for articles or authors..."
        className="w-full pl-12 pr-4 py-4 rounded-xl bg-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {/* <button type="submit" className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md">Search</button> */}
    </form>
    </header>
  );
}
