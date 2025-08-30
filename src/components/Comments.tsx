import { FaHeart, FaRegHeart } from "react-icons/fa";
import type { Post, AuthContextType } from "../types/types";
import type { JSX } from "react";
import { useAuth } from "../contexts/authContext";
import { useState, useEffect } from "react";
import { comment } from "postcss";


export default function Comments({ comments }: { comments: Post['comments'] }) {
    const user = useAuth() as AuthContextType | null;
    const [likes, setLikes] = useState<{ commentId: string; userIds: string[] }[]>([]);

    
    useEffect(() => {
        const initialLikes = comments.map(comment => ({
            commentId: comment.id.toString(),
            userIds: comment.likes.map((like: any) => like.userId)
        }));
        setLikes(initialLikes);
    }, [comments]);

    const handleLike = async (commentId: string) => {
        if (!user) return;

        try {
           
            await fetch(`${import.meta.env.VITE_API_URL_BASE}/comments/${commentId}/like`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });

        
            setLikes(prevLikes =>
                prevLikes.map(likeObj =>
                    likeObj.commentId === commentId
                        ? {
                              ...likeObj,
                              userIds: likeObj.userIds.includes(user.id)
                                  ? likeObj.userIds.filter(id => id !== user.id)
                                  : [...likeObj.userIds, user.id]
                          }
                        : likeObj
                )
            );

        } catch (error) {
            console.error("Error liking comment:", error);
        }
    };

    const handleLikeIcon = (commentId: string) => {
        if (!user) return null;
        const commentLikeObj = likes.find(likeObj => likeObj.commentId === commentId);
        const userHasLiked = commentLikeObj?.userIds.includes(user.id) ?? false;
        return userHasLiked
            ? <FaHeart onClick={() => handleLike(commentId)} className="text-red-500 text-lg cursor-pointer" />
            : <FaRegHeart onClick={() => handleLike(commentId)} className="text-lg cursor-pointer" />;
    };

    const getLikeCount = (commentId: string) => {
        const commentLikeObj = likes.find(likeObj => likeObj.commentId === commentId);
        return commentLikeObj?.userIds.length ?? 0;
    };

    return (
        <div className="mt-8 p-4">
            <h3 className="text-xl font-semibold">Comments ({comments.length})</h3>
            <div className="flex flex-col gap-4 mt-4">
                {
                    comments.map(comment => (
                        <CommentCard comment={comment} getLikeCount={getLikeCount} handleLikeIcon={handleLikeIcon} />
                    ))
                }
            </div>
        </div>
    );
}

function CommentCard({comment, getLikeCount, handleLikeIcon}: {comment: any, getLikeCount: (commentId: string) => number, handleLikeIcon: (commentId: string) => JSX.Element | null}) {

    return (
    
                    <div key={comment.id} className="flex flex-col border-b border-gray-300 pb-2">
                        <div className="text-gray-700 font-medium flex gap-2 items-center">
                            <img src={comment.author.avatarImage} alt={comment.author.name} className="inline-block w-10 h-10 object-cover rounded-full mr-2" />
                            <h4 className="text-lg font-semibold inline-block">{comment.author.name}</h4>
                        </div>
                        
                        <p className="text-gray-600 mt-4">{comment.content}</p>
                        <div className="text-gray-500 text-sm flex justify-between mt-2 mb-2">
                            <div className="text-gray-500 flex flex-row-reverse gap-2 items-center">
                                <span>{getLikeCount(comment.id.toString())}</span>
                                {handleLikeIcon(comment.id.toString())}
                            </div>
                            <span>Posted on: {new Date(comment.createdAt).toLocaleDateString()}</span>
                        </div>
                    </div>
    )
}