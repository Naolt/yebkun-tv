"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { SkipBack, Play, SkipForward, Pause } from "lucide-react";
import AudioVisualizer from "./audio-visualizer";
// import Image from "next/image";
import { Slider } from "@/components/ui/slider";

interface Song {
  id: number;
  name: string;
  artist: string;
  mp3: string;
  thumbnail: string;
  duration: number;
}

interface MusicPlayerProps {
  songs: Song[];
  initialIndex: number;
}

export default function MusicPlayer({ songs, initialIndex }: MusicPlayerProps) {
  const [currentSongIndex, setCurrentSongIndex] = useState(initialIndex);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  // const [volume, setVolume] = useState([75]);
  const [audioData, setAudioData] = useState<Uint8Array | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const contextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const animationRef = useRef<number | null>(null);

  const currentSong = songs[currentSongIndex];

  // Initialize audio context
  const initializeAudioContext = useCallback(async () => {
    if (!audioRef.current || contextRef.current) return;

    try {
      const AudioContextClass = window.AudioContext;
      const context = new AudioContextClass();
      const analyser = context.createAnalyser();

      analyser.fftSize = 512;
      analyser.smoothingTimeConstant = 0.8;

      const source = context.createMediaElementSource(audioRef.current);
      source.connect(analyser);
      analyser.connect(context.destination);

      contextRef.current = context;
      analyserRef.current = analyser;
      sourceRef.current = source;

      setAudioData(new Uint8Array(analyser.frequencyBinCount));
    } catch (error) {
      console.error("Failed to initialize audio context:", error);
    }
  }, []);

  // Update song index when initialIndex changes
  useEffect(() => {
    setCurrentSongIndex(initialIndex);
    setCurrentTime(0);
    setIsLoading(true);
  }, [initialIndex]);

  // Handle song change
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    setIsLoading(true);
    setCurrentTime(0);

    const handleCanPlay = () => {
      setIsLoading(false);
      if (isPlaying) {
        audio.play().catch(console.error);
      }
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      playNext();
    };

    const handleError = (e: Event) => {
      console.error("Audio error:", e);
      setIsLoading(false);
    };

    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    // Load the new song
    audio.load();

    return () => {
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
    };
  }, [currentSongIndex, currentSong.mp3]);

  // Handle play/pause
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || isLoading) return;

    if (isPlaying) {
      // Initialize audio context on first play (user interaction required)
      if (!contextRef.current) {
        initializeAudioContext();
      }

      if (contextRef.current?.state === "suspended") {
        contextRef.current.resume();
      }

      audio.play().catch(console.error);
      startVisualizer();
    } else {
      audio.pause();
      stopVisualizer();
    }
  }, [isPlaying, isLoading, initializeAudioContext]);

  // // Handle volume changes
  // useEffect(() => {
  //   if (audioRef.current) {
  //     audioRef.current.volume = volume[0] / 100;
  //   }
  // }, [volume]);

  const startVisualizer = useCallback(() => {
    if (!analyserRef.current || animationRef.current) return;

    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const updateVisualizer = () => {
      if (!analyserRef.current) return;

      analyserRef.current.getByteFrequencyData(dataArray);
      setAudioData(new Uint8Array(dataArray));
      animationRef.current = requestAnimationFrame(updateVisualizer);
    };

    animationRef.current = requestAnimationFrame(updateVisualizer);
  }, []);

  const stopVisualizer = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  }, []);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const playNext = () => {
    const nextIndex = (currentSongIndex + 1) % songs.length;
    setCurrentSongIndex(nextIndex);
  };

  const playPrevious = () => {
    const prevIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    setCurrentSongIndex(prevIndex);
  };

  const handleSeek = (value: number[]) => {
    const audio = audioRef.current;
    if (audio && duration) {
      const newTime = (value[0] / 100) * duration;
      audio.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (time: number) => {
    if (!time || !isFinite(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopVisualizer();
      if (contextRef.current && contextRef.current.state !== "closed") {
        contextRef.current.close();
      }
    };
  }, [stopVisualizer]);

  return (
    <div className="bg-[#252525] z-10 bg-opacity-65 rounded-2xl h-full overflow-hidden relative">

      {/* Audio Element */}
      <audio
        ref={audioRef}
        src={currentSong.mp3}
        preload="metadata"
        crossOrigin="anonymous"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full p-6">
        {/* Song Info */}
        <div className="mb-6">
          <h1 className="text-white text-2xl font-bold mb-2 truncate">
            {currentSong.name}
          </h1>
          <p className="text-gray-300 text-lg truncate">{currentSong.artist}</p>
          {isLoading && (
            <p className="text-gray-400 text-sm mt-1">Loading...</p>
          )}
        </div>

        {/* Visualizer */}
        <div className="flex-1 flex items-center justify-center mb-6">
          <AudioVisualizer
            audioData={audioData}
            isPlaying={isPlaying && !isLoading}
          />
        </div>

        {/* Controls */}
        <div className="space-y-4">
          {/* Playback Controls */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={playPrevious}
              className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              disabled={isLoading}
            >
              <SkipBack size={20} />
            </button>

            <button
              onClick={togglePlayPause}
              className="w-16 h-16 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors"
              disabled={isLoading}
            >
              {isPlaying ? (
                <Pause size={24} />
              ) : (
                <Play size={24} className="ml-1" />
              )}
            </button>

            <button
              onClick={playNext}
              className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              disabled={isLoading}
            >
              <SkipForward size={20} />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <Slider
              value={[duration ? (currentTime / duration) * 100 : 0]}
              max={100}
              step={0.1}
              onValueChange={handleSeek}
              disabled={isLoading}
            />

            <div className="flex justify-between text-gray-400 text-sm">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
