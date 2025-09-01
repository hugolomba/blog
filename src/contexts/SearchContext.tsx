import { createContext, useState } from "react";
import type { ReactNode } from "react";
import type { Post } from "../types/types";

interface SearchContextType {
  searchResults: Post[] | null;
  setSearchResults: React.Dispatch<React.SetStateAction<Post[] | null>>;
}

export const SearchContext = createContext<SearchContextType>({
  searchResults: null,
  setSearchResults: () => {}
});

export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchResults, setSearchResults] = useState<Post[] | null>(null);


  return (
    <SearchContext.Provider value={{ searchResults, setSearchResults }}>
      {children}
    </SearchContext.Provider>
  );
}