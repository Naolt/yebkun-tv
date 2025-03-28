"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Image from "next/image";
import { useState } from "react";

const cards = [
  {
    id: 1,
    image: "/images/start_screen/playstore.png",
    qrCode: "/images/start_screen/qr.png",
    title: "Card 1",
  },
  {
    id: 2,
    image: "/images/start_screen/appstore.png",
    qrCode: "/images/start_screen/qr.png",
    title: "Card 2",
  },
];

function LoginModal({
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
        <LeftSection />
      </DialogContent>
    </Dialog>
  );
}

export default LoginModal;

function LeftSection() {
  const [isActive, setIsActive] = useState(false);
  return (
    <div className="relative w-fit h-fit bg-white rounded-[25px] px-[44px] flex gap-[58px] top-1/2 left-[10%] -translate-y-1/2 z-10">
      {/* bg image */}
      <Image
        src={"/images/start_screen/pattern.png"}
        alt={"bg-image"}
        width={1920}
        height={1080}
        className="w-[98%] h-[98%] object-contain absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0"
      />
      <Image
        src={"/images/start_screen/mobile-mockup.png"}
        alt={"company-logo"}
        width={1920}
        height={1080}
        className="w-[261px] h-[620.5px] object-contain my-[26px] relative z-20 bg-white"
      />

      {/* right section */}
      <div className="flex flex-col items-center">
        <h1 className="font-bold text-[90px] text-[#1C274C]">DOWNLOAD</h1>
        <p className="font-semibold text-[64px] text-[#1C274C] -translate-y-12">
          YEKBÛN APP{" "}
        </p>
        {/* cards */}
        <div className="flex gap-8 -translate-y-12">
          {cards.map((card) => (
            <Card key={card.id} image={card.image} title={card.title} />
          ))}
        </div>
        {/* Button */}
        <Button
          className="w-[295px] bg-[#1BC469] hover:bg-[#1BC469]/90 text-white font-semibold text-[28px] rounded-[30px] h-[50px] -translate-y-5"
          onClick={() => setIsActive(true)}
        >
          Start now
        </Button>
      </div>
      {isActive && <ActivationForm />}
    </div>
  );
}

function Card({ image, title }: { image: string; title: string }) {
  return (
    <div className="w-full bg-[#F2F2F2] rounded-[15px] px-[7px] py-[7px]">
      <Image
        src={image}
        alt={title}
        width={1920}
        height={1080}
        className="w-full h-[69.34px] object-contain"
      />
      <div className="w-full py-2 bg-white flex flex-col items-center gap-1 rounded-[10px] h-[149px]">
        <Image
          src={"/images/start_screen/app-logo-2.png"}
          alt={title}
          width={1920}
          height={1080}
          className="w-[78px] h-[78px] object-cover"
        />
        <div className="flex flex-col items-center m-0 p-0 ">
          <h1 className="font-semibold text-[32px] text-[#1C274C] -translate-y-2">
            YekBûn
          </h1>
          <p className="font-semibold text-[18px] text-[#101010] -translate-y-5">
            Sosialmedia Kurdî
          </p>
        </div>
      </div>

      <div className="w-full flex flex-col items-center gap-2">
        <h1 className="font-semibold text-[24px] text-[#101010]">
          Download App Now!
        </h1>
        <Image
          src={"/images/start_screen/qr.png"}
          alt={title}
          width={1920}
          height={1080}
          className="w-[104.42px] h-[104.42px] object-contain"
        />
      </div>
    </div>
  );
}

function ActivationForm() {
  return (
    <div className="h-full w-[375px] bg-white rounded-[25px] flex flex-col items-center gap-[21px] absolute left-[110%] ">
      <Image
        src={"/images/start_screen/monitor.png"}
        alt={"monitor-image"}
        width={1920}
        height={1080}
        className="w-[365px] h-[290px] object-cover"
      />
      <div className="w-[156px] flex flex-col items-center gap-[6px] bg-[#F2F2F2] rounded-[10px] p-2">
        <Image
          src={"/icons/monitorplus.svg"}
          alt={"monitor-plus-phone"}
          width={1920}
          height={1080}
          className="w-[71px] h-[53px] object-cover"
        />
        <Input
          type="text"
          placeholder="TV Type"
          className="w-full h-[23px] text-center font-medium rounded-[5px] bg-white text-[#101010] text-[18px] placeholder:text-[#000]"
        />
        <Input
          type="text"
          placeholder="Mac Address"
          className="w-full h-[23px] text-center rounded-[5px] bg-white text-[#000]/60 text-[18px] placeholder:text-[#000]/60"
        />
      </div>
      <div className="w-full flex flex-col px-[11px] gap-2">
        <p className="text-[#101010] text-[20px] font-medium flex items-center gap-2">
          <Image
            src={"/icons/monitor.svg"}
            alt={"device-icon"}
            width={1920}
            height={1080}
            className="w-[24px] h-[24px] object-cover"
          />
          Device ID
        </p>
        <InputOTP maxLength={6} className="w-full ">
          <InputOTPGroup>
            <InputOTPSlot
              index={0}
              className="w-[50px] h-[50px] text-4xl font-semibold bg-[#EEEEEE]"
            />
            <InputOTPSlot
              index={1}
              className="w-[50px] h-[50px] text-4xl font-semibold bg-[#EEEEEE]"
            />
            <InputOTPSlot
              index={2}
              className="w-[50px] h-[50px] text-4xl font-semibold bg-[#EEEEEE]"
            />
          </InputOTPGroup>
          <InputOTPSeparator className=" text-green-500" />
          <InputOTPGroup>
            <InputOTPSlot
              index={3}
              className="w-[50px] h-[50px] text-4xl font-semibold bg-[#EEEEEE]"
            />
            <InputOTPSlot
              index={4}
              className="w-[50px] h-[50px] text-4xl font-semibold bg-[#EEEEEE]"
            />
            <InputOTPSlot
              index={5}
              className="w-[50px] h-[50px] text-4xl font-semibold bg-[#EEEEEE]"
            />
          </InputOTPGroup>
        </InputOTP>
      </div>
      <div className="w-full px-[11px]">
        <div className="w-full flex items-center gap-2 bg-[#F2F2F2] rounded-[10px] px-2">
          <div className="flex items-center justify-center w-[33px] h-[33px] bg-white rounded-[10px]">
            <Image
              src={"/icons/bolt.svg"}
              alt={"bolt-icon"}
              width={1920}
              height={1080}
              className="w-[14.3px] h-[25.54px] object-cover"
            />
          </div>
          <div className="flex flex-col gap-1 items-center">
            <h3 className="text-[#101010] text-[20px] font-medium">
              Activate Your TV App
            </h3>
            <p className="text-[#101010] text-[14px]">
              To get started, simply add this to your YekBûn App
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
