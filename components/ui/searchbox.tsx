"use client";
import * as React from "react";
import { Input } from "@/components/ui/input"; 
import { Search } from "lucide-react"; 
import clsx from "clsx";

type SearchBoxVariant = "sidebar" | "main" | "compact" | "large";

interface SearchBoxProps {
  variant?: SearchBoxVariant;
  className?: string;
}

// Define content variations based on variant type
const SearchBoxContent = {
  sidebar: {
    placeholder: "Search",
  },
  main: {
    placeholder: "Find a patient",
  },
  compact: {
    placeholder: "Quick search",
  },
  large: {
    placeholder: "Search for anything",
  },
};

// Define style variations based on variant type
const SearchBoxStyles = {
  sidebar: {
    height: "h-10",
    width: "w-full",
    textSize: "text-sm",
  },
  main: {
    height: "h-12",
    width: "w-full",
    textSize: "text-[17px]",
  },
  compact: {
    height: "h-8",
    width: "w-60",
    textSize: "text-xs",
  },
  large: {
    height: "h-14",
    width: "w-full",
    textSize: "text-lg",
  },
};

export function SearchBox({ variant = "main", className }: SearchBoxProps) {
  const { placeholder } = SearchBoxContent[variant];
  const { height, width, textSize } = SearchBoxStyles[variant];

  return (
    <div
      className={clsx(
        "flex items-center border border-gray-300 rounded-full p-2",
        height,
        width,
        className
      )}
    >
      <Input
        type="text"
        placeholder={placeholder}
        className={clsx(
          "flex-grow border-none focus:ring-0 focus:outline-none text-gray-600 placeholder-gray-400",
          textSize
        )}
      />
      <Search className="w-5 h-5 text-gray-400 mr-3" />
    </div>
  );
}
