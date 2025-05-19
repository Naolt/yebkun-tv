// context/SearchContext.tsx
"use client";

import React, { createContext, useContext, useState } from "react";

type SearchContextType = {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  recentSearches: string[];
  handleSearch: () => void;
  handleSearchFocus: () => void;
  addRecentSearch: (query: string) => void;
  removeRecentSearch: (query: string) => void;
  clearAllRecentSearches: () => void;
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  const handleSearch = () => {
    const trimmed = searchQuery.trim();
    if (!trimmed) return;
    addRecentSearch(trimmed);
    setSearchQuery("");
  };

  const addRecentSearch = (query: string) => {
    setRecentSearches((prev) =>
      prev.includes(query) ? prev : [query, ...prev.slice(0, 9)]
    );
  };

  const removeRecentSearch = (query: string) => {
    setRecentSearches((prev) => prev.filter((item) => item !== query));
  };

  const clearAllRecentSearches = () => {
    setRecentSearches([]);
  };

  const handleSearchFocus = () => {
    // Optional: track keyboard/show recent UI
  };

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        recentSearches,
        handleSearch,
        handleSearchFocus,
        addRecentSearch,
        removeRecentSearch,
        clearAllRecentSearches,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (!context)
    throw new Error("useSearchContext must be used inside SearchProvider");
  return context;
};
