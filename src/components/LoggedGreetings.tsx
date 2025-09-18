import { Link } from "react-router-dom";
import Search from "./Search";

export default function NotLoggedGreeting({user}: {user: {name: string}}) {
  return (
    <div className="text-center py-12 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl">
        <h2 className="text-3xl font-bold mb-3 ">Welcome back, {user.name} 👋</h2>
        <p className="mb-6 text-blue-100">
          Ready to share your ideas today?
        </p>
        <div className="flex flex-col items-center justify-center gap-4 ">
            <Link to="/post/create" className="px-4 py-2 bg-white text-blue-700 font-semibold rounded-xl shadow hover:scale-105 transition">
            Create new post
            </Link>
            <Link to="/dashboard" className="px-4 py-2 bg-white text-blue-700 font-semibold rounded-xl shadow hover:scale-105 transition">
            Dashboard
            </Link>
           <Search />
        </div>
        
        
      </div>
  );
}
