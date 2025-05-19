"use client";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface NavigationItemProps {
  href: string;
  label: string;
  icon: string;
  active?: boolean;
  onClick?: () => void;
}

interface NavigationProps {
  onSearchFocus?: () => void;
  onSearchChange?: (query: string) => void;
  onSearchSubmit?: () => void;
  searchQuery?: string;
}

const NavigationItem = ({
  href,
  label,
  icon,
  active = false,
  onClick,
}: NavigationItemProps) => {
  return (
    <Link
      href={href}
      className="flex flex-col items-center gap-[1px] px-[10px] py-[10px] transition-colors no-underline text-[#FFFFFF]/90"
      onClick={onClick}
    >
      <div
        className={`w-55 h-55 rounded-full flex items-center justify-center text-black p-[10px] ${
          active ? "ring-2 ring-[#1BC469]" : ""
        }`}
        style={{
          background: active ? "#1BC469" : "white",
          boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
        }}
      >
        <Image
          src={icon}
          alt={label}
          width={33}
          height={33}
          color={`${active ? "#FFFFFF" : ""}`}
          loading="eager"
          quality={90}
          unoptimized
        />
      </div>
      <span className="text-[22px] text-white font-bold-500">{label}</span>
    </Link>
  );
};

export default function Navigation({
  onSearchFocus,
  onSearchChange,
  onSearchSubmit,
  searchQuery = "",
}: NavigationProps) {
  const pathname = usePathname();
  const clickSoundRef = useRef<HTMLAudioElement>(null);
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Update local state when prop changes
  useEffect(() => {
    setLocalSearchQuery(searchQuery);
  }, [searchQuery]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setLocalSearchQuery(newValue);
    if (onSearchChange) {
      onSearchChange(newValue);
    }
  };

  const handleSearchFocus = () => {
    if (onSearchFocus) {
      onSearchFocus();
    }
  };

  const handleSearchSubmit = () => {
    if (onSearchSubmit) {
      onSearchSubmit();
    }
    setLocalSearchQuery("")
  };

  const handleNavClick = () => {
    // Play click sound
    if (clickSoundRef.current) {
      clickSoundRef.current.currentTime = 0;
      clickSoundRef.current
        .play()
        .catch((err) => console.error("Error playing click sound:", err));
    }
  };

  return (
    <header className="fixed top-[0px] left-[0px] right-[0px] w-full h-[150px] z-50">
      <audio
        ref={clickSoundRef}
        src="/audio/click.mp3"
        preload="auto"
        className="hidden"
      />
      <div
        className="w-full h-full bg-[#000000]"
        style={{
          background:
            "linear-gradient(to bottom, #000000, rgba(59, 59, 59, 0))",
        }}
      >
        <div className="flex items-center justify-between w-full h-full px-4">
          <div className="flex items-center space-x-6">
            <NavigationItem
              href="/dashpak"
              label="Dashpak"
              icon="/images/navigation/destpek.svg"
              active={pathname === "/adult"}
              onClick={handleNavClick}
            />
            <NavigationItem
              href="/adult/music"
              label="Mûzîk"
              icon="/images/navigation/muzik.svg"
              active={pathname === "/music"}
              onClick={handleNavClick}
            />
            <NavigationItem
              href="/adult/sinema"
              label="Sînema"
              icon="/images/navigation/sinema.svg"
              active={pathname === "/sinema"}
              onClick={handleNavClick}
            />
            <NavigationItem
              href="/videos"
              label="Videos"
              icon="/images/navigation/videos.svg"
              active={pathname === "/videos"}
              onClick={handleNavClick}
            />
            <NavigationItem
              href="/stream"
              label="Stream"
              icon="/images/navigation/stream.svg"
              active={pathname === "/stream"}
              onClick={handleNavClick}
            />
            <NavigationItem
              href="/adult/gerandin"
              label="Gerandin"
              icon="/images/navigation/gerandin.svg"
              active={pathname === "/adult/gerandin"}
              onClick={handleNavClick}
            />
          </div>

          {/* Search Bar with Mic Icon */}
          <div className="flex items-center space-x-3 bg-[#f2f2f2] rounded-full px-[10px] py-[10px] w-[30vw] gap-[20px]">
            <input
              type="text"
              ref={searchInputRef}
              value={localSearchQuery}
              onChange={handleSearchChange}
              onFocus={handleSearchFocus}
              placeholder="Search"
              className="w-full h-[30px] bg-[#f2f2f2] rounded-[52px] font-[genos] font-normal text-[36px] focus:outline-none text-[#000000]/90 px-[25px] py-[10px] border-none"
            />
            <div
              className={`w-55 h-55 rounded-full flex items-center justify-center text-black p-[7px] cursor-pointer`}
              style={{
                background: "white",
                boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
              }}
              onClick={handleSearchSubmit}
            >
              <Search className="w-[33px] h-[33px]" />
            </div>
            <div
              className={`w-55 h-55 rounded-full flex items-center justify-center text-black p-[7px] `}
              style={{
                background: "white",
                boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
              }}
            >
              <Image
                src="/images/navigation/mic.svg"
                alt="Mic"
                width={33}
                height={33}
                className="cursor-pointer"
                loading="eager"
                quality={90}
                unoptimized
              />
            </div>
          </div>

          {/* Right side navigation */}
          <div className="flex items-center space-x-3">
            <NavigationItem
              href="/kulturtv"
              label="KulturTV"
              icon="/images/navigation/malbat.svg"
              active={pathname === "/kulturtv"}
              onClick={handleNavClick}
            />
            <NavigationItem
              href="/zaroktv"
              label="ZarokTV"
              icon="/images/navigation/zarok_tv.svg"
              active={pathname === "/zaroktv"}
              onClick={handleNavClick}
            />
            <NavigationItem
              href="/settings"
              label="Evin"
              icon="/images/navigation/eyar.svg"
              active={pathname === "/settings"}
              onClick={handleNavClick}
            />
            <NavigationItem
              href="/archive"
              label="Archive"
              icon="/images/navigation/archive.svg"
              active={pathname === "/archive"}
              onClick={handleNavClick}
            />
            <NavigationItem
              href="/user"
              label="User"
              icon="/images/navigation/user.png"
              active={pathname === "/user"}
              onClick={handleNavClick}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
