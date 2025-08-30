import { useAuth } from "../contexts/authContext";
import { IoIosSend } from "react-icons/io";



export default function NewComment({ postId, userId, handleUpdateComments }: { postId: number; userId: number; handleUpdateComments: (newComment: any) => Promise<void> }) {
    const user = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const content = (e.target as any).content.value;
        try {
            await fetch(`${import.meta.env.VITE_API_URL_BASE}/comments`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({ content, postId, userId })
               
            });
            handleUpdateComments(postId);
        } catch (error) {
            console.error("Error creating comment:", error);
        }
    };

    return (
     <div className="p-4 flex items-center bg-gray-50 rounded-2xl m-2 space-x-4">
    <img 
        src={user.user?.avatarImage} 
        alt={user.user?.name} 
        className="w-12 h-12 object-cover rounded-full flex-shrink-0" 
    />
    <form className="flex flex-1 items-center gap-2" onSubmit={handleSubmit}>
        <textarea 
            name="content" 
            placeholder="Write a comment..." 
            className="flex-1 p-2 border border-gray-300 rounded-md resize-none"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-3xl flex-shrink-0">
            <IoIosSend />
        </button>
    </form>
</div>
    );
}
