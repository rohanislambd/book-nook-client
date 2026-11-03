import React from "react";
import { BookOpen } from "lucide-react";

export default function MyBookLoading() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center bg-[#FDFBF7] px-4 py-16 text-center">
      <div className="relative flex items-center justify-center">
        <div className="size-16 animate-spin rounded-full border-4 border-stone-200 border-t-[#1a3a2a]" />
        <BookOpen className="absolute size-7 text-[#1a3a2a] animate-pulse" />
      </div>

      <h2 className="font-heading mt-6 text-xl font-bold tracking-tight text-[#1a3a2a] sm:text-2xl">
        BookNook
      </h2>
      <p className="mt-1 text-sm font-semibold text-stone-700">
        Loading My Contributed Books...
      </p>
      <p className="mt-1 text-xs text-stone-500 max-w-xs">
        Fetching your library volumes and circulation records
      </p>
    </div>
  );
}
