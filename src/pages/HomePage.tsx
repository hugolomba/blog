
import { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import type { Post } from "../types/types";
import RecentPosts from "../components/RecentPosts";

export default function HomePage() {
    const [publishedPosts, setPublishedPosts] = useState<Post[]>([]);

    console.log("Published Posts:", publishedPosts);

    useEffect(() => {
        const fetchPublishedPosts = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL_BASE}/posts/published`);
                setPublishedPosts(response.data);
            } catch (error) {
                console.error("Error fetching published posts:", error);
            }
        };
        fetchPublishedPosts();
    }, [publishedPosts]);

  return (
    <div>
      <Header />
      <RecentPosts publishedPosts={publishedPosts} />
    </div>
  );
}   
