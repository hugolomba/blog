import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="p-4">
      <button onClick={() => navigate(-1)} className="text-lg font-bold ml-2 cursor-pointer">← Back</button>
      <h1 className="text-2xl font-bold text-center">Dashboard</h1>
      <p className="mt-2 text-center">Welcome to your dashboard!</p>

      <div className="mt-4 flex flex-col items-center gap-2 ">
        <Link to="/post/create" className="bg-blue-500 text-white px-4 py-2 rounded">Create New Post</Link>
        <Link to="/profile/posts" className="bg-blue-500 text-white px-4 py-2 rounded">View All Posts</Link>
        {/* <Link to="/profile/drafts" className="ml-4 text-blue-500 underline">View Drafts</Link>
        <Link to="/profile/saved" className="ml-4 text-blue-500 underline">View Saved Posts</Link>
        <Link to="/profile/liked" className="ml-4 text-blue-500 underline">View Liked Posts</Link> */}
        <Link to={`/profile/${user.id}`} className="bg-blue-500 text-white px-4 py-2 rounded">View Profile</Link>
        <Link to="/settings" className="bg-blue-500 text-white px-4 py-2 rounded">Settings</Link>
      </div>
   
    </div>
  );
}
