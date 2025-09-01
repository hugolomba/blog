import type { Post } from "../types/types";
import { FaHeart, FaRegHeart, FaRegBookmark, FaBookmark} from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import { useAuth } from "../contexts/authContext";
import { useState } from "react";
import AuthorDetails from "./AuthorDetails";
import { Link, useNavigate } from "react-router-dom";

export default function Article({ post }: { post: Post }) {
    const { user } = useAuth(); 
      const [likes, setLikes] = useState(post.likes.map((like: any) => like.userId)); // Array of user IDs who liked the post
      const [bookmarks, setBookmarks] = useState(post.savedBy.map((bookmark: any) => bookmark.userId)); // Array of user IDs who bookmarked the post
      const [isDialogOpen, setIsDialogOpen] = useState(false);
      const navigate = useNavigate();

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

    const handlePostDelete = async () => {
      
   

      try {
        await fetch(`${import.meta.env.VITE_API_URL_BASE}/posts/${post.id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        });
        console.log("Post deleted successfully");
      } catch (error) {
        console.error("Error deleting post:", error);
      } finally {
        setIsDialogOpen(false);
        navigate("/");
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

                    <span className="font-bold">by {post.author.name === user?.name ? "You" : `${post.author.name} ${post.author.surname}`} </span>
                    {/* {post.author.id === user?.id ? (<span>Editar</span> "Apagar")} */}
                    <span className="text-gray-500">{timeAgo(post.createdAt)}</span>
                    </div>
                </div>
            {post.author.id === user?.id && (
                <div className="flex mt-4 items-center gap-2">
                   <Link to={`/post/${post.id}/edit`} className="bg-blue-500 text-white rounded hover:bg-blue-600 flex flex-row items-center gap-1 px-1 py-1">
                        Edit <MdEdit />
                    </Link>
                    <button onClick={() => setIsDialogOpen(true)} className="bg-red-500 text-white rounded hover:bg-red-600 flex flex-row items-center gap-1 px-1 py-1">
                        Delete <MdDelete />
                    </button>
                    <ConfirmationDialog
                        isOpen={isDialogOpen}
                        onClose={() => setIsDialogOpen(false)}
                        onConfirm={handlePostDelete}
                    />
                </div>
            )}
                <div className="prose prose-base max-w-none mt-6" dangerouslySetInnerHTML={{ __html: post.content }} />

            <AuthorDetails author={post.author} />
            </article>
    )
}

function ConfirmationDialog({ isOpen, onClose, onConfirm }: { isOpen: boolean; onClose: () => void; onConfirm: () => void }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black opacity-50" onClick={onClose} />
            <div className="bg-white rounded shadow-lg p-4 z-10">
                <h2 className="text-lg font-bold mb-2">Confirm Deletion</h2>
                <p>Are you sure you want to delete this post?</p>
                <div className="mt-4 flex justify-end">
                    <button onClick={onClose} className="bg-gray-300 text-gray-700 rounded px-4 py-2 mr-2">
                        Cancel
                    </button>
                    <button onClick={onConfirm} className="bg-red-500 text-white rounded px-4 py-2">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}