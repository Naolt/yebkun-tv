"use client";

import CircularTimer from "@/app/components/CircularTimer";
import ResponsiveHelper from "@/app/components/ResponsiveHelper";
import { Episode, getAllContent, Video } from "@/lib/firebase";
import Image from "next/image";
import { FC, useEffect, useRef, useState } from "react";
import MostViewedVideo from "./components/most_viewed/most_viewd_video";
import Home from "./pages/home";
import MoviesAndStories from "./pages/movies_and_stories";
import Stories from "./pages/stories";

export interface Series {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  url: string;
  views: number;
  duration: string;
  type: string;
  videoType: string;
  episodes: Episode[];
  seasons: number;
  numberOfEpisodes: number;
}
// Generate consistent positions and animations
const useClientSideRendering = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  return isClient;
};

const KidsPage: FC = () => {
  const [activeNav, setActiveNav] = useState<string>("home");
  const audioRef = useRef<HTMLAudioElement>(null);
  const clickSoundRef = useRef<HTMLAudioElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const [navImages, setNavImages] = useState({
    home: "/images/kids/nav/home.svg",
    stories: "/images/kids/nav/stories.svg",
    videos: "/images/kids/nav/videos.svg",
    movies: "/images/kids/nav/movies.svg",
  });

  // fetch data from firebase
  const [stories, setStories] = useState<Video[]>([]);
  const [movies, setMovies] = useState<Video[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [series, setSeries] = useState<Series[]>([]);
  const [funnyVideos, setFunnyVideos] = useState<Video[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const content = await getAllContent();
      setStories(content.stories);
      setMovies(content.movies);
      setVideos(content.movies);
      setFunnyVideos(content.movies);
      setSeries(content.series);
      console.log(content);
    };

    fetchData();
  }, []);

  // Preload nav images on component mount
  useEffect(() => {
    // Preload all nav icons (active and inactive states)
    const iconsToPreload = [
      "/images/kids/nav/home.svg",
      "/images/kids/nav/home_active.svg",
      "/images/kids/nav/stories.svg",
      "/images/kids/nav/stories_active.svg",
      "/images/kids/nav/videos.svg",
      "/images/kids/nav/videos_active.svg",
      "/images/kids/nav/movies.svg",
      "/images/kids/nav/movies_active.svg",
    ];

    iconsToPreload.forEach((src) => {
      const img = document.createElement("img");
      img.src = src;
    });
  }, []);

  // Function to handle navigation clicks and set active state
  const handleNavClick = (navId: string) => {
    // Play click sound
    if (clickSoundRef.current) {
      clickSoundRef.current.currentTime = 0;
      clickSoundRef.current
        .play()
        .catch((err) => console.error("Error playing click sound:", err));
    }

    // Update active nav state
    setActiveNav(navId);

    // Immediately update active image sources for instant feedback
    setNavImages((prev) => ({
      ...prev,
      home:
        navId === "home"
          ? "/images/kids/nav/home_active.svg"
          : "/images/kids/nav/home.svg",
      stories:
        navId === "stories"
          ? "/images/kids/nav/stories_active.svg"
          : "/images/kids/nav/stories.svg",
      videos:
        navId === "videos"
          ? "/images/kids/nav/videos_active.svg"
          : "/images/kids/nav/videos.svg",
      movies:
        navId === "movies"
          ? "/images/kids/nav/movies_active.svg"
          : "/images/kids/nav/movies.svg",
    }));
  };

  // Initialize audio when component mounts and ensure it continues playing across navigation
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.99;

      // Try to play audio
      const playAudio = () => {
        audioRef.current?.play().catch((error) => {
          console.log("Audio autoplay was prevented:", error);
          // Will try again on user interaction
        });
      };

      playAudio();

      // Add event listeners to handle audio persistence
      document.addEventListener("click", playAudio, { once: true });

      // Ensure audio continues playing after navigation changes
      const handleVisibilityChange = () => {
        if (!document.hidden && audioRef.current?.paused) {
          audioRef.current
            .play()
            .catch((err) => console.log("Could not resume audio:", err));
        }
      };

      document.addEventListener("visibilitychange", handleVisibilityChange);

      return () => {
        document.removeEventListener("click", playAudio);
        document.removeEventListener(
          "visibilitychange",
          handleVisibilityChange
        );
      };
    }
  }, []);

  // Calculate available height for content
  useEffect(() => {
    const updateHeight = () => {
      // Keep track of window resize events
      // This helps with responsive layout adjustments
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  console.log("check the active nav");
  console.log(activeNav);

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Background Audio - set to loop and persist */}
      <audio
        ref={audioRef}
        src="/images/kids/animation/birds.mp3"
        loop
        preload="auto"
        className="hidden"
      />

      <audio
        ref={clickSoundRef}
        src="/audio/click.mp3"
        preload="auto"
        className="hidden"
      />

      {/* Custom background with sky only at top 20% */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(to bottom, #7dd3fc 0%, #7dd3fc 10%, white 20%, white 100%)",
        }}
      ></div>

      {/* <LatestMovies />
      <div
        className="flex flex-col w-full h-[10%]  p-tv-2 rounded-lg gap-tv-2"
        style={{
          background: "rgba(103, 101, 113, 0.34)",
        }}
      >
        <h5 className="text-black text-[36px] font-[500] font-genos">
          New Stories
        </h5>
        <div className="flex flex-row gap-tv-2">
          {dummyNewStories.map((story) => (
            <NewStoriesCard
              key={story.title}
              title={story.title}
              thumbnail={story.thumbnail}
              type={story.type}
              views={story.views}
            />
          ))}
        </div>
      </div>
      <LatestMovies />
      <MostViewedVideo /> */}

      {/* Animated Background Elements */}
      <AnimatedClouds />
      <AnimatedButterflies />
      <AnimatedSun />

      {/* Bottom grass */}
      <div className="absolute bottom-0 left-0 w-full z-50">
        <AnimatedGrass />
      </div>

      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full r-p-lg z-30 h-[15vh]">
        <div className="max-w-[90vw] mx-auto flex items-center justify-between h-full">
          {/* Logo */}
          <div className="flex aspect-square items-center">
            <Image
              src="/images/kids/nav/zarok_logo.svg"
              alt="Logo"
              width={130}
              height={130}
              className="r-img-lg object-contain bg-white rounded-full aspect-square"
              priority
              quality={90}
              unoptimized
            />
          </div>

          {/* Navbar Icons - using responsive gap with equal spacing */}
          <div className="flex-1 flex items-center justify-center r-gap-md">
            <a
              onClick={() => handleNavClick("home")}
              href="#home"
              className={`tv-focus-animation flex flex-col items-center p-tv-2 transition-transform ${
                activeNav === "home" ? "scale-110" : "hover:scale-110"
              }`}
            >
              {activeNav === "home" ? (
                <Image
                  src={"/images/kids/nav/home_active.svg"}
                  alt="Home"
                  width={150}
                  height={100}
                  className="r-img-md object-contain"
                  loading="eager"
                  quality={90}
                  unoptimized
                />
              ) : (
                <Image
                  src={navImages.home}
                  alt="Home"
                  width={150}
                  height={100}
                  className="r-img-md object-contain"
                  loading="eager"
                  quality={90}
                  unoptimized
                />
              )}
            </a>
            <a
              onClick={() => handleNavClick("stories")}
              href="#stories"
              className={`tv-focus-animation flex flex-col items-center p-tv-2 transition-transform ${
                activeNav === "stories" ? "scale-110" : "hover:scale-110"
              }`}
            >
              <Image
                src={navImages.stories}
                alt="Stories"
                width={150}
                height={100}
                className="r-img-md object-contain"
                loading="eager"
                quality={90}
                unoptimized
              />
            </a>
            <a
              onClick={() => handleNavClick("videos")}
              href="#videos"
              className={`tv-focus-animation flex flex-col items-center p-tv-2 transition-transform ${
                activeNav === "videos" ? "scale-110" : "hover:scale-110"
              }`}
            >
              <Image
                src={navImages.videos}
                alt="Videos"
                width={150}
                height={100}
                className="r-img-md object-contain"
                loading="eager"
                quality={90}
                unoptimized
              />
            </a>
            <a
              onClick={() => handleNavClick("movies")}
              href="#movies"
              className={`tv-focus-animation flex flex-col items-center p-tv-2 transition-transform ${
                activeNav === "movies" ? "scale-110" : "hover:scale-110"
              }`}
            >
              <Image
                src={navImages.movies}
                alt="Movies"
                width={150}
                height={100}
                className="r-img-md object-contain"
                loading="eager"
                quality={90}
                unoptimized
              />
            </a>
          </div>

          {/* Circular Timer */}
          <div className="flex items-center mr-[2.5vw]">
            <CircularTimer totalMinutes={60} cMinutes={1} />
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main
        ref={mainRef}
        className="absolute top-[15vh] left-0 w-full z-10 overflow-hidden"
        style={{
          height: `calc(100vh - 15vh)`, // Subtracting nav height and grass height
          paddingLeft: "var(--space-lg)",
          paddingRight: "var(--space-lg)",
        }}
      >
        {activeNav === "home" && (
          <Home
            stories={stories}
            videos={funnyVideos}
            series={series}
            movies={movies}
          />
        )}
        {activeNav === "stories" && <Stories stories={stories} />}

        {activeNav === "videos" && <MostViewedVideo videos={videos} />}

        {activeNav === "movies" && (
          <MoviesAndStories series={series} movies={movies} />
        )}
      </main>

      {/* Responsive helper during development */}
      <ResponsiveHelper />
    </div>
  );
};

// Animated Clouds Component
const AnimatedClouds: FC = () => {
  const isClient = useClientSideRendering();
  const [cloudElements, setCloudElements] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    if (!isClient) return;

    const largeCloudCount = 55;
    const smallCloudCount = 40;
    const newCloudElements: React.ReactNode[] = [];

    // Large clouds - distribute them across the entire width with emphasis on left edge
    for (let i = 0; i < largeCloudCount; i++) {
      const cloudNum = (i % 10) + 1;

      // Ensure clouds start from the left edge and extend beyond
      // For the first few clouds, position them at or beyond the left edge
      let left;
      if (i < 5) {
        // Position first few clouds from -10% to 5% to ensure left edge coverage
        left = -10 + i * 3;
      } else {
        // Distribute the rest evenly
        left = ((i - 5) / (largeCloudCount - 5)) * 105;
      }

      // Add a smaller random variation
      left += Math.random() * 6 - 3;

      // Keep large clouds in the upper part of the sky
      const top = Math.random() * 20;
      // Make clouds move faster
      const duration = 5 + Math.random() * 10;
      const delay = Math.random() * 2;
      // Increase visibility with transform scale and opacity pulsing
      const scale = 0.8 + Math.random() * 0.5;

      newCloudElements.push(
        <div
          key={`cloud-${i}`}
          className="absolute"
          style={{
            top: `${top}%`,
            left: `${left}%`,
            animation: `float-horizontal ${duration}s linear infinite ${delay}s, cloud-pulse 6s ease-in-out infinite ${delay}s`,
            zIndex: Math.floor(Math.random() * 3),
            transform: `scale(${scale})`,
            filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.1))",
          }}
        >
          <Image
            src={`/images/kids/animation/cloud${cloudNum}.svg`}
            alt="Cloud"
            width={100}
            height={50}
            className="w-auto h-[clamp(30px,calc(8vh * var(--scale-factor)),80px)]"
          />
        </div>
      );
    }

    // Small clouds - distribute them evenly across the entire width
    for (let i = 0; i < smallCloudCount; i++) {
      const cloudNum = (i % 6) + 1;
      // Ensure even distribution across the width
      const left = (i / smallCloudCount) * 100 + (Math.random() * 10 - 5); // Distribute evenly with some randomness
      // Position small clouds in the middle part of the sky
      const top = 5 + Math.random() * 15;
      // Make small clouds move faster too
      const duration = 6 + Math.random() * 6; // Much faster movement (was 12-22, now 6-12)
      const delay = Math.random() * 3;
      const scale = 0.7 + Math.random() * 0.4; // Slightly larger

      newCloudElements.push(
        <div
          key={`small-cloud-${i}`}
          className="absolute"
          style={{
            top: `${top}%`,
            left: `${left}%`,
            animation: `float-horizontal ${duration}s linear infinite ${delay}s, cloud-pulse 4s ease-in-out infinite ${delay}s`,
            zIndex: Math.floor(Math.random() * 3),
            transform: `scale(${scale})`,
            filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.1))",
          }}
        >
          <Image
            src={`/images/kids/animation/cloud_small${cloudNum}.svg`}
            alt="Small Cloud"
            width={60}
            height={30}
            className="w-auto h-[clamp(20px,calc(5vh * var(--scale-factor)),40px)]"
          />
        </div>
      );
    }

    setCloudElements(newCloudElements);
  }, [isClient]);

  return (
    <div className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden">
      {cloudElements}
    </div>
  );
};

// Animated Butterflies Component
const AnimatedButterflies: FC = () => {
  const isClient = useClientSideRendering();
  const [butterflyElements, setButterflyElements] = useState<React.ReactNode[]>(
    []
  );

  useEffect(() => {
    if (!isClient) return;

    const butterflyCount = 15;
    const newButterflyElements: React.ReactNode[] = [];

    for (let i = 0; i < butterflyCount; i++) {
      const butterflyNum = (i % 6) + 1;

      // Position butterflies closer to or on the grass (bottom of the screen)
      // Using bottom positioning instead of top to place them on or near grass
      const bottom = Math.random() * 10 + 2; // 2-22% from bottom
      const left = Math.random() * 85;
      const duration = 30 + Math.random() * 20;
      const delay = Math.random() * 10;
      const scale = 0.3 + Math.random() * 0.4; // Slightly smaller scale for better proportions

      newButterflyElements.push(
        <div
          key={`butterfly-${i}`}
          className="absolute"
          style={{
            bottom: `${bottom}%`,
            left: `${left}%`,
            animation: `butterfly-fly ${duration}s ease-in-out infinite ${delay}s`,
            transform: `scale(${scale})`,
            zIndex: 45, // Above content but below grass
          }}
        >
          <Image
            src={`/images/kids/animation/butterfly${butterflyNum}.svg`}
            alt="Butterfly"
            width={40}
            height={40}
            className="w-auto h-[clamp(20px,6vh,50px)] butterfly-wing"
          />
        </div>
      );
    }

    setButterflyElements(newButterflyElements);
  }, [isClient]);

  return (
    <div className="absolute top-0 left-0 w-full h-full z-40 overflow-hidden pointer-events-none">
      {butterflyElements}
    </div>
  );
};

// Animated Grass Component
const AnimatedGrass: FC = () => {
  const isClient = useClientSideRendering();
  const [grassElements, setGrassElements] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    if (!isClient) return;

    const longGrassCount = 20;
    const smallGrassCount = 200; // Reduced from 300
    const newGrassElements: React.ReactNode[] = [];

    // Long grass with height variations - reduce height
    for (let i = 0; i < longGrassCount; i++) {
      const grassNum = (i % 5) + 1;
      const left = (i / longGrassCount) * 100 + (Math.random() * 5 - 2.5);
      // Speed up animation by reducing duration
      const duration = 1 + Math.random() * 1.5; // Faster animation
      const delay = Math.random() * 0.1;

      // Reduce the heights of grass
      const heightScale = 0.5 + Math.random() * 0.4; // Reduced from 0.7 + 0.6

      newGrassElements.push(
        <div
          key={`grass-long-${i}`}
          className="absolute bottom-0"
          style={{
            left: `${left}%`,
            animation: `sway ${duration}s ease-in-out infinite ${delay}s`,
            zIndex: 53,
            transform: `scaleY(${heightScale})`,
            transformOrigin: "bottom",
          }}
        >
          <Image
            src={`/images/kids/animation/grass_long${grassNum}.svg`}
            alt="Grass"
            width={120}
            height={80}
            className="w-auto h-[clamp(20px,calc(8vh * var(--scale-factor)),80px)]" // Reduced from 15vh
            loading="lazy"
            unoptimized
          />
        </div>
      );
    }

    // Add more variety with regular grass types and varying heights - reduce height
    for (let i = 0; i < 100; i++) {
      const grassNum = (i % 12) + 1;
      const left = (i / 10) * 100 + (Math.random() * 5 - 2.5);
      // Speed up animation
      const duration = 1 + Math.random() * 1.5;
      const delay = Math.random() * 0.1;

      // Reduce the heights of grass
      const heightScale = 0.5 + Math.random() * 0.4; // Reduced from 0.7 + 0.6

      newGrassElements.push(
        <div
          key={`grass-variety-${i}`}
          className="absolute bottom-0 z-60"
          style={{
            left: `${left}%`,
            animation: `sway ${duration}s ease-in-out infinite ${delay}s`,
            zIndex: 52,
            transform: `scaleY(${heightScale})`,
            transformOrigin: "bottom",
          }}
        >
          <Image
            src={`/images/kids/animation/grass${grassNum}.svg`}
            alt="Grass Variety"
            width={100}
            height={70}
            className="w-auto h-[clamp(25px,calc(10vh * var(--scale-factor)),70px)]" // Reduced from 12vh
            loading="lazy"
            unoptimized
          />
        </div>
      );
    }

    // Small grass elements spread throughout with height variations
    for (let i = 0; i < smallGrassCount; i++) {
      const grassNum = (i % 11) + 1;
      const left = Math.random() * 98;
      // Speed up animation
      const duration = 0.5 + Math.random() * 1;
      const delay = Math.random() * 0.1;

      // Reduce the heights of small grass
      const heightScale = 0.4 + Math.random() * 0.4; // Reduced from 0.6 + 0.7

      newGrassElements.push(
        <div
          key={`grass-small-${i}`}
          className="absolute bottom-0"
          style={{
            left: `${left}%`,
            animation: `sway ${duration}s ease-in-out infinite ${delay}s`,
            zIndex: 51,
            transform: `scaleY(${heightScale})`,
            transformOrigin: "bottom",
          }}
        >
          <Image
            src={`/images/kids/animation/grass_small${grassNum}.svg`}
            alt="Small Grass"
            width={60}
            height={40}
            className="w-auto h-[clamp(15px,calc(6vh * var(--scale-factor)),40px)]" // Reduced from 8vh
            loading="lazy"
            unoptimized
          />
        </div>
      );
    }

    setGrassElements(newGrassElements);
  }, [isClient]);

  return (
    <div className="relative w-full h-[15vh] overflow-hidden z-50">
      {" "}
      {/* Reduced from 20vh */}
      {/* Base grass layer */}
      <div className="absolute bottom-0 left-0 w-full">
        <Image
          src="/images/kids/animation/grass_base.svg"
          alt="Grass Base"
          width={1920}
          height={100}
          className="w-full h-auto"
          priority
          quality={90}
          unoptimized
        />
      </div>
      {grassElements}
    </div>
  );
};

// Animated Sun Component
const AnimatedSun: FC = () => {
  const isClient = useClientSideRendering();
  const [sunClouds, setSunClouds] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    if (!isClient) return;

    // Create clouds that will partially cover the bottom of the sun
    const newSunClouds: React.ReactNode[] = [];
    const cloudCount = 4; // Number of clouds to place around the sun

    for (let i = 0; i < cloudCount; i++) {
      const cloudNum = Math.floor(Math.random() * 10) + 1; // Random cloud image
      const cloudSize = 0.6 + Math.random() * 0.4; // Random cloud size (60%-100%)

      // Position clouds to cover bottom part of sun
      const horizontalPos = 20 + i * 15; // Distribute horizontally across sun's width
      const verticalPos = 80 - Math.random() * 10; // Position at ~70-80% down the sun

      newSunClouds.push(
        <div
          key={`sun-cloud-${i}`}
          className="absolute"
          style={{
            left: `${horizontalPos}%`,
            top: `${verticalPos}%`,
            transform: `scale(${cloudSize})`,
            zIndex: 1, // Above sun
            animation: `float-horizontal ${
              8 + Math.random() * 5
            }s linear infinite ${Math.random() * 5}s`, // Faster cloud movement
          }}
        >
          <Image
            src={`/images/kids/animation/cloud${cloudNum}.svg`}
            alt="Cloud"
            width={80}
            height={40}
            unoptimized
            className="w-auto h-[clamp(20px,calc(8vh * var(--scale-factor)),60px)]"
          />
        </div>
      );
    }

    setSunClouds(newSunClouds);
  }, [isClient]);

  return (
    <div
      className="absolute z-0"
      style={{
        top: "5%",
        right: "5%",
      }}
    >
      <div className="relative">
        {/* Sun glow effect */}
        <div
          className="absolute"
          style={{
            width: "120%",
            height: "120%",
            top: "-10%",
            left: "-10%",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(253,231,96,0.5) 0%, rgba(253,231,96,0) 70%)",
            animation: "pulse 5s ease-in-out infinite",
          }}
        ></div>

        <Image
          src="/images/kids/animation/sun.svg"
          alt="Sun"
          width={200}
          height={200}
          unoptimized
          className="w-auto opacity-100 h-[clamp(100px,calc(20vh * var(--scale-factor)),200px)]"
          style={{
            animation: "rotate 60s linear infinite",
            filter: "drop-shadow(0 0 15px rgba(255, 191, 0, 0.4))",
          }}
        />

        {/* Sun reflection */}
        <div
          className="absolute top-[45%] left-[45%] w-[10%] h-[10%] rounded-full bg-white opacity-80"
          style={{
            animation: "shine 3s ease-in-out infinite",
            boxShadow: "0 0 10px 5px rgba(255,255,255,0.8)",
          }}
        ></div>

        {/* Clouds covering bottom of sun */}
        {sunClouds}
      </div>
    </div>
  );
};

export default KidsPage;
