"use client";

import { Trash2, Clock, History, Edit } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

type RecentSearchesProps = {
  searches: string[];
  onSearchClick: (search: string) => void;
  isActive: boolean;
};

export default function EditableRecentSearches({
  searches,
  onSearchClick,
  isActive,
}: RecentSearchesProps) {
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "bg-[#F2F2F2] rounded-2xl p-6 min-h-[300px] text-black",
        isActive && "ring-2 ring-green-500"
      )}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold">Recent Search</h2>
      </div>

      {searches?.length > 0 ? (
        <div className="space-y-3">
          {searches?.map((search, index) => {
            const isFocused = focusedIndex === index;

            return (
              <div
                key={index}
                tabIndex={0} // Makes it focusable with TV remote
                onFocus={() => setFocusedIndex(index)}
                className={cn(
                  "flex items-center justify-between gap-4 outline-none transition-allp-3"
                )}
              >
                <div
                  className="flex items-center gap-6 w-full bg-white rounded-xl p-2 cursor-pointer"
                  onClick={() => onSearchClick(search)}
                >
                  <Edit className="w-5 h-5 text-[#1A2D5A]" />
                  <span className="font-medium">{search}</span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center mt-10">
          <div className="rounded-full p-6 mb-4 bg-white">
            <History className="h-12 w-12 text-black" />
          </div>
          <h3 className="text-xl font-medium text-gray-800 mb-2">
            No recent searches
          </h3>
          <p className="text-gray-500 max-w-xs text-tv-sm">
            Dîroka lêgerîna te dê li vir xuya bibe dema dest bi lêgerîn dike
          </p>
        </div>
      )}
    </div>
  );
}