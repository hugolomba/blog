import { Link } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="p-4">
      <h1 className="text-3xl text-center font-bold mb-8">Dashboard</h1>


      <div className="mt-4 flex flex-col items-center gap-2 ">
        <Link to="/post/create" className="bg-blue-500 text-white px-4 py-2 rounded">Create New Post</Link>
        <Link to="/profile/posts" className="bg-blue-500 text-white px-4 py-2 rounded">View All Posts</Link>
        <Link to={`/profile/${user?.id}`} className="bg-blue-500 text-white px-4 py-2 rounded">View Profile</Link>
        <Link to="/settings" className="bg-blue-500 text-white px-4 py-2 rounded">Settings</Link>
      </div>
   
    </div>
  );
}
