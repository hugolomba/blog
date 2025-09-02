
import { useContext, useEffect, useState } from "react";
import Header from "../components/Hero";
import axios from "axios";
import type { Post } from "../types/types";
import RecentPosts from "../components/RecentPosts";
import { SearchContext } from "../contexts/SearchContext";
import SearchResults from "../components/SearchResults";

export default function HomePage() {
    const [publishedPosts, setPublishedPosts] = useState<Post[]>([]);
    const { searchResults } = useContext(SearchContext);



    useEffect(() => {
        const fetchPublishedPosts = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL_BASE}/posts/published`);
                const responseSorted = response.data.sort((a: Post, b: Post) => {
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                });
                setPublishedPosts(responseSorted);
            } catch (error) {
                console.error("Error fetching published posts:", error);
            }
        };
        fetchPublishedPosts();
    }, []);

  return (
    <div>
      <Header />
      {searchResults ? <SearchResults searchResults={searchResults} /> : <RecentPosts publishedPosts={publishedPosts} />}
    </div>
  );
}   
