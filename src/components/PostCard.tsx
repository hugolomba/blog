import type { Post } from "../types/types";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useAuth } from "../contexts/authContext";
import { useState } from "react";


export default function PostCard({ post }: { post: Post }) {
  const { user } = useAuth();
  const [likes, setLikes] = useState(post.likes.map(like => like.id)); // Array of user IDs who liked the post

  const handleLike = async () => {
    console.log("Like button clicked", post.id);
    try {
      // Call API to like the post
      await fetch(`${import.meta.env.VITE_API_URL_BASE}/posts/${post.id}/like`, {
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
    if (!user) return
    if (likes.includes(user.id)) {
      return <FaHeart className="text-red-500" />
    } else {
      return <FaRegHeart />
;
    }
  };

  return (
    <li className="bg-white rounded-2xl shadow-md p-4 mb-6 hover:shadow-lg transition">
      <img src={post.coverImage} alt={post.title} className="w-full h-42 object-cover rounded-md" />

      <div className="flex justify-between items-center mt-2 mb-1">
        <h3 className="text-lg font-semibold">{post.title}</h3>
        <div onClick={handleLike} className="text-gray-600 flex items-center gap-1 cursor-pointer">
          {user ? <span>{likes.length}</span> : <span>{`${post.likes.length} like${post.likes.length > 1 ? "s" : ""}`}</span>}
          {handleLikeIcon()}
        </div>
      </div>
      <p className="text-gray-600">{post.content}</p>
      
      <div className="flex justify-between mt-2 gap-6">
        <div className="text-sm text-gray-500">Published on: {new Date(post.createdAt).toLocaleDateString()}</div>
 
         <div className="text-gray-500 text-sm flex gap-2 align-center"> 
          <span>{post.author.name} </span>
          <img src={post.author.avatarImage} alt={post.author.name} className="inline-block w-4.5 h-4.5 rounded-full mr-2" />
         </div>
      </div>
    </li>
  );
}
