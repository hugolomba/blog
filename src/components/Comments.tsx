import { FaHeart, FaRegHeart } from "react-icons/fa";
import type { Post, User, AuthContextType } from "../types/types";
import { useAuth } from "../contexts/authContext";
import { useState, useEffect } from "react";
import CommentCard from "./CommentCard";


export default function Comments({ comments, handleUpdateComments }: { comments: Post['comments']; handleUpdateComments: (postId: number) => Promise<void> }) {
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
                    comments.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map(comment => (
                        <CommentCard key={comment.id} user={user?.user} comment={comment} getLikeCount={getLikeCount} handleLikeIcon={handleLikeIcon} handleUpdateComments={handleUpdateComments} />
                    ))
                }
            </div>
        </div>
    );
}

