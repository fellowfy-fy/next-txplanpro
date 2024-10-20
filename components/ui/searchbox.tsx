"use client";
import * as React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import clsx from "clsx";
import { Patient } from "@prisma/client";

type SearchBoxVariant = "sidebar" | "main" | "compact" | "large";

interface SearchBoxProps {
  variant?: SearchBoxVariant;
  className?: string;
  onSearch: (query: string) => void;
}

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

export function SearchBox({
  variant = "main",
  className,
  onSearch,
}: SearchBoxProps) {
  const { placeholder } = SearchBoxContent[variant];
  const { height, width, textSize } = SearchBoxStyles[variant];

  const [query, setQuery] = React.useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);

    onSearch(query);
  };

  return (
    <div
      className={clsx(
        "flex items-center border border-gray-300 rounded-full p-2 relative",
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
        value={query}
        onChange={handleSearch}
      />
      <Search className="w-5 h-5 text-gray-400 mr-3 cursor-pointer" />
    </div>
  );
}
