"use client";

import { ReactNode } from "react";
import Image from "next/image";
import clsx from "clsx";
import { MenuProvider, useMenu } from "../../../context/MusicMenuContext";
import Link from "next/link";


const menuItems = [
  {
    label: "Cinema Despek",
    key: "CinemaDespek",
    image: "/adult/image/music_thumbnail/musichome.jpg",
  },
  {
    label: "Dîloke Raqse",
    key: "DilokeRaqse",
    image: "/adult/image/music_thumbnail/kurdisdance.jpg",
  },
  {
    label: "Hûnermend",
    key: "Hunermend",
    image: "/adult/image/music_thumbnail/artist.png",
  },
  {
    label: "Dîloke min",
    key: "DilokeMin",
    image: "/adult/image/music_thumbnail/lockedplaylist.png",
  },
];

function Sidebar() {
  const { active, setActive } = useMenu();

  return (
    <Link href="/adult/music" className="flex flex-col gap-4 p-2 w-72 pt-36">
      {menuItems.map((item) => (
        <div
          key={item.key}
          onClick={() => setActive(item.key as string)}
          className="relative h-36 rounded-xl overflow-hidden cursor-pointer group transition-all duration-300"
        >
          <div className="relative w-full h-full">
            <Image
              src={item.image}
              alt={item.label}
              layout="fill"
              objectFit="cover"
              className="rounded-xl"
            />
          </div>
          <div
            className={clsx(
              "absolute inset-0 transition-all duration-300",
              active === item.key
                ? "bg-black/0"
                : "bg-black/40 group-hover:bg-black/20"
            )}
          />
          <div className="absolute bottom-3 left-3 z-10 text-white font-bold text-lg drop-shadow-md">
            {item.label}
          </div>
        </div>
      ))}
    </Link>
  );
}

export default function MusicLayout({ children }: { children: ReactNode }) {
  return (
    <MenuProvider>
      <div className="flex justify-between gap-10 bg-[linear-gradient(to_right,_black_0%,_black_20%,#212020_40%)] w-full h-full">
        <Sidebar />
        <div className="relative w-[85%] pt-36 px-6">{children}</div>
      </div>
    </MenuProvider>
  );
}
