// "use client"
// import Image from "next/image"
// import artistData from "@/../public/data/artist.json"


// interface PlaylistItem {
//   id: number
//   title: string
//   songCount: number
//   duration: string
//   thumbnail: string
// }


// const playlistItems: PlaylistItem[] = [
//   {
//     id: 1,
//     title: "Song List",
//     songCount: 120,
//     duration: "3:52",
//     thumbnail: "/adult/image/music_thumbnail/music_thumbnail.png",
//   },
//   {
//     id: 2,
//     title: "Playlist Title",
//     songCount: 120,
//     duration: "3:52",
//     thumbnail: "/adult/image/music_thumbnail/music_thumbnail.png",
//   },
//   {
//     id: 3,
//     title: "Playlist Title",
//     songCount: 120,
//     duration: "3:52",
//     thumbnail: "/adult/image/music_thumbnail/music_thumbnail.png",
//   },
//   {
//     id: 4,
//     title: "Playlist Title",
//     songCount: 120,
//     duration: "3:52",
//     thumbnail: "/adult/image/music_thumbnail/music_thumbnail.png",
//   },
//   {
//     id: 5,
//     title: "Playlist Title",
//     songCount: 120,
//     duration: "3:52",
//     thumbnail: "/adult/image/music_thumbnail/music_thumbnail.png",
//   },
//   {
//     id: 6,
//     title: "Playlist Title",
//     songCount: 120,
//     duration: "3:52",
//     thumbnail: "/adult/image/music_thumbnail/music_thumbnail.png",
//   },
//   {
//     id: 7,
//     title: "Playlist Title",
//     songCount: 120,
//     duration: "3:52",
//     thumbnail: "/adult/image/music_thumbnail/music_thumbnail.png",
//   },
//   {
//     id: 8,
//     title: "Playlist Title",
//     songCount: 120,
//     duration: "3:52",
//     thumbnail: "/adult/image/music_thumbnail/music_thumbnail.png",
//   },
//   {
//     id: 9,
//     title: "Playlist Title",
//     songCount: 120,
//     duration: "3:52",
//     thumbnail: "/adult/image/music_thumbnail/music_thumbnail.png",
//   },
//   {
//     id: 10,
//     title: "Playlist Title",
//     songCount: 120,
//     duration: "3:52",
//     thumbnail: "/adult/image/music_thumbnail/music_thumbnail.png",
//   },
//   {
//     id: 11,
//     title: "Playlist Title",
//     songCount: 120,
//     duration: "3:52",
//     thumbnail: "/adult/image/music_thumbnail/music_thumbnail.png",
//   },
//   {
//     id: 12,
//     title: "Playlist Title",
//     songCount: 120,
//     duration: "3:52",
//     thumbnail: "/adult/image/music_thumbnail/music_thumbnail.png",
//   },
// ]

// export function Playlist() {

//   return (
//     <div className="h-full flex bg-[rgba(103, 101, 113, 0.34)]">

//       <div className="flex flex-col gap-3 pb-4 mb-4 scrollbar-hide">
//         {artistData.map((artist) => (
//           <button
//             key={artist.id}
//             // onClick={() => setSelectedArtist(artist)}
//             className="relative min-w-[120px] h-40 w-64 rounded-lg overflow-hidden flex-shrink-0"
//           >
//             <Image src={artist.image || "/placeholder.svg"} alt={artist.name} fill className="object-cover" />
//             <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
//             <div className="absolute bottom-0 left-0 p-2">
//               <h3 className="text-white text-sm font-medium">{artist.name}</h3>
//             </div>
//           </button>
//         ))}
//       </div>

//       {/* Playlist */}
//       <div className="flex-grow overflow-y-auto">
//         <div className="space-y-2">
//           {playlistItems.map((item) => (
//             <div
//               key={item.id}
//               className="flex items-center bg-[#252525] rounded-md p-2 hover:bg-[#303030] transition-colors"
//             >
//               <div className="w-12 h-12 relative rounded overflow-hidden mr-3 flex-shrink-0">
//                 <Image src={item.thumbnail || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
//               </div>
//               <div className="flex-grow">
//                 <h4 className="text-white text-sm font-medium">{item.title}</h4>
//                 <p className="text-gray-400 text-xs">Songs {item.songCount}</p>
//               </div>
//               <div className="flex items-center gap-3">
//                 <span className="text-gray-400 text-sm">{item.duration}</span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }
