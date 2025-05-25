"use client";

import Image from "next/image";
import { useState } from "react";

interface Song {
  id: number;
  name: string;
  artist: string;
  mp3: string;
  thumbnail: string;
  duration: number;
}

interface Playlist {
  id: number;
  title: string;
  songCount: number;
  duration: string;
  thumbnail: string;
  songs: Song[];
}

interface Artist {
  id: number;
  name: string;
  image: string;
  playlists: Playlist[];
}

interface PlaylistBrowserProps {
  artists: Artist[];
  onSongSelect: (songs: Song[], index: number) => void;
  onPlaylistSelect: (thumbnail: string) => void;
}

export default function PlaylistBrowser({
  artists,
  onSongSelect,
  onPlaylistSelect,
}: PlaylistBrowserProps) {
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(
    null
  );

  return (
    <div className="bg-[#252525] z-10 bg-opacity-65 rounded-2xl space-y-3 w-2/5 mb-5 max-h-[calc(100vh-100px)] overflow-hidden">
      <div className="flex gap-6 p-4 h-full">
        {/* Artist list */}
        <div className="flex flex-col overflow-y-auto w-96 scrollbar-hide gap-3 max-h-[calc(100vh-200px)] pr-1">
          {artists.map((artist) => (
            <div
              key={artist.id}
              className="flex gap-4 cursor-pointer shrink-0"
              onClick={() => {
                setSelectedPlaylist(artist.playlists[0]);
                onPlaylistSelect(artist.image);
              }}
            >
              <div className="relative h-40 w-64 rounded-lg overflow-hidden">
                <Image
                  src={artist.image}
                  alt={artist.name}
                  fill
                  className="object-cover"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-black/80 ${
                    selectedPlaylist === artist.playlists[0]
                      ? "from-black/10"
                      : "from-black/80"
                  } to-transparent `}
                />
                <div className="absolute bottom-0 left-0 p-2 w-full">
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent text-white "></div>
                  <h3 className="text-white text-sm font-medium">
                    {artist.name}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full overflow-y-auto scrollbar-hide max-h-[calc(100vh-200px)] pr-1">
          {selectedPlaylist && (
            <div className="space-y-2 w-full shrink-0">
              <h4 className="text-white font-semibold">
                {selectedPlaylist.title}
              </h4>

              {selectedPlaylist.songs?.map((song, index) => (
                <div
                  key={song.id}
                  className="flex items-center justify-between w-full gap-2 bg-[#1c1c1c] p-2 rounded hover:bg-[#303030] cursor-pointer"
                  onClick={() => onSongSelect(selectedPlaylist.songs, index)}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 relative rounded overflow-hidden">
                      <Image
                        src={song.thumbnail}
                        alt={song.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-white text-sm">{song.name}</p>
                      <p className="text-gray-400 text-xs">{song.artist}</p>
                    </div>
                  </div>
                  <div className="text-white text-base">
                    {Math.floor(song.duration / 60)
                      .toString()
                      .padStart(2, "0") +
                      ":" +
                      Math.floor(song.duration % 60)
                        .toString()
                        .padStart(2, "0")}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
