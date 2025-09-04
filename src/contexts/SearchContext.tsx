import { createContext, useState } from "react";
import type { ReactNode } from "react";
import type { Post, User } from "../types/types";

interface SearchContextType {
  searchResults: Post[] | null;
  setSearchResults: React.Dispatch<React.SetStateAction<Post[] | null>>;
  searchAuthorsResults: User[] | null;
  setSearchAuthorsResults: React.Dispatch<React.SetStateAction<User[] | null>>;
  isLoadingSearch: boolean;
  setIsLoadingSearch: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SearchContext = createContext<SearchContextType>({
  searchResults: null,
  setSearchResults: () => {},
  searchAuthorsResults: null,
  setSearchAuthorsResults: () => {},
  isLoadingSearch: false,
  setIsLoadingSearch: () => {},
});

export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchResults, setSearchResults] = useState<Post[] | null>(null);
 const [searchAuthorsResults, setSearchAuthorsResults] = useState<User[] | null>(null);
 const [isLoadingSearch, setIsLoadingSearch] = useState(false);


  return (
    <SearchContext.Provider value={{ searchResults, setSearchResults, searchAuthorsResults, setSearchAuthorsResults, isLoadingSearch, setIsLoadingSearch }}>
      {children}
    </SearchContext.Provider>
  );
}