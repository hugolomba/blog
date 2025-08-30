import { FaRegTrashAlt } from "react-icons/fa";
import type { User } from "../types/types";
import type { JSX } from "react";


export default function CommentCard({user, comment, getLikeCount, handleLikeIcon, handleUpdateComments}: {user: User | null, comment: any, getLikeCount: (commentId: string) => number, handleLikeIcon: (commentId: string) => JSX.Element | null, handleUpdateComments: (postId: number) => Promise<void>}) {

    const handleDeleteComment = async (commentId: number) => {
        try {
            await fetch(`${import.meta.env.VITE_API_URL_BASE}/comments/${commentId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });

            // Optionally, you can update the UI state to remove the deleted comment
            handleUpdateComments(comment.postId);
        } catch (error) {
            console.error("Error deleting comment:", error);
        }
    };

    return (
    
                    <div key={comment.id} className="flex flex-col border-b border-gray-300 pb-2 relative">
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
                        {comment.author.id === user?.id && <span onClick={() => handleDeleteComment(comment.id)} className="text-gray-500 text-lg absolute right-0 top-0 active:text-red-800 hover:text-red-600"><FaRegTrashAlt /></span>}
                    </div>
    )
}