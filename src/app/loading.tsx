"use client";

import React, { useEffect } from "react";
import { BookOpen } from "lucide-react";

export default function Loading() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  return (
    <div className="fixed inset-x-0 top-16 bottom-0 z-40 flex flex-col items-center justify-center bg-[#FAF8F5] px-4 text-center">
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
