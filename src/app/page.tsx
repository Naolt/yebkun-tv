"use client";

import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [loadingBar, setLoadingBar] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingBar((prev) => prev + 10);
    }, 400);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (loadingBar === 100) {
      router.push("/login");
    }
  }, [loadingBar, router]);

  return (
    <section className="flex flex-col items-center justify-center h-screen relative">
      <Image
        src="/images/start_screen/back-pattern.png"
        alt=""
        width={1920}
        height={1080}
        className="w-full h-full object-cover absolute top-0 left-0"
      />
      {/* logo */}
      <Image
        src="/images/start_screen/app_icon.png"
        alt="logo"
        width={1920}
        height={1080}
        className="w-[341px] h-[424px] object-cover z-10"
      />
      {/* horizontal loading bar */}
      <Progress
        className="w-[341px] h-[9px] z-10 mt-[41px]"
        value={loadingBar}
      />

      {/*  company logo at the bottom */}
      <Image
        src="/images/start_screen/company-logo.png"
        alt="company logo"
        width={1920}
        height={1080}
        className="w-[119px] h-[48.5px] object-cover z-10 absolute bottom-[36px] left-[50%] translate-x-[-50%]"
      />
    </section>
  );
}
