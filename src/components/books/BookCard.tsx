"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Book } from "@/types/type";
import Image from "next/image";
import { motion } from "framer-motion";

interface BookCardProps {
  book: Book;
  index?: number;
}

export default function BookCard({ book, index = 0 }: BookCardProps) {
  const isAvailable = (book.availableCopies ?? 0) > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{
        duration: 0.4,
        delay: Math.min((index % 6) * 0.08, 0.4),
        ease: "easeOut",
      }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl hover:border-stone-300"
    >
      {/* Cover Image Container */}
      <Link
        href={`/books/${book._id}`}
        className="relative aspect-video h-56 w-full overflow-hidden bg-stone-100 block cursor-pointer"
      >
        <Image
          width={300}
          height={300}
          src={book.coverImage || "/placeholder-book.jpg"}
          alt={book.title}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Subtle hover overlay */}
        <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />

        {/* Category Badge - Top Left */}
        <div className="absolute left-3 top-3 z-10">
          <span className="rounded-full bg-white/95 px-3 py-1 text-xs font-medium text-green-800 shadow-sm backdrop-blur-xs">
            {book.category}
          </span>
        </div>

        {/* Copies Badge - Top Right */}
        <div className="absolute right-3 top-3 z-10">
          {isAvailable ? (
            <span className="rounded-md bg-[#133826] px-2.5 py-1 text-xs font-bold text-[#34d399] shadow-xs">
              {book.availableCopies} Copies Left
            </span>
          ) : (
            <span className="rounded-md bg-[#8b1818] px-2.5 py-1 text-xs font-bold text-white shadow-xs">
              Not Available
            </span>
          )}
        </div>
      </Link>

      {/* Book Content */}
      <div className="flex flex-1 flex-col p-5">
        {/* Author */}
        <p className="text-[11px] font-bold uppercase tracking-wider text-[#c26d24]">
          {book.author}
        </p>

        {/* Title */}
        <h3 className="font-heading mt-1 line-clamp-1 text-lg font-bold text-stone-900 transition-colors duration-200 group-hover:text-[#1a3a2a]">
          {book.title}
        </h3>

        {/* Description */}
        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-stone-500">
          {book.description}
        </p>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Footer */}
        <div className="mt-4 flex items-center justify-between border-t border-stone-100 pt-3">
          <p className="text-xs text-stone-400">
            Added by{" "}
            <span className="font-semibold text-stone-800">
              {book.contributor?.name || "Eleanor Vance"}
            </span>
          </p>

          <motion.div whileTap={{ scale: 0.95 }}>
            <Link
              href={`/books/${book._id}`}
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#1a3a2a] px-3.5 py-2 text-xs font-semibold text-white transition-all duration-200 hover:bg-[#142e21] group-hover:bg-[#142e21]"
            >
              View Details
              <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
