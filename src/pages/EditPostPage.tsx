import PostForm from "../components/PostForm";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Post } from "../types/types";
import Loading from "../components/Loading";


export default function EditPostPage() {
  const { id } = useParams<{ id: string }>(); 
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
   const fetchPost = async () => {
      try {
        setPost(await fetch(`${import.meta.env.VITE_API_URL_BASE}/posts/${id}`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        }).then(res => res.json()));
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
   };

   fetchPost();
 }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (!post) {
    return <p>Post not found</p>;
  }

  return (
    <div>
      <h1>Edit Post</h1>
      <PostForm mode="edit" post={post} />
    </div>
  );
}
