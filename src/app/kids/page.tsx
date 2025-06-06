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
import HomeIcon from "/public/images/kids/nav/home.svg";
import HomeActiveIcon from "/public/images/kids/nav/home_active.svg";
import MoviesIcon from "/public/images/kids/nav/movies.svg";
import MoviesActiveIcon from "/public/images/kids/nav/movies_active.svg";
import StoriesIcon from "/public/images/kids/nav/stories.svg";
import StoriesActiveIcon from "/public/images/kids/nav/stories_active.svg";
import VideosIcon from "/public/images/kids/nav/videos.svg";
import VideosActiveIcon from "/public/images/kids/nav/videos_active.svg";

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

const KidsPage: FC = () => {
  const [activeNav, setActiveNav] = useState<string>("home");
  const audioRef = useRef<HTMLAudioElement>(null);
  const clickSoundRef = useRef<HTMLAudioElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);

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
  console.log("check the most viewed videos", videos);

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Background Audio - set to loop and persist */}
      {/* <audio
        ref={audioRef}
        src="/images/kids/animation/birds.mp3"
        loop
        preload="auto"
        className="hidden"
      /> */}

      <audio
        ref={clickSoundRef}
        src="/audio/click.mp3"
        preload="auto"
        className="hidden"
      />

      {/* Animated Background Elements - Cloud GIF that includes sun */}
      <div className="absolute top-0 left-0 w-full h-[30%] z-1 overflow-hidden">
        <Image
          src="/images/kids/cloud.gif"
          alt="Animated Clouds and Sun"
          fill
          className="object-cover"
          priority
          unoptimized
        />
      </div>

      {/* Custom background with sky only at top 20% */}
      <div
        className="absolute inset-0 z-0 top-[10%] h-[80%]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 100%)",
        }}
      ></div>

      {/* Footer animation with grass and butterflies */}
      <div className="absolute bottom-0 left-0 w-full z-50 h-[10%] bg-transparent">
        <Image
          src="/images/kids/Footer.gif"
          alt="Animated Footer with Grass and Butterflies"
          width={1920}
          height={200}
          className="w-full h-full"
          priority
          unoptimized
        />
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
          <div className="flex items-center justify-center">
            <a
              onClick={() => handleNavClick("home")}
              href="#home"
              className={`tv-focus-animation flex flex-col items-center transition-transform ${
                activeNav === "home" ? "scale-110" : "hover:scale-110"
              }`}
            >
              {activeNav === "home" ? (
                <HomeActiveIcon
                  style={{
                    width: "90px",
                    height: "100px",
                    marginLeft: "25px",
                    marginRight: "25px",
                    padding: "0 0 0 0",
                  }}
                />
              ) : (
                <HomeIcon
                  style={{
                    width: "90px",
                    height: "100px",
                    marginLeft: "25px",
                    marginRight: "25px",
                    padding: "0 0 0 0",
                  }}
                />
              )}
            </a>
            <a
              onClick={() => handleNavClick("stories")}
              href="#stories"
              className={`tv-focus-animation flex flex-col items-center transition-transform ${
                activeNav === "stories" ? "scale-110" : "hover:scale-110"
              }`}
            >
              {activeNav === "stories" ? (
                <StoriesActiveIcon
                  style={{
                    width: "90px",
                    height: "100px",
                    marginLeft: "25px",
                    marginRight: "25px",
                    padding: "0 0 0 0",
                  }}
                />
              ) : (
                <StoriesIcon
                  style={{
                    width: "90px",
                    height: "100px",
                    marginLeft: "25px",
                    marginRight: "25px",
                    padding: "0 0 0 0",
                  }}
                />
              )}
            </a>
            <a
              onClick={() => handleNavClick("videos")}
              href="#videos"
              className={`tv-focus-animation flex flex-col items-center transition-transform ${
                activeNav === "videos" ? "scale-110" : "hover:scale-110"
              }`}
            >
              {activeNav === "videos" ? (
                <VideosActiveIcon
                  style={{
                    width: "90px",
                    height: "100px",
                    marginLeft: "25px",
                    marginRight: "25px",
                    padding: "0 0 0 0",
                  }}
                />
              ) : (
                <VideosIcon
                  style={{
                    width: "90px",
                    height: "100px",
                    marginLeft: "25px",
                    marginRight: "25px",
                    padding: "0 0 0 0",
                  }}
                />
              )}
            </a>
            <a
              onClick={() => handleNavClick("movies")}
              href="#movies"
              className={`tv-focus-animation flex flex-col items-center transition-transform ${
                activeNav === "movies" ? "scale-110" : "hover:scale-110"
              }`}
            >
              {activeNav === "movies" ? (
                <MoviesActiveIcon
                  style={{
                    width: "90px",
                    height: "100px",
                    marginLeft: "25px",
                    marginRight: "25px",
                    padding: "0 0 0 0",
                  }}
                />
              ) : (
                <MoviesIcon
                  style={{
                    width: "90px",
                    height: "100px",
                    marginLeft: "25px",
                    marginRight: "25px",
                    padding: "0 0 0 0",
                  }}
                />
              )}
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
          height: `calc(100vh - 15vh)`,
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

export default KidsPage;
