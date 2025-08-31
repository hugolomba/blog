import PostForm from "../components/PostForm";

export default function NewPostPage() {
  return (
    <div className="p-4">
      <PostForm mode="create" />
    </div>
  );
}
