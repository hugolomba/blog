import { FaHeart, FaRegHeart } from "react-icons/fa";
import type { Post } from "../types/types";
import { useAuth } from "../contexts/authContext";
import { useState } from "react";


export default function Comments({ comments }: { comments: Post['comments'] }) {
    const user = useAuth();
    const [likes, setLikes] = useState(comments.map((comment) => comment.likes.map((like: any) => like.userId)).flat());

      const handleLike = async () => {
    console.log("Like button clicked", comments.id);
    try {
      // Call API to like the post
      await fetch(`${import.meta.env.VITE_API_URL_BASE}/posts/${comment.id}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      });
      if (user && !likes.includes(user.id)) {
        setLikes([...likes, user.id]);
      } else if (user) {
        setLikes(likes.filter(id => id !== user.id));
      }
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

    const handleLikeIcon = () => {
      if (!user) return null;
      if (likes.includes(user.id)) {
        return <FaHeart onClick={handleLike} className="text-red-500 text-lg" />
      } else {
        return <FaRegHeart onClick={handleLike} className="text-lg" />;
      }
    };

    return (
        <div className="mt-8 p-4">
            <h3 className="text-xl font-semibold">Comments ({comments.length})</h3>
            <div className="flex flex-col gap-4 mt-4">
                {comments.map(comment => (
                    <div key={comment.id} className="flex flex-col border-b border-gray-300">
                        <div className="text-gray-700 font-medium flex gap-2 items-center">
                            <img src={comment.author.avatarImage} alt={comment.author.name} className="inline-block w-10 h-10 object-cover rounded-full mr-2" />
                            <h4 className="text-lg text-semibold inline-block">{comment.author.name}</h4>
                        </div>
                        
                        <p className="text-gray-600 mt-4">{comment.content}</p>
                        <div className="text-gray-500 text-sm flex justify-between mt-2 mb-2">
                            <div className="text-gray-500 flex flex-row-reverse gap-2 items-center">
                                {user ? <span>{comment.likes.length}</span> : <span>{`${comment.likes.length} like${comment.likes.length > 1 ? "s" : ""}`}</span>}
                                {handleLikeIcon()}
                            </div>
                            
                            Posted on: {new Date(comment.createdAt).toLocaleDateString()}
                            
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
