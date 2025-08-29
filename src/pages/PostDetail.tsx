import { useParams } from "react-router-dom";
import Article from "../components/Article";
import { useEffect, useState } from "react";
import type { Post } from "../types/types";
import Loading from "../components/Loading";




export default function PostDetail() {
    const { id } = useParams();
    const [post, setPost] = useState<Post | null>(null);

    useEffect(() => {
        
        const fetchPost = async () => {
            const response = await fetch(`${import.meta.env.VITE_API_URL_BASE}/posts/${id}`, {
                headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
            });

            const data = await response.json();
            setPost(data);
            console.log("Fetched post:", data);
        };
        fetchPost();
    }, []);


  return (
    <div className="">
        {post ? <Article post={post} /> : <Loading />} 
    </div>
  );
}
