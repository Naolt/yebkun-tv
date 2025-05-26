// "use client";

// import { useRef, useEffect } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import Image from "next/image";
// import artistData from "@/../public/data/artist.json";

// function ScrollArrows({ scrollRef }: { scrollRef: React.RefObject<HTMLDivElement | null> }) {
//   const scroll = (direction: "left" | "right") => {
//     scrollRef.current?.scrollBy({
//       left: direction === "left" ? -300 : 300,
//       behavior: "smooth",
//     });
//   };

//   return (
//     <>
//       <button
//         onClick={() => scroll("left")}
//         className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full"
//       >
//         <ChevronLeft />
//       </button>
//       <button
//         onClick={() => scroll("right")}
//         className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full"
//       >
//         <ChevronRight />
//       </button>
//     </>
//   );
// }

// export default function ArtistSection() {
//   const artistsRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const node = artistsRef.current;
//     if (!node) return;

//     const handleKey = (e: KeyboardEvent) => {
//       if (e.key === "ArrowRight") {
//         node.scrollBy({ left: 320, behavior: "smooth" });
//         e.preventDefault();
//       } else if (e.key === "ArrowLeft") {
//         node.scrollBy({ left: -320, behavior: "smooth" });
//         e.preventDefault();
//       }
//     };

//     node.addEventListener("keydown", handleKey);
//     return () => node.removeEventListener("keydown", handleKey);
//   }, []);

//   return (
//     <div className="space-y-2 relative">
//       <div className="relative">
//         <ScrollArrows scrollRef={artistsRef} />
//         <div
//           ref={artistsRef}
//           tabIndex={0}
//           className="flex space-x-4 overflow-x-auto scrollbar-hide pr-6 outline-none"
//         >
//           {artistData.map((artist) => (
//             <div
//               key={artist.id}
//               tabIndex={0}
//               className="relative h-80 w-96 group shrink-0 bg-black focusable-tile rounded-xl"
//             >
//               <Image
//                 src={artist.image}
//                 alt={artist.name}
//                 fill
//                 className="object-cover rounded-xl"
//               />
//               <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
//                 <div className="text-sm font-medium">{artist.name}</div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// Updated ArtistSection.tsx
"use client";

import { useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import artistData from "@/../public/data/artist.json";

interface Song {
  id: number;
  name: string;
  artist: string;
  mp3: string;
  thumbnail: string;
  duration: number;
}

interface ArtistSectionProps {
  onSongSelect?: (songs: Song[], index: number) => void;
  onPlaylistSelect?: (image: string) => void;
}

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

export default function ArtistSection({ onSongSelect, onPlaylistSelect }: ArtistSectionProps) {
  const artistsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = artistsRef.current;
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

  const simulateArtistSongs = (artistName: string, image: string): Song[] => {
    return Array.from({ length: 5 }, (_, i) => ({
      id: i + 1,
      name: `${artistName} Song ${i + 1}`,
      artist: artistName,
      mp3: `/audio/${artistName.toLowerCase().replace(/ /g, "_")}_song${i + 1}.mp3`,
      thumbnail: image,
      duration: 210 + i * 10,
    }));
  };

  return (
    <div className="space-y-2 relative">
      <div className="relative">
        <ScrollArrows scrollRef={artistsRef} />
        <div
          ref={artistsRef}
          tabIndex={0}
          className="flex space-x-4 overflow-x-auto scrollbar-hide pr-6 outline-none"
        >
          {artistData.map((artist) => (
            <Link
              href={'/adult/music/1'}
              key={artist.id}
              tabIndex={0}
              onClick={() => {
                const songs = simulateArtistSongs(artist.name, artist.image);
                onSongSelect?.(songs, 0);
                onPlaylistSelect?.(artist.image);
              }}
              className="relative h-80 w-96 group shrink-0 bg-black focusable-tile rounded-xl cursor-pointer"
            >
              <Image
                src={artist.image}
                alt={artist.name}
                fill
                className="object-cover rounded-xl"
              />
              <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                <div className="text-sm font-medium">{artist.name}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
