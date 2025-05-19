// "use client"

// import { useEffect, useRef, useState } from "react"
// import { SkipBack, Play, SkipForward, Pause } from "lucide-react"
// import AudioVisualizer from "./audio-visualizer"
// import Image from "next/image"

// interface Song {
//   id: number
//   title: string
//   artist: string
//   duration: number
//   src: string
// }
// declare global {
//   interface Window {
//     webkitAudioContext?: typeof AudioContext
//   }
// }

// const sampleSongs: Song[] = [
//   { id: 1, title: "Sample Song 1", artist: "Artist Name", duration: 187, src: "/adult/music/track_004.mp3" },
//   { id: 2, title: "Sample Song 2", artist: "Artist Name", duration: 212, src: "/adult/music/track_002.mp3" },
//   { id: 3, title: "Sample Song 3", artist: "Artist Name", duration: 195, src: "/adult/music/track_003.mp3" },
// ]

// export default function MusicPlayer() {
//   const [currentSongIndex, setCurrentSongIndex] = useState(0)
//   const [isPlaying, setIsPlaying] = useState(false)
//   const [duration, setDuration] = useState(0)
//   const [currentTime, setCurrentTime] = useState(0)
//   const [audioData, setAudioData] = useState<Uint8Array | null>(null)

//   const audioRef = useRef<HTMLAudioElement | null>(null)
//   const contextRef = useRef<AudioContext | null>(null)
//   const analyserRef = useRef<AnalyserNode | null>(null)
//   const animationRef = useRef<number | null>(null)
//   const progressBarRef = useRef<HTMLDivElement | null>(null)

//   const currentSong = sampleSongs[currentSongIndex]

//   // One-time audio context + analyser setup
//   useEffect(() => {
//     const audio = audioRef.current
//     if (!audio) return

//     const context = new (window.AudioContext)()
//     const analyser = context.createAnalyser()
//     analyser.fftSize = 512
//     analyser.smoothingTimeConstant = 0.5

//     const source = context.createMediaElementSource(audio)
//     source.connect(analyser)
//     analyser.connect(context.destination)

//     contextRef.current = context
//     analyserRef.current = analyser
//     setAudioData(new Uint8Array(analyser.frequencyBinCount))

//     return () => {
//       if (context.state !== "closed") context.close()
//     }
//   }, [])

//   // Handle song metadata load
//   useEffect(() => {
//     const audio = audioRef.current
//     if (!audio) return

//     const handleLoadedMetadata = () => {
//       setDuration(audio.duration)
//     }

//     audio.addEventListener("loadedmetadata", handleLoadedMetadata)
//     return () => audio.removeEventListener("loadedmetadata", handleLoadedMetadata)
//   }, [currentSongIndex])

//   // Handle time update
//   useEffect(() => {
//     const audio = audioRef.current
//     if (!audio) return

//     const updateTime = () => setCurrentTime(audio.currentTime)
//     audio.addEventListener("timeupdate", updateTime)
//     return () => audio.removeEventListener("timeupdate", updateTime)
//   }, [])

//   // Handle end of song
//   useEffect(() => {
//     const audio = audioRef.current
//     if (!audio) return

//     const handleEnded = () => playNext()
//     audio.addEventListener("ended", handleEnded)
//     return () => audio.removeEventListener("ended", handleEnded)
//   }, [currentSongIndex])

//   // Play/pause handling
//   useEffect(() => {
//     const audio = audioRef.current
//     if (!audio || !contextRef.current) return

//     if (isPlaying) {
//       contextRef.current.resume()
//       audio.play()
//       startVisualizer()
//     } else {
//       audio.pause()
//       stopVisualizer()
//     }
//   }, [isPlaying])

//   const startVisualizer = () => {
//     const analyser = analyserRef.current
//     if (!analyser) return

//     const buffer = new Uint8Array(analyser.frequencyBinCount)

//     const update = () => {
//       analyser.getByteTimeDomainData(buffer)
//       setAudioData(new Uint8Array(buffer))
//       animationRef.current = requestAnimationFrame(update)
//     }

//     animationRef.current = requestAnimationFrame(update)
//   }

//   const stopVisualizer = () => {
//     if (animationRef.current) {
//       cancelAnimationFrame(animationRef.current)
//       animationRef.current = null
//     }
//   }

//   const togglePlayPause = () => setIsPlaying((prev) => !prev)

//   const playNext = () => {
//     setCurrentSongIndex((i) => (i + 1) % sampleSongs.length)
//     setCurrentTime(0)
//   }

//   const playPrevious = () => {
//     setCurrentSongIndex((i) => (i - 1 + sampleSongs.length) % sampleSongs.length)
//     setCurrentTime(0)
//   }

//   const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
//     if (!audioRef.current || !progressBarRef.current) return

//     const rect = progressBarRef.current.getBoundingClientRect()
//     const percent = (e.clientX - rect.left) / rect.width
//     const newTime = percent * duration

//     audioRef.current.currentTime = newTime
//     setCurrentTime(newTime)
//   }

//   const formatTime = (time: number) => {
//     const min = Math.floor(time / 60)
//     const sec = Math.floor(time % 60)
//     return `${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`
//   }

//   return (
//     <div className="w-1/2 h-4/5 max-w-3xl aspect-video bg-[rgba(103, 101, 113, 0.34)] rounded-lg overflow-hidden relative">
//       {/* Background */}
//       <div className="absolute inset-0 z-0">
//         <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10" />
//         <Image src={"/music-background.png"} alt={"Background"} className="w-full h-full object-cover opacity-50" fill />
//       </div>

//       {/* Audio Element */}
//       <audio ref={audioRef} src={currentSong.src} preload="metadata" />

//       {/* UI */}
//       <div className="relative z-10 flex flex-col justify-between h-full p-6">
//         {/* Song Info */}
//         <div className="mb-4">
//           <h2 className="text-white text-2xl font-bold">{currentSong.title}</h2>
//           <p className="text-gray-300">{currentSong.artist}</p>
//         </div>

//         {/* Visualizer */}
//         <div className="flex-grow flex items-center justify-center">
//           <AudioVisualizer audioData={audioData} isPlaying={isPlaying} />
//         </div>

//         {/* Controls */}
//         <div className="mt-auto">
//           <div className="flex justify-center gap-6 mb-4">
//             <button onClick={playPrevious} className="w-12 h-12 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80">
//               <SkipBack size={20} />
//             </button>
//             <button onClick={togglePlayPause} className="w-12 h-12 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80">
//               {isPlaying ? <Pause size={20} /> : <Play size={20} />}
//             </button>
//             <button onClick={playNext} className="w-12 h-12 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80">
//               <SkipForward size={20} />
//             </button>
//           </div>

//           {/* Progress Bar */}
//           <div ref={progressBarRef} onClick={handleProgressBarClick} className="h-1 bg-gray-700 rounded-full cursor-pointer mb-2">
//             <div className="h-full bg-red-600 rounded-full relative" style={{ width: `${(currentTime / duration) * 100}%` }}>
//               <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rounded-full" />
//             </div>
//           </div>

//           {/* Time */}
//           <div className="flex justify-between text-gray-400 text-sm">
//             <span>{formatTime(currentTime)}</span>
//             <span>{formatTime(duration)}</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
