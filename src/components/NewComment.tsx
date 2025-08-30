export default function NewComment({ postId, userId, handleUpdateComments }: { postId: number; userId: number; handleUpdateComments: (newComment: any) => Promise<void> }) {




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
        <div>
            <h2>New Comment</h2>
            <form className="flex flex-col" onSubmit={handleSubmit}>
                <textarea name="content" placeholder="Write a comment..." className="w-full p-2 border border-gray-300 rounded-md" />
                <button type="submit" className="mt-2 bg-blue-500 text-white p-2 rounded-md">Post Comment</button>
            </form>
        </div>
    );
}
