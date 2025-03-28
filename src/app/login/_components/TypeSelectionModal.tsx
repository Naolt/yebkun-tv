import { Dialog } from "@/components/ui/dialog";
import { DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import Link from "next/link";

const cards = [
  {
    image1: {
      src: "/icons/kids.svg",
      alt: "kids",
    },
    image2: {
      src: "/icons/zarok.svg",
      alt: "zarok",
    },
    link: "#",
  },
  {
    image1: {
      src: "/icons/adult.svg",
      alt: "adult",
    },
    image2: {
      src: "/icons/malbat.svg",
      alt: "malbat",
    },
    link: "#",
  },
];

function TypeSelectionModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {/* make the width 941 + 375 + 109 */}
      <DialogContent className="!max-w-screen h-screen bg-transparent">
        <div className="flex items-center justify-center gap-[99px]">
          {cards.map((card) => (
            <Card key={card.link} {...card} />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Card({
  image1,
  image2,
  link,
}: {
  image1: {
    src: string;
    alt: string;
  };
  image2: {
    src: string;
    alt: string;
  };
  link: string;
}) {
  return (
    <div className="w-[375px] h-[560px] bg-white rounded-[25px] flex flex-col items-center gap-2">
      <Image
        src={image1.src}
        alt={image1.alt}
        width={1920}
        height={1080}
        className="w-[375px] h-[375px] object-cover"
      />
      <Image
        src={image2.src}
        alt={image2.alt}
        width={1920}
        height={1080}
        className="w-[340px] h-[101px] object-cover"
      />
      <Link href={link}>
        <Button className="w-[340px] mt-[14px] bg-[#1BC469] hover:bg-[#1BC469]/90 text-white font-semibold text-[28px] rounded-[30px] h-[50px] -translate-y-5">
          Start Now
        </Button>
      </Link>
    </div>
  );
}

export default TypeSelectionModal;
