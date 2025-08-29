import { FiSearch } from "react-icons/fi";

export default function NotLoggedGreeting() {
  return (
    <section className="text-center py-8 px-4">
      <h2 className="text-3xl font-bold mb-3">Start your blog today ✨</h2>
      <p className="text-gray-600 mb-6">
        Create your space, share ideas, and inspire people all over the world.
      </p>
      <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow hover:scale-105 transition">
        Create your account now
      </button>
      <h3 className="text-center text-gray-600 mb-4">Feel free to explore and enjoy reading!</h3>
      <form className="w-full flex items-center relative mt-4">
      <label htmlFor="search" className="sr-only">Search Articles</label>
      <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        id="search"
        placeholder="Search for articles or authors..."
        className="w-full pl-12 pr-4 py-4 rounded-xl bg-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </form>
    </section>
  );
}
