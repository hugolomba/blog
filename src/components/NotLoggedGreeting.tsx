
import { Link } from "react-router-dom";
import Search from "./Search";

export default function NotLoggedGreeting() {
  return (
    <div className="text-center py-8 px-4">
      <h2 className="text-3xl font-bold mb-3">Start your blog today ✨</h2>
      <p className="text-gray-600 mb-5">
        Create your space, share ideas, and inspire people all over the world.
      </p>
      <Link to="/register" className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-3xl shadow hover:scale-105 transition">
        Create your account now
      </Link>
      <h3 className="text-center text-gray-600 mt-8">Feel free to explore and enjoy reading!</h3>
      <Search />
    </div>
  );
}
