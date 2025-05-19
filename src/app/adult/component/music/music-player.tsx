"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { SkipBack, Play, SkipForward, Pause } from "lucide-react"
import AudioVisualizer from "./audio-visualizer"

interface Song {
  id: number
  title: string
  artist: string
  duration: number
  src: string
}

const sampleSongs: Song[] = [
  {
    id: 1,
    title: "Sample Song 1",
    artist: "Artist Name",
    duration: 187, // 3:07
    src: "/adult/music/track_004.mp3",
  },
  {
    id: 2,
    title: "Sample Song 2",
    artist: "Artist Name",
    duration: 212, // 3:32
    src: "/adult/music/track_002.mp3",
  },
  {
    id: 3,
    title: "Sample Song 3",
    artist: "Artist Name",
    duration: 195, // 3:15
    src: "/adult/music/track_003.mp3",
  },
]

export default function MusicPlayer() {
  const [currentSong, setCurrentSong] = useState<Song>(sampleSongs[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const progressBarRef = useRef<HTMLDivElement | null>(null)
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null)
  const [audioSource, setAudioSource] = useState<MediaElementAudioSourceNode | null>(null)
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null)
  const [audioData, setAudioData] = useState<Uint8Array | null>(null)
  const animationRef = useRef<number | null>(null)

  // Initialize audio context and analyser
  useEffect(() => {
    if (!audioRef.current) return

    const context = new (window.AudioContext || (window as any).webkitAudioContext)()
    const source = context.createMediaElementSource(audioRef.current)
    const analyserNode = context.createAnalyser()

    // Increase the FFT size for more detailed analysis
    analyserNode.fftSize = 512
    // Reduce smoothing for more responsive visualization
    analyserNode.smoothingTimeConstant = 0.5
    const bufferLength = analyserNode.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)

    source.connect(analyserNode)
    analyserNode.connect(context.destination)

    setAudioContext(context)
    setAudioSource(source)
    setAnalyser(analyserNode)
    setAudioData(dataArray)

    return () => {
      if (context.state !== "closed") {
        context.close()
      }
    }
  }, [])

  // Update current time
  useEffect(() => {
    if (!audioRef.current) return

    const updateTime = () => {
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime)
      }
    }

    audioRef.current.addEventListener("timeupdate", updateTime)

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("timeupdate", updateTime)
      }
    }
  }, [])

  // Update audio data more frequently for better visualization
  useEffect(() => {
    if (!isPlaying || !analyser) return

    // Create a local data array for this effect
    const localDataArray = new Uint8Array(analyser.frequencyBinCount)

    const updateAudioData = () => {
      if (!analyser) return

      // Use the local data array
      analyser.getByteTimeDomainData(localDataArray)

      // Update state with a copy
      setAudioData(new Uint8Array(localDataArray))

      if (isPlaying) {
        requestAnimationFrame(updateAudioData)
      }
    }

    const animationId = requestAnimationFrame(updateAudioData)

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [isPlaying, analyser])

  // Load metadata when audio is loaded
  useEffect(() => {
    if (!audioRef.current) return

    const handleLoadedMetadata = () => {
      if (audioRef.current) {
        setDuration(audioRef.current.duration)
      }
    }

    audioRef.current.addEventListener("loadedmetadata", handleLoadedMetadata)

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("loadedmetadata", handleLoadedMetadata)
      }
    }
  }, [currentSong])

  // Handle play/pause
  useEffect(() => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.play()
      audioContext?.resume()
      startVisualization()
    } else {
      audioRef.current.pause()
      stopVisualization()
    }
  }, [isPlaying, audioContext])

  // Handle song end
  useEffect(() => {
    if (!audioRef.current) return

    const handleEnded = () => {
      playNextSong()
    }

    audioRef.current.addEventListener("ended", handleEnded)

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("ended", handleEnded)
      }
    }
  }, [currentSong])

  const startVisualization = () => {
    if (!analyser) return

    // Create a local data array for visualization to avoid state update issues
    const localDataArray = new Uint8Array(analyser.frequencyBinCount)

    const updateVisualizer = () => {
      if (!analyser) return

      // Use the local data array instead of the state variable
      analyser.getByteTimeDomainData(localDataArray)

      // Update the state with a new array (copy the data)
      setAudioData(new Uint8Array(localDataArray))

      animationRef.current = requestAnimationFrame(updateVisualizer)
    }

    animationRef.current = requestAnimationFrame(updateVisualizer)
  }

  const stopVisualization = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
      animationRef.current = null
    }
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const playPreviousSong = () => {
    const currentIndex = sampleSongs.findIndex((song) => song.id === currentSong.id)
    const previousIndex = currentIndex === 0 ? sampleSongs.length - 1 : currentIndex - 1
    setCurrentSong(sampleSongs[previousIndex])
    if (isPlaying && audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play()
    }
  }

  const playNextSong = () => {
    const currentIndex = sampleSongs.findIndex((song) => song.id === currentSong.id)
    const nextIndex = (currentIndex + 1) % sampleSongs.length
    setCurrentSong(sampleSongs[nextIndex])
    if (isPlaying && audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play()
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current || !audioRef.current) return

    const rect = progressBarRef.current.getBoundingClientRect()
    const clickPosition = e.clientX - rect.left
    const progressBarWidth = rect.width
    const seekTime = (clickPosition / progressBarWidth) * duration

    audioRef.current.currentTime = seekTime
    setCurrentTime(seekTime)
  }

  return (
    <div className="w-1/2 h-4/5 max-w-3xl aspect-video bg-[rgba(103, 101, 113, 0.34)] rounded-lg overflow-hidden relative">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10" />
        <img src="/music-background.png" alt="Background" className="w-full h-full object-cover opacity-50" />
      </div>

      {/* Audio element */}
      <audio ref={audioRef} src={currentSong.src} preload="metadata" />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-between h-full p-6">
        {/* Song info */}
        <div className="mb-4">
          <h2 className="text-white text-2xl font-bold">{currentSong.title}</h2>
          <p className="text-gray-300">{currentSong.artist}</p>
        </div>

        {/* Visualizer */}
        <div className="flex-grow flex items-center justify-center">
          <AudioVisualizer audioData={audioData} isPlaying={isPlaying} />
        </div>

        {/* Controls */}
        <div className="mt-auto">
          {/* Buttons */}
          <div className="flex justify-center gap-6 mb-4">
            <button
              onClick={playPreviousSong}
              className="w-12 h-12 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-black/80 transition-colors"
            >
              <SkipBack size={20} />
            </button>
            <button
              onClick={togglePlayPause}
              className="w-12 h-12 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-black/80 transition-colors"
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
            <button
              onClick={playNextSong}
              className="w-12 h-12 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-black/80 transition-colors"
            >
              <SkipForward size={20} />
            </button>
          </div>

          {/* Progress bar */}
          <div
            ref={progressBarRef}
            className="h-1 bg-gray-700 rounded-full cursor-pointer mb-2"
            onClick={handleProgressBarClick}
          >
            <div
              className="h-full bg-red-600 rounded-full relative"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            >
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rounded-full" />
            </div>
          </div>

          {/* Time */}
          <div className="flex justify-between text-gray-400 text-sm">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
