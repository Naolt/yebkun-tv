"use client";

import { useState } from "react";
import MusicPlayer from "./music-player";
import PlaylistBrowser from "./playlist";
// import Image from "next/image";
import artistData from "@/../public/data/artist.json";

interface Song {
  id: number;
  name: string;
  artist: string;
  mp3: string;
  thumbnail: string;
  duration: number;
}

interface DilokeRaqseViewProps {
  onSelectPlaylist?: (songs: Song[], index: number) => void;
}

export default function DilokeRaqseView({
  onSelectPlaylist,
}: DilokeRaqseViewProps) {
  const [selectedSongs, setSelectedSongs] = useState<Song[]>([]);
  const [startIndex, setStartIndex] = useState<number | null>(null);
  const [backgroundImage, setBackgroundImage] = useState<string>("");

  const handlePlaySong = (songs: Song[], index: number) => {
    setSelectedSongs(songs);
    setStartIndex(index);
    onSelectPlaylist?.(songs, index);
  };

  const handleBacGroundChange = (thumbnail: string) => {
    setBackgroundImage(thumbnail);
  };

  return (
    <div className="flex gap-10 h-full w-full">
      {backgroundImage && (
        <div className="absolute inset-0">
          {/* <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/70" /> */}
        </div>
      )}

      {/* Render artists & songs */}
      <PlaylistBrowser
        artists={artistData}
        onSongSelect={handlePlaySong}
        onPlaylistSelect={handleBacGroundChange}
      />

      {/* Render music player if song selected */}
      {startIndex !== null && selectedSongs.length > 0 && (
        <div className="bg-[#252525] p-4 rounded-lg space-y-3 w-3/5">
          <MusicPlayer songs={selectedSongs} initialIndex={startIndex} />
        </div>
      )}
    </div>
  );
}
