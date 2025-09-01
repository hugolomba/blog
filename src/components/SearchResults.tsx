import PostCard from "./PostCard";
import type { SearchResultsProps } from "../types/types";
import { SearchContext } from "../contexts/SearchContext";
import { useContext } from "react";



export default function SearchResults({ searchResults }: SearchResultsProps) {
  const { setSearchResults } = useContext(SearchContext);
  return (
    <section className="mx-5 flex flex-col relative">
      <button className="px-2 py-1 bg-red-500 text-white rounded absolute top-0 right-0 text-xs" onClick={() => setSearchResults(null)}>
        Clear Search
      </button>
      <h2 className="text-xl font-poppins">Search Results</h2>
      <ul className="mt-4">
        {searchResults.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </ul>
    </section>
  );
}
