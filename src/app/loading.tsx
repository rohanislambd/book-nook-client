import React from "react";
import { BookOpen } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex min-h-[65vh] flex-col items-center justify-center bg-[#FAF8F5] px-4 py-16 text-center">
      <div className="relative flex items-center justify-center">
        {/* Animated spinner ring */}
        <div className="size-16 animate-spin rounded-full border-4 border-stone-200 border-t-[#1a3a2a]" />
        {/* Center book icon */}
        <BookOpen className="absolute size-6 text-[#1a3a2a] animate-pulse" />
      </div>

      <p className="font-heading mt-5 text-lg font-bold text-[#1a3a2a]">
        Loading BookNook...
      </p>
      <p className="mt-1 text-xs text-stone-500">
        Fetching library catalog and community volumes
      </p>
    </div>
  );
}

