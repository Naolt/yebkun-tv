"use client";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  useEffect(() => {
    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    // Navigate to login page after 5 seconds
    const timer = setTimeout(() => {
      router.push("/login");
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [router]);

  return (
    <main className="w-full h-screen overflow-hidden">
      <section className="flex flex-col items-center justify-center h-full relative">
        <Image
          src="/images/start_screen/back-pattern.png"
          alt=""
          width={1920}
          height={1080}
          className="w-full h-full object-cover absolute top-0 left-0"
          priority
        />

        <div className="flex flex-col items-center z-10 space-y-5">
          {/* logo */}
          <Image
            src="/images/start_screen/app_icon.png"
            alt="logo"
            width={1920}
            height={1080}
            className="w-[341px] h-[424px] object-cover"
            priority
          />

          {/* progress bar container with background */}
          <div className="w-[341px] bg-white/20 rounded-full p-1">
            <Progress
              className="h-[15px] bg-gray-300 rounded-full"
              value={progress}
            />
          </div>
        </div>

        {/*  company logo at the bottom */}
        <Image
          src="/images/start_screen/company-logo.png"
          alt="company logo"
          width={1920}
          height={1080}
          className="w-[119px] h-[48.5px] object-cover z-10 absolute bottom-[36px] left-[50%] translate-x-[-50%]"
          priority
        />
      </section>
    </main>
  );
}
