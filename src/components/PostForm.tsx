import { useState, useRef } from "react";
import RichTextEditor from "./../utils/RichTextEditor";
import { useAuth } from "../contexts/authContext";
import placeHolder from "../assets/images/placeholder-cover.svg"
import Loading from "./Loading";
import { Link } from "react-router-dom";

export default function PostForm() {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState(placeHolder);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [posted, setPosted] = useState(false);
  const [newPostId, setNewPostId] = useState<number | null>(null);

    const handleClick = () => {
    fileInputRef.current?.click();
  };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {

    
    e.preventDefault();
    
      const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
          if (coverImage) {
         formData.append("coverImage", coverImage);
          }
        formData.append("published", "true");
        formData.append("authorId", user.id);


    try {
      setIsLoading(true);

      const response = await fetch(`${import.meta.env.VITE_API_URL_BASE}/posts`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: formData,
      });

      const data = await response.json();
      console.log("Post created:", data);
      setNewPostId(data.id);

    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setIsLoading(false);
      setPosted(true);
      
    }

  };


  return (
    <div className="max-w-4xl mx-auto">
    {posted ? <PostCreated setPosted={setPosted} newPostId={newPostId} /> : (   
      <>
      <h2 className="text-2xl font-semibold">Create a New Post</h2>
      <hr className="my-4" />  
      <form onSubmit={handleSubmit} className="space-y-4 flex flex-col">
        <input
          type="text"
          placeholder="Title"
          value={title}
        onChange={e => setTitle(e.target.value)}
        className="border p-2 rounded w-full"
      />
       
      {fileName && <span className="text-sm text-gray-600">📎 {fileName}</span>}
     <div className="flex flex-col gap-2">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

   
      <button
        type="button"
        onClick={handleClick}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Upload File
      </button>


    </div>

      <RichTextEditor value={content} onChange={setContent} />
      {isLoading ? <Loading /> : (
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Publish Post
        </button>
      )}
    </form>
    </>
    )}
    </div>
  );
};

function PostFormContainer() {
  return (
    <div className="max-w-4xl mx-auto">
      <PostForm />
    </div>
  );
}

function PostCreated({ setPosted, newPostId }: { setPosted: (value: boolean) => void }) {
  return (
      <div className="bg-white p-4 rounded shadow-md flex flex-col items-center">
        <h2 className="text-2xl font-semibold">Post Created Successfully!</h2>
        <p className="text-lg">Your post has been published.</p>
       
          <Link to={`/post/${newPostId}`} className="mt-4 bg-gray-500 text-white px-4 py-2 rounded">
            View Post
          </Link>
            <button onClick={() => setPosted(false)} className="mt-4 bg-gray-500 text-white px-4 py-2 rounded">
              Create Another Post
            </button>

            <Link to="/dashboard" className="mt-4 bg-gray-500 text-white px-4 py-2 rounded">
              Go to Dashboard
            </Link>
        
      </div>

  );
}
