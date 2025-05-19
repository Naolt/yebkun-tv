"use client";

import { useState } from "react";
import KeyboardComponent from "../component/gerandin/keyboard";
import ContentSection from "../component/gerandin/content-section";
import RecentSearches from "../component/gerandin/recent-searches";
import EditableRecentSearches from "../component/gerandin/editable-recent";
import { useSearchContext } from "@/context/SearchContext";

export default function SearchPage() {
  const {
    // searchQuery,
    setSearchQuery,
    recentSearches,
    handleSearch,
    removeRecentSearch,
    clearAllRecentSearches,
  } = useSearchContext();

  const [activeSection, setActiveSection] = useState<
    "menu" | "search" | "keyboard" | "recent" | "content"
  >("search");

  const handleKeyboardInput = (key: string) => {
    if (key === "backspace") {
      setSearchQuery((prev) => prev.slice(0, -1));
    } else if (key === "space") {
      setSearchQuery((prev) => prev + " ");
    } else if (key === "enter") {
      handleSearch();
    } else if (key === "clear") {
      setSearchQuery("");
    } else {
      setSearchQuery((prev) => prev + key);
    }
  };

  const handleRecentSearchClick = (query: string) => {
    setSearchQuery(query);
    setActiveSection("search")
    // handleSearch(); // Optional
  };

  return (
    <div className="flex flex-col w-full h-screen bg-white text-white mt-32">
      <div className="flex flex-1 px-4 mt-6">
        <div className="w-full flex flex-col gap-3">
          <div className="grid grid-cols-3 gap-3">
            <RecentSearches
              searches={recentSearches}
              onSearchClick={handleRecentSearchClick}
              onRemoveSearch={removeRecentSearch}
              onClearAll={clearAllRecentSearches}
              isActive={activeSection === "recent"}
            />

            <EditableRecentSearches
              searches={recentSearches}
              onSearchClick={handleRecentSearchClick}
              isActive={activeSection === "recent"}
            />

            <div className="flex justify-center">
              <KeyboardComponent
                onKeyPress={handleKeyboardInput}
                isActive={activeSection === "keyboard"}
              />
            </div>
          </div>

          <ContentSection isActive={activeSection === "content"} />
        </div>
      </div>
    </div>
  );
}
