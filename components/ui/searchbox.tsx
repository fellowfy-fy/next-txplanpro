"use client";
import * as React from "react";
import { Input } from "@/components/ui/input"; 
import { Search } from "lucide-react"; 
import clsx from "clsx";

export function SearchBox({ className }: { className?: string }) {
  return (
    <div className={clsx("flex items-center border border-gray-300 rounded-full w-full p-2 h-12", className)}>
      <Input
        type="text"
        placeholder="Find a patient"
        className="flex-grow border-none focus:ring-0 focus:outline-none text-gray-600 placeholder-gray-400 text-[17px]"
      />
      <Search className="w-5 h-5 text-gray-400 mr-3" />
    </div>
  );
}
