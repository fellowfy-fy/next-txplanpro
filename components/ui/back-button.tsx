"use client";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export function BackButton() {
  const router = useRouter();

  return (
    <button 
      className="flex items-center space-x-2 text-lg font-semibold hover:underline pb-4"
      onClick={() => router.back()}
    >
      <ArrowLeft className="w-4 h-4" />
      <span className="text-sm font-light">BACK TO PLANS</span>
    </button>
  );
}
