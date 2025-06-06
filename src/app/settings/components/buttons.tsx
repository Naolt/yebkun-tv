import { useState } from "react";

export const Buttons = ({
  content,
  isSuccess = false,
}: {
  content: string;
  isSuccess?: boolean;
}) => {
  const [isActive, setIsActive] = useState(isSuccess);

  return (
    <button
      className={`w-[5vw] h-[2vh] rounded-[5vh] border-none flex items-center justify-center transition-colors ${
        isActive
          ? "bg-[#1BC469] text-[#FFFFFF]"
          : "bg-[#F2F2F2] text-[#64748B]"
      }`}
      onClick={() => setIsActive(!isActive)}
    >
      <span className="text-[1.5vh] font-[genos] font-[500] flex items-center justify-center">
        {content}
      </span>
    </button>
  );
};
