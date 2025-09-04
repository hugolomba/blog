import { useState, useRef, useEffect } from "react";
import RichTextEditor from "./../utils/RichTextEditor";
import { useAuth } from "../contexts/authContext";
import placeHolder from "../assets/images/placeholder-cover.svg";
import Loading from "./Loading";
import { Link } from "react-router-dom";

type PostType = {
  id: number;
  title: string;
  content: string;
  coverImage?: string;
};

type PostFormProps = {
  post?: PostType;
  mode?: "create" | "edit";
};

export default function PostForm({ post, mode = "create" }: PostFormProps) {
  const { user } = useAuth();
  const [title, setTitle] = useState(post?.title || "");
  const [content, setContent] = useState(post?.content || "");
  const [cover, setCover] = useState<File | string>(post?.coverImage || placeHolder);
  const [preview, setPreview] = useState<string | null>(post?.coverImage || null);
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [newPostId, setNewPostId] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
      setCover(post.coverImage || placeHolder);
      setPreview(post.coverImage || null);
      setNewPostId(post.id);
    }
  }, [post]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setCover(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

const removeCover = async () => {
  // convert placeholder image to file
  const response = await fetch(placeHolder);
  const blob = await response.blob();
  const fileFromPlaceholder = new File([blob], "placeholder-cover", { type: blob.type });
  setCover(fileFromPlaceholder);
  setPreview(null);
};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    // if (!preview || cover === placeHolder) formData.append("removeImage", "true");
    formData.append("coverImage", cover instanceof File ? cover : placeHolder);
    if (mode === "create" && user?.id !== undefined) {
  formData.append("authorId", String(user.id));
}

    try {
      setIsLoading(true);
      const url = mode === "edit" && post?.id
        ? `${import.meta.env.VITE_API_URL_BASE}/posts/${post.id}`
        : `${import.meta.env.VITE_API_URL_BASE}/posts`;
      const method = mode === "edit" ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` },
        body: formData,
      });
      const data = await res.json();
      if (mode === "create" && data.id) setNewPostId(data.id);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
      setSubmitted(true);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {submitted ? (
        <PostCreated
          setPosted={setSubmitted}
          newPostId={mode === "edit" ? post?.id : newPostId}
          mode={mode}
        />
      ) : isLoading ? (
        <Loading />
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 flex flex-col">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="border p-2 rounded w-full"
          />
          {preview && (
            <div className="flex flex-col gap-2">
              <img src={preview} alt="Cover Preview" className="w-full max-h-64 object-cover rounded" />
              <button type="button" onClick={removeCover} className="bg-red-500 text-white px-4 py-2 rounded">
                Remove Image
              </button>
            </div>
          )}
          <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
          <button type="button" onClick={() => fileInputRef.current?.click()} className="bg-blue-500 text-white px-4 py-2 rounded">
            Upload File
          </button>
          <RichTextEditor value={content} onChange={setContent} />
          
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
           {mode === "edit" ? "Update Post" : "Publish Post"}
          </button>
        </form>
      )}
    </div>
  );
}

function PostCreated({
  setPosted,
  newPostId,
  mode = "create",
}: {
  setPosted: (value: boolean) => void;
  newPostId?: number | null;
  mode?: "create" | "edit";
}) {
  return (
    <div className="bg-white p-4 rounded shadow-md flex flex-col items-center">
      <h2 className="text-2xl font-semibold">
        {mode === "edit" ? "Post Updated Successfully!" : "Post Created Successfully!"}
      </h2>
      <p className="text-lg">
        {mode === "edit"
          ? "Your post has been updated."
          : "Your post has been published."}
      </p>
      {newPostId ? (
        <Link
          to={`/post/${newPostId}`}
          className="mt-4 bg-gray-500 text-white px-4 py-2 rounded"
        >
          View Post
        </Link>
      ) : (
        <button
          disabled
          className="mt-4 bg-gray-300 text-white px-4 py-2 rounded cursor-not-allowed"
        >
          Loading Post...
        </button>
      )}
      <button
        onClick={() => setPosted(false)}
        className="mt-4 bg-gray-500 text-white px-4 py-2 rounded"
      >
        {mode === "edit" ? "Edit Again" : "Create Another Post"}
      </button>
      <Link
        to="/dashboard"
        className="mt-4 bg-gray-500 text-white px-4 py-2 rounded"
      >
        Go to Dashboard
      </Link>
    </div>
  );
}
