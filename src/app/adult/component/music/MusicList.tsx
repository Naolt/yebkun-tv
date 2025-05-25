"use client";

import { useRef, useEffect } from "react";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import musicData from "@/../public/data/music.json";
import Link from "next/link";

function ScrollArrows({ scrollRef }: { scrollRef: React.RefObject<HTMLDivElement | null> }) {
  const scroll = (direction: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: direction === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  return (
    <>
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full"
      >
        <ChevronLeft />
      </button>
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full"
      >
        <ChevronRight />
      </button>
    </>
  );
}

export default function SongSection() {
  const songsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = songsRef.current;
    if (!node) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        node.scrollBy({ left: 320, behavior: "smooth" });
        e.preventDefault();
      } else if (e.key === "ArrowLeft") {
        node.scrollBy({ left: -320, behavior: "smooth" });
        e.preventDefault();
      }
    };

    node.addEventListener("keydown", handleKey);
    return () => node.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div className="space-y-2 relative">
      <div className="relative">
        <ScrollArrows scrollRef={songsRef} />
        <div
          ref={songsRef}
          tabIndex={0}
          className="flex space-x-4 overflow-x-auto scrollbar-hide pr-6 outline-none"
        >
          {musicData.map((song) => (
            <Link
            href={'/adult/music/1'}
              key={song.id}
              tabIndex={0}
              className="relative h-56 w-96 group shrink-0 focusable-tile"
            >
              <div className="aspect-video bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-lg overflow-hidden relative">
                <Image
                  src={song.thumbnail}
                  alt={song.name}
                  fill
                  className="object-cover rounded-lg"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-black bg-opacity-50 rounded-full p-2">
                    <Play className="h-8 w-8" />
                  </div>
                </div>
                <div className="absolute top-2 right-2 bg-black bg-opacity-70 px-1.5 py-0.5 rounded text-xs">
                  159 k
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black to-transparent text-white">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{song.name}</span>
                    <span className="text-xs">3:00</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
