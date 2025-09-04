import { Link } from "react-router-dom";
import type { User } from "../types/types";

export default function SearchUserResultCard({ user }: { user: User }) {
  return (
    <Link to={`/profile/${user.id}`}>
      <div className="border-b border-gray-200 py-4 flex items-center justify-between">
        <img src={user.avatarImage} alt={`${user.name}'s avatar`} className="w-12 h-12 rounded-full mr-4" />
        <div>
          <h3 className="text-lg font-semibold">{user.name} {user.surname}</h3>
          <p className="text-sm text-gray-500">{user.bio}</p>
           <span>{user?.posts.length} posts</span> | <span>{user?.comments.length} comments</span>
    </div>

    </div>
    </Link>
  );
}
