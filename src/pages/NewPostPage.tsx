
import PostForm from "../components/PostForm";

export default function NewPostPage() {
  return (
    <div className="p-4">
     <h1 className="text-3xl text-center font-bold mb-8">Create New Post</h1>
      
      <PostForm mode="create" />
    </div>
  );
}
