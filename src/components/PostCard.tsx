import type { Post } from "../types/types";
import { FaHeart } from "react-icons/fa";


export default function PostCard({ post }: { post: Post }) {
  return (
    <li className="mb-4 p-4 border border-gray-200 rounded-lg">
      <img src={post.coverImage} alt={post.title} className="w-full h-42 object-cover rounded-md" />

      <div className="flex justify-between items-center mt-2 mb-1">
        <h3 className="text-lg font-semibold">{post.title}</h3>
        <div className="text-gray-600 flex items-center gap-1">
          
          <span>{post.likes.length}</span>
          <FaHeart className="text-red-500 text-xl"  /> 
          </div>
      </div>
      <p className="text-gray-600">{post.content}</p>
      
      <div className="flex justify-between mt-2 gap-6">
        <div className="text-sm text-gray-500">Published on: {new Date(post.createdAt).toLocaleDateString()}</div>
        {/* <div className="flex items-center gap-1 text-sm">
          <FaHeart className="text-red-500" /> <span className="text-gray-600 mr-2">{post.likes.length} </span>
        </div> */}
         <div className="text-gray-500 text-sm flex gap-2 align-center"> 
          <span>{post.author.name} </span>
          <img src={post.author.avatarImage} alt={post.author.name} className="inline-block w-4.5 h-4.5 rounded-full mr-2" />
         </div>
      </div>
    </li>
  );
}


