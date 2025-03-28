"use client";
import LoginModal from "./_components/LoginModal";
import MovieList from "./_components/MovieList";
import RightSection from "./_components/RightSection";
import { useState } from "react";
import TypeSelectionModal from "./_components/TypeSelectionModal";

export default function Login() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isTypeSelectionModalOpen, setIsTypeSelectionModalOpen] =
    useState(false);
  return (
    <section className="w-full h-screen pt-[19px] pb-[16px] px-[15px] flex gap-5 bg-[#F2F2F2]">
      {/* movie list bento grid */}
      <div className="w-full h-full">
        <MovieList openModal={() => setIsTypeSelectionModalOpen(true)} />
      </div>
      {/* add space */}
      <div
        className="w-[15vw] h-full rounded-[15px]"
        onClick={() => setIsLoginModalOpen(true)}
      >
        <RightSection />
      </div>
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
      <TypeSelectionModal
        isOpen={isTypeSelectionModalOpen}
        onClose={() => setIsTypeSelectionModalOpen(false)}
      />
    </section>
  );
}
