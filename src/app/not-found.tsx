import Link from "next/link";
import { Home, BookOpen, Search } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Page Not Found | BookNook",
  description: "The page or volume you are looking for could not be found in our community library.",
};

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-16rem)] flex-col items-center justify-center px-4 py-16 sm:px-6 lg:px-8 text-center bg-[#FAF8F5]">
      <div className="mx-auto max-w-md">
        {/* Badge & Big 404 */}
        <div className="relative flex flex-col items-center justify-center">
          <span className="font-heading text-8xl font-black tracking-tight text-[#1a3a2a]/15 sm:text-9xl select-none">
            404
          </span>
          <div className="absolute -bottom-2 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-amber-800 shadow-2xs">
            <BookOpen className="size-3.5 text-amber-600" />
            <span>Lost in the Stacks</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="font-heading mt-8 text-2xl font-bold tracking-tight text-[#1a3a2a] sm:text-3xl">
          This Volume Cannot Be Found
        </h1>

        {/* Description */}
        <p className="mt-3 text-sm text-stone-600 leading-relaxed sm:text-base">
          The page or manuscript you are searching for might have been shelved
          elsewhere, returned to the archives, or never existed in our catalog.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          {/* Back to Home Button */}
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-[#1a3a2a] px-6 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-[#132c1f] hover:shadow-md transition-all duration-200 cursor-pointer"
          >
            <Home className="size-4" />
            <span>Back to Home</span>
          </Link>

          {/* Browse Catalog Button */}
          <Link
            href="/books"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl border border-stone-300 bg-white px-6 py-3.5 text-sm font-semibold text-stone-700 shadow-2xs hover:bg-stone-50 hover:text-stone-900 transition-colors cursor-pointer"
          >
            <Search className="size-4 text-stone-500" />
            <span>Browse All Books</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

