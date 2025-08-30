export default function NewComment({ postId, userId, setComments, postComments }: { postId: number; userId: number; setComments: React.Dispatch<React.SetStateAction<any[]>>; postCo: any }) {


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const content = (e.target as any).content.value;
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL_BASE}/comments`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({ content, postId, userId })
            
            });
            const newCommentsResponse = await fetch(`${import.meta.env.VITE_API_URL_BASE}/posts/${postId}/comments`);
            const newCommentsData = await newCommentsResponse.json();
            console.log("New Comment:", newCommentsData);
            setComments(newCommentsData);
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
