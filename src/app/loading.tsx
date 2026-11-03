import React from "react";
import { BookOpen } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center bg-[#FAF8F5] px-4 py-16 text-center">
      <div className="relative flex items-center justify-center">
        {/* Animated spinner ring */}
        <div className="size-16 animate-spin rounded-full border-4 border-stone-200 border-t-[#1a3a2a]" />
        {/* Center book icon */}
        <BookOpen className="absolute size-7 text-[#1a3a2a] animate-pulse" />
      </div>

      <h2 className="font-heading mt-6 text-xl font-bold tracking-tight text-[#1a3a2a] sm:text-2xl">
        BookNook
      </h2>
      <p className="mt-1.5 text-xs text-stone-500 max-w-xs">
        Loading library and community volumes...
      </p>
    </div>
  );
}
