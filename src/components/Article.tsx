import type { Post } from "../types/types";
import { FaHeart, FaRegHeart, FaRegBookmark, FaBookmark} from "react-icons/fa";
import { useAuth } from "../contexts/authContext";
import { useState } from "react";
import AuthorDetails from "./AuthorDetails";

export default function Article({ post }: { post: Post }) {
    const { user } = useAuth(); 
      const [likes, setLikes] = useState(post.likes.map((like: any) => like.userId)); // Array of user IDs who liked the post
      const [bookmarks, setBookmarks] = useState(post.savedBy.map((bookmark: any) => bookmark.userId)); // Array of user IDs who bookmarked the post

    function timeAgo(dateString: string) {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    const intervals = [
        { label: 'year', seconds: 31536000 },
        { label: 'month', seconds: 2592000 },
        { label: 'day', seconds: 86400 },
        { label: 'hour', seconds: 3600 },
        { label: 'minute', seconds: 60 },
        { label: 'second', seconds: 1 }
    ];

    for (const interval of intervals) {
        const count = Math.floor(diffInSeconds / interval.seconds);
        if (count >= 1) {
            return `${count} ${interval.label}${count > 1 ? 's' : ''} ago`;
        }
    }

    return 'just now';
}

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

  const handleBookmark = async () => {
    if (!user) return;
    console.log("Bookmark button clicked", post.id);

    try {
      await fetch(`${import.meta.env.VITE_API_URL_BASE}/posts/${post.id}/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      });
      if (user &&!bookmarks.includes(user.id)) {
        setBookmarks([...bookmarks, user.id]);
      } else {
        setBookmarks(bookmarks.filter(id => id !== user.id));
      }
    } catch (error) {
      console.error("Error bookmarking post:", error);
    }
  };

    const handleBookmarkIcon = () => {
      if (!user) return null;
      if (bookmarks.includes(user.id)) {
        return <FaBookmark onClick={handleBookmark} className="text-blue-500" />
      } else {
        return <FaRegBookmark onClick={handleBookmark}/>
      }
    };
  
    const handleLikeIcon = () => {
      if (!user) return null;
      if (likes.includes(user.id)) {
        return <FaHeart onClick={handleLike} className="text-red-500" />
      } else {
        return <FaRegHeart onClick={handleLike} />;
      }
    };



    return (
        
            <article className="relative p-2.5">
                <img className="w-full h-48 object-cover" src={post.coverImage} alt="article cover image" />
                
                <div className="flex flex-col ">
                <div className="flex justify-between mt-4">
                    <h2 className="text-3xl font-bold">{post.title}</h2>

                    <div className="text-2xl text-gray-600 flex items-center gap-4 cursor-pointer">
                    {handleLikeIcon()}
                    {handleBookmarkIcon()}
                    
                    </div>
                </div>
                    <div className="text-gray-500 text-sm flex gap-2 align-center mt-1"> 
                            
                    {/* <img src={post.author.avatarImage} alt={post.author.name} className="inline-block w-4.5 h-4.5 rounded-full" /> */}

                    <span>by {post.author.name} </span>
                    <span className="text-gray-500">{timeAgo(post.createdAt)}</span>
                    </div>
                </div>

                <p className="text-gray-600 mt-6">{post.content}</p>

            <AuthorDetails author={post.author} />
            </article>
    )
}