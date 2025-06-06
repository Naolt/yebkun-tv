import { useEffect, useRef, useState } from "react";
import NewStoriesCard from "./new_stories_card";

interface Story {
  id: string;
  url: string;
  title: string;
  thumbnail: string;
  type: "Stories" | "Videos" | "Movies" | "Series";
  views: number;
  videoType?: "series" | "movie" | "story";
}

export default function NewStories({ stories }: { stories: Story[] }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(true);

  useEffect(() => {
    const checkScroll = () => {
      const container = scrollContainerRef.current;
      if (container) {
        setShowLeftScroll(container.scrollLeft > 0);
        setShowRightScroll(
          container.scrollLeft < container.scrollWidth - container.clientWidth
        );
      }
    };

    const container = scrollContainerRef.current;
    container?.addEventListener("scroll", checkScroll);
    return () => container?.removeEventListener("scroll", checkScroll);
  }, []);

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (container) {
      // Instead of relying on finding an element, use our tv-card class width
      let cardWidth = 270; // Default HD size

      // Adjust based on screen width
      if (window.innerWidth >= 7680) {
        // 8K
        cardWidth = 490;
      } else if (window.innerWidth >= 2560) {
        // 3K/4K
        cardWidth = 390;
      } else if (window.innerWidth >= 1920) {
        // FHD
        cardWidth = 320;
      }

      const gap = 16;
      const scrollAmount = (cardWidth + gap) * (direction === "left" ? -1 : 1);

      container.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return stories.length > 0 ? (
    <div
      className="flex flex-col rounded-lg bg-black/30 backdrop-blur-sm p-4 overflow-hidden"
      style={{
        borderRadius: "var(--radius)",
        width: "fit-content",
        maxWidth: "100%",
      }}
    >
      <h5 className="text-black tv-text-title font-[500] font-genos mb-2">
        Latest Stories
      </h5>
      <div className="relative w-full">
        {showLeftScroll && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 rounded-full p-2 z-10"
            aria-label="Scroll left"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 18L9 12L15 6"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto py-2 snap-x scrollbar-hide"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            gap: "var(--space-md)",
            paddingLeft: "4px",
            paddingRight: "4px",
          }}
        >
          {stories.map((story) => (
            <div key={story.title} className="snap-start flex-shrink-0">
              <NewStoriesCard
                id={story.id}
                video={story.url}
                title={story.title}
                thumbnail={story.thumbnail}
                type={story.type}
                views={story.views}
                videoType={story.videoType}
              />
            </div>
          ))}
        </div>
        {showRightScroll && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 rounded-full p-2 z-10"
            aria-label="Scroll right"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 6L15 12L9 18"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  ) : (
    <div className="text-black p-10 text-2xl font-bold flex justify-center items-center h-screen"></div>
  );
}
