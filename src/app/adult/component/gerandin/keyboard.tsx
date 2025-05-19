"use client";

import { useState } from "react";
import {
  ArrowRight,
  Delete,
  ChevronLeft,
  ChevronRight,
  ArrowBigUp,
  Space,
} from "lucide-react";
import { cn } from "@/lib/utils";

type KeyboardProps = {
  onKeyPress: (key: string) => void;
  isActive: boolean;
};

type KeyboardLayout = "qwerty" | "numeric" | "symbols";

export default function KeyboardComponent({
  onKeyPress,
  isActive,
}: KeyboardProps) {
  const [layout, setLayout] = useState<KeyboardLayout>("qwerty");
  const [shift, setShift] = useState(false);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  const emailDomains = ["@gmail.com", "@ymail.com", "@hotmail.com"];

  const qwertyLayout = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l", "."],
    ["shift", "z", "x", "c", "v", "b", "n", "m", "@", "backspace"],
    ["123", "<", ">", "space", "-", "_", "enter"],
  ];

  const numericLayout = [
    ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l", "."],
    ["shift", "z", "x", "c", "v", "b", "n", "m", ",", "backspace"],
    ["ABC", "<", ">", "space", "-", "_", "enter"],
  ];

  const numpadLayout = [
    ["1", "2", "3", "-"],
    ["4", "5", "6", "backspace"],
    ["7", "8", "9", "clear"],
    [".", "0", ",", "enter"],
  ];

  const handleKeyClick = (key: string) => {
    setSelectedKey(key);

    if (key === "shift") {
      setShift(!shift);
      return;
    }

    if (key === "123") {
      setLayout("numeric");
      return;
    }

    if (key === "ABC") {
      setLayout("qwerty");
      return;
    }

    if (key === "sym") {
      setLayout("symbols");
      return;
    }

    // Process actual key input
    if (key === "space") {
      onKeyPress(" ");
    } else if (key === "enter") {
      onKeyPress("enter");
    } else if (key === "backspace") {
      onKeyPress("backspace");
    } else {
      onKeyPress(shift ? key.toUpperCase() : key);
    }

    // Reset shift after a character key is pressed
    if (key !== "shift" && shift) {
      setShift(false);
    }
  };

  const renderKey = (key: string, index: number, rowIndex: number) => {
    let displayKey = key;
    const keyClass =
      "flex items-center justify-center bg-gray-800 text-white rounded-md py-2 ";
    let keyWidth = "w-10";

    // Special keys
    if (key === "backspace") {
      displayKey = "";
      return (
        <button
          key={`${rowIndex}-${index}`}
          className={cn(keyClass, "w-13 px-2", selectedKey === key && "bg-gray-600")}
          onClick={() => handleKeyClick(key)}
        >
          <Delete className="h-7 w-7" />
        </button>
      );
    }

    if (key === "shift") {
      displayKey = "";
      return (
        <button
          key={`${rowIndex}-${index}`}
          className={cn(
            keyClass,
            "w-14",
            (shift || selectedKey === key) && "bg-gray-600"
          )}
          onClick={() => handleKeyClick(key)}
        >
          <ArrowBigUp className="h-7 w-7" />
        </button>
      );
    }

    if (key === "space") {
      keyWidth = "w-32 px-5";
      displayKey = "";
      return (
        <button
          key={`${rowIndex}-${index}`}
          className={cn(
            keyClass,
            keyWidth,
            selectedKey === key && "bg-gray-600"
          )}
          onClick={() => handleKeyClick(key)}
        >
            <Space  className="h-7 w-7"/>
        </button>
      );
    }

    if (key === "enter") {
      displayKey = "";
      return (
        <button
          key={`${rowIndex}-${index}`}
          className={cn(
            "flex items-center justify-center px-5 bg-blue-600 text-white rounded-md w-12",
            selectedKey === key && "bg-blue-700"
          )}
          onClick={() => handleKeyClick(key)}
        >
          <ArrowRight className="h-5 w-5" />
        </button>
      );
    }

    if (key === "<") {
      displayKey = "";
      return (
        <button
          key={`${rowIndex}-${index}`}
          className={cn(keyClass, "w-12", selectedKey === key && "bg-gray-600")}
          onClick={() => handleKeyClick(key)}
        >
          <ChevronLeft className="h-7 w-7" />
        </button>
      );
    }

    if (key === ">") {
      displayKey = "";
      return (
        <button
          key={`${rowIndex}-${index}`}
          className={cn(keyClass, "w-12", selectedKey === key && "bg-gray-600")}
          onClick={() => handleKeyClick(key)}
        >
          <ChevronRight className="h-8 w-8" />
        </button>
      );
    }

    // Standard keys
    return (
      <button
        key={`${rowIndex}-${index}`}
        className={cn(
          keyClass,
          "w-11 h-14 px-5 ",
          selectedKey === key && "bg-gray-600"
        )}
        onClick={() => handleKeyClick(key)}
      >
        {shift ? displayKey.toUpperCase() : displayKey}
      </button>
    );
  };

  const renderLayout = () => {
    if (layout === "qwerty") {
      return (
        <div className="flex flex-col gap-2">
          {/* Email domain suggestions */}
          <div className="flex justify-center gap-2 mb-2">
            {emailDomains.map((domain, index) => (
              <button
                key={index}
                className="bg-gray-800 text-white text-base px-3 py-1 rounded-full"
                onClick={() => onKeyPress(domain)}
              >
                {domain}
              </button>
            ))}
          </div>

          {/* Keyboard rows */}
          {qwertyLayout.map((row, rowIndex) => (
            <div key={rowIndex} className="flex justify-center gap-1">
              {row.map((key, keyIndex) => renderKey(key, keyIndex, rowIndex))}
            </div>
          ))}
        </div>
      );
    } else if (layout === "numeric") {
      return (
        <div className="flex flex-col gap-2">
          {numericLayout.map((row, rowIndex) => (
            <div key={rowIndex} className="flex justify-center gap-1">
              {row.map((key, keyIndex) => renderKey(key, keyIndex, rowIndex))}
            </div>
          ))}
        </div>
      );
    } else {
      return (
        <div className="flex flex-col gap-2">
          {numpadLayout.map((row, rowIndex) => (
            <div key={rowIndex} className="flex justify-center gap-2">
              {row.map((key, keyIndex) => (
                <button
                  key={`${rowIndex}-${keyIndex}`}
                  className={cn(
                    "flex items-center justify-center bg-gray-800 text-white rounded-md w-16 h-14",
                    key === "enter" && "bg-blue-600",
                    selectedKey === key &&
                      (key === "enter" ? "bg-blue-700" : "bg-gray-600")
                  )}
                  onClick={() => handleKeyClick(key)}
                >
                  {key === "enter" ? (
                    <ArrowRight className="h-5 w-5" />
                  ) : key === "backspace" ? (
                    <Delete className="h-5 w-5" />
                  ) : (
                    key
                  )}
                </button>
              ))}
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <div
      className={cn(
        "p-4 bg-[#f2f2f2] rounded-lg shadow-lg h-full",
        isActive && "ring-2 ring-green-500"
      )}
    >
      {renderLayout()}
    </div>
  );
}
