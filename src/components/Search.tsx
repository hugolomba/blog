import axios from "axios";
import { useContext, useState } from "react";
import { FiSearch } from "react-icons/fi"
import { SearchContext } from "../contexts/SearchContext";

export default function Search() {
  const [query, setQuery] = useState("");
  const { setSearchResults, searchResults, searchAuthorsResults, setSearchAuthorsResults } = useContext(SearchContext);


  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setSearchResults([])
    try {
      
        const postResults = await axios.get(`${import.meta.env.VITE_API_URL_BASE}/posts/search?q=${query}`);
        setSearchResults(postResults.data);
        console.log("Search results set in context:", searchResults);
        console.log("Search results");

        const authorResults = await axios.get(`${import.meta.env.VITE_API_URL_BASE}/users/search?q=${query}`);
        console.log("Search results:", authorResults.data, "query:", query);
        setSearchAuthorsResults(authorResults.data);
        console.log("Search results set in context:", searchAuthorsResults);

      // setQuery("");


    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <form className="w-full flex items-center relative mt-1.5" onSubmit={handleSearch}>
     
      <label htmlFor="search" className="sr-only">Search Articles</label>
      <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        id="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for articles or authors..."
        className="w-full pl-12 pr-4 py-3 rounded-xl bg-blue-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

    </form>
    )
}