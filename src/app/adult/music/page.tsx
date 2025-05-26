// "use client";

// import Image from "next/image";
// import clsx from "clsx";
// import HunermendView from "../component/music/HunermendView";
// import { useState } from "react";
// import SongSection from "../component/music/MusicList";
// import ArtistSection from "../component/music/artistsList";
// import DilokeRaqseView from "../component/music/DilokeRaqseView";

// type MenuOption = "CinemaDespek" | "DilokeRaqse" | "Hunermend" | "DilokeMin";

// const menuItems: { label: string; key: MenuOption; image: string }[] = [
//   {
//     label: "Cinema Despek",
//     key: "CinemaDespek",
//     image: "/adult/image/music_thumbnail/musichome.jpg",
//   },
//   {
//     label: "Dîloke Raqse",
//     key: "DilokeRaqse",
//     image: "/adult/image/music_thumbnail/kurdisdance.jpg",
//   },
//   {
//     label: "Hûnermend",
//     key: "Hunermend",
//     image: "/adult/image/music_thumbnail/artist.png",
//   },
//   {
//     label: "Dîloke min",
//     key: "DilokeMin",
//     image: "/adult/image/music_thumbnail/lockedplaylist.png",
//   },
// ];

// const Menu = () => {
//   const [active, setActive] = useState<MenuOption>("CinemaDespek");
//   return (
//     <div className="flex justify-between gap-10 bg-[linear-gradient(to_right,_black_0%,_black_20%,#212020_40%)] w-full h-full ">
//       <div className="flex flex-col gap-4 p-2 w-72 pt-36">
//         {menuItems.map((item) => (
//           <div
//             key={item.key}
//             onClick={() => setActive(item.key)}
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
//                   : "bg-black/40 group-hover:bg-black/20"
//               )}
//             />
//             <div className="absolute bottom-3 left-3 z-10 text-white font-bold text-lg drop-shadow-md">
//               {item.label}
//             </div>
//           </div>
//         ))}
//       </div>
//       <div className="relative w-[85%] pt-36 px-6">

//         {active === "Hunermend" && (
//          <div className="flex flex-col gap-14">
//             <div className="flex flex-col gap-5">
//               <h1 className="text-tv-lg font-bold text-white p-3 bg-[#ffffff40] rounded-xl w-80">
//                 Latest Songs
//               </h1>
//               <ArtistSection />
//             </div>
//             <div className="flex flex-col gap-5">
//               <h1 className="text-tv-lg font-bold text-white p-3 bg-[#ffffff40] rounded-xl w-80">
//                Popular Songs
//               </h1>
//               <ArtistSection />
//             </div>
//           </div>
//         )}

//         {active === "CinemaDespek" && (
//           <div className="flex flex-col gap-14">
//             <div className="flex flex-col gap-5">
//               <h1 className="text-tv-lg font-bold text-white p-3 bg-[#ffffff40] rounded-xl w-72">
//                 Latest Songs
//               </h1>
//               <SongSection />
//             </div>
//             <div className="flex flex-col gap-5">
//               <h1 className="text-tv-lg font-bold text-white p-3 bg-[#ffffff40] rounded-xl w-72">
//                Latest Artist
//               </h1>
//               <ArtistSection />
//             </div>
//           </div>
//         )}

//         {active === "DilokeRaqse" && (
//           <DilokeRaqseView onSelectPlaylist={(pl) => {}} />
//         )}

//         {active === "DilokeMin" && (
//            <HunermendView onSelectPlaylist={(pl) => {}} />
//         )}

//       </div>
//     </div>
//   );
// };

// export default Menu;


"use client";

import { useMenu } from "../../../context/MusicMenuContext";
import HunermendView from "../component/music/HunermendView";
import SongSection from "../component/music/MusicList";
import ArtistSection from "../component/music/artistsList";
import DilokeRaqseView from "../component/music/DilokeRaqseView";

export default function MusicPage() {
  const { active } = useMenu();

  return (
    <>
      {active === "CinemaDespek" && (
        <div className="flex flex-col gap-14">
          <div className="flex flex-col gap-5">
            <h1 className="text-tv-lg font-bold text-white p-3 bg-[#ffffff40] rounded-xl w-72">
              Latest Songs
            </h1>
            <SongSection />
          </div>
          <div className="flex flex-col gap-5">
            <h1 className="text-tv-lg font-bold text-white p-3 bg-[#ffffff40] rounded-xl w-72">
              Latest Artist
            </h1>
            <ArtistSection />
          </div>
        </div>
      )}

      {active === "Hunermend" && (
        <div className="flex flex-col gap-14">
          <div className="flex flex-col gap-5">
            <h1 className="text-tv-lg font-bold text-white p-3 bg-[#ffffff40] rounded-xl w-80">
              Latest Songs
            </h1>
            <ArtistSection />
          </div>
          <div className="flex flex-col gap-5">
            <h1 className="text-tv-lg font-bold text-white p-3 bg-[#ffffff40] rounded-xl w-80">
              Popular Songs
            </h1>
            <ArtistSection />
          </div>
        </div>
      )}

      {active === "DilokeRaqse" && (
        <DilokeRaqseView onSelectPlaylist={() => {}} />
      )}

      {active === "DilokeMin" && (
        <HunermendView onSelectPlaylist={() => {}} />
      )}
    </>
  );
}
