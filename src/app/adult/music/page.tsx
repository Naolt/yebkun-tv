// "use client"

// import Image from "next/image"
// import clsx from "clsx"
// // import MusicPlayer from "../component/music/music-player"
// // import { Playlist } from "../component/music/playlist"

// type MenuOption = "CinemaDespek" | "DilokeRaqse" | "Hunermend" | "DilokeMin"

// interface Props {
//   onSelect: (option: MenuOption) => void
//   active: MenuOption
// }

// const menuItems: { label: string; key: MenuOption; image: string }[] = [
//   {
//     label: "Cinema Despek",
//     key: "CinemaDespek",
//     image: "/adult/image/music_thumbnail/music_thumbnail.png",
//   },
//   {
//     label: "Dîloke Raqse",
//     key: "DilokeRaqse",
//     image: "/adult/image/artist/Rojava.png",
//   },
//   {
//     label: "Hûnermend",
//     key: "Hunermend",
//     image: "/adult/image/artist/Rojava.png",
//   },
//   {
//     label: "Dîloke min",
//     key: "DilokeMin",
//     image: "/adult/image/artist/Rojava.png",
//   },
// ]

// const Menu = ({ onSelect, active }: Props) => {
//   return (
//     <div className="flex gap-10 bg-[rgba(33,32,32,1)] w-full h-full pt-32">
//       <div className="flex flex-col gap-4 p-2 w-64">
//         {menuItems.map((item) => (
//           <div
//             key={item.key}
//             onClick={() => onSelect(item.key)}
//             className="relative h-36 rounded-xl overflow-hidden cursor-pointer group transition-all duration-300"
//           >
//             {/* Image */}
//             <div className="relative w-full h-full">
//               <Image
//                 src={item.image}
//                 alt={item.label}
//                 layout="fill"
//                 objectFit="cover"
//                 className="rounded-xl"
//               />
//             </div>

//             {/* Overlay */}
//             <div
//               className={clsx(
//                 "absolute inset-0 transition-all duration-300",
//                 active === item.key
//                   ? "bg-black/0"
//                   : "bg-black/60 group-hover:bg-black/40"
//               )}
//             />

//             {/* Label */}
//             <div className="absolute bottom-3 left-3 z-10 text-white font-bold text-lg drop-shadow-md">
//               {item.label}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* <Playlist /> */}
//       {/* <MusicPlayer /> */}
//     </div>
//   )
// }

// export default Menu

const Menu = () => {
  return <>
   <div>music page here</div>
  </>
}

export default Menu