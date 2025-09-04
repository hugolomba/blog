import PostCard from "./PostCard";
import type { SearchResultsProps } from "../types/types";
import { SearchContext } from "../contexts/SearchContext";
import { useContext, useState } from "react";
import SearchUserResultCard from "./SearchUserResultCard";
import Loading from "./Loading";



export default function SearchResults({ searchResults }: SearchResultsProps) {
  const { setSearchResults, searchAuthorsResults, isLoadingSearch } = useContext(SearchContext);
  const [searchType, setSearchType] = useState<"articles" | "authors">("articles");

  console.log("SearchResults component received searchResults:", searchResults);
  console.log("SearchResults component received searchAuthorsResults:", searchAuthorsResults);

  return (
    <section className="mx-5 flex flex-col">
      <h2 className="text-xl font-poppins">Search Results</h2>
      <div className=" top-0 right-0 flex justify-between space-x-2 text-xs relative">
        <div className="flex flex-row gap-1">
        <button
          className={`px-2 py-1 rounded border ${searchType === "articles" ? "bg-blue-500 text-white border-blue-500" : "bg-white text-black border-gray-300"}`}
          onClick={() => setSearchType("articles")}
        >
          Articles
        </button>
        <button
          className={`px-2 py-1 rounded border ${searchType === "authors" ? "bg-blue-500 text-white border-blue-500" : "bg-white text-black border-gray-300"}`}
          onClick={() => setSearchType("authors")}
        >
          Authors
        </button>
        </div>
          <button className="px-2 py-1 bg-red-500 text-white rounded" onClick={() => setSearchResults(null)}>
          Clear Search
        </button>
      </div>

      

      {isLoadingSearch ? <Loading /> : searchType === "articles" ? (
        <ul className="mt-4">
        {searchResults.map((post) => (
          <PostCard key={post.id} post={post} />
        
        ))}
      </ul>
      ) : (
        <ul className="mt-4">
        {searchAuthorsResults && searchAuthorsResults.map((author) => (
          <SearchUserResultCard key={author.id} user={author} />
        ))}
      </ul>
      )}

      
    </section>
  );
}
