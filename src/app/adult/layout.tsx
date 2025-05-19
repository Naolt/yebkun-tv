"use client";

import Navigation from "@/components/ui/navigation";
import { SearchProvider, useSearchContext } from "@/context/SearchContext";

export default function AdultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SearchProvider>
        <LayoutWithNavigation>{children}</LayoutWithNavigation>
      </SearchProvider>
    </>
  );
}

function LayoutWithNavigation({ children }: { children: React.ReactNode }) {
  const { searchQuery, setSearchQuery, handleSearch, handleSearchFocus } =
    useSearchContext();

  return (
    <>
      <Navigation
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearchFocus={handleSearchFocus}
        onSearchSubmit={handleSearch}
      />
      {children}
    </>
  );
}
