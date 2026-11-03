"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Book } from "@/types/type";

interface CategoryItem {
  name: string;
  letter: string;
  subtext: string;
}

interface ReviewItem {
  id: number;
  quote: string;
  author: string;
  borrowed: string;
  avatar: string;
}

const categories: CategoryItem[] = [
  {
    name: "Fiction",
    letter: "F",
    subtext: "Verified community editions",
  },
  {
    name: "Science",
    letter: "S",
    subtext: "Verified community editions",
  },
  {
    name: "History",
    letter: "H",
    subtext: "Verified community editions",
  },
  {
    name: "Kids",
    letter: "K",
    subtext: "Verified community editions",
  },
  {
    name: "Others",
    letter: "O",
    subtext: "Verified community editions",
  },
];

const reviews: ReviewItem[] = [
  {
    id: 1,
    quote:
      "BookNook made it effortless to share my duplicate hardcovers of Carl Sagan and Ann Druyan with university students in our neighborhood.",
    author: "Dr. Aris Thome",
    borrowed: "Cosmos: Possible Worlds",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop",
  },
  {
    id: 2,
    quote:
      "The Kids section is a treasure trove! My daughter loved The Wild Robot, and returning it digitally took literally two seconds.",
    author: "Clara Lin",
    borrowed: "The Wild Robot",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=120&auto=format&fit=crop",
  },
  {
    id: 3,
    quote:
      "I appreciate the real-time copy counter and no-double-borrow rules—it keeps high-demand design and history books circulating fairly.",
    author: "Tariq Mahmood",
    borrowed: "The Design of Everyday Things",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=120&auto=format&fit=crop",
  },
  {
    id: 4,
    quote:
      "Clean typography, warm paper tones, and zero clutter. BookNook feels like stepping into a classic mahogany reading room.",
    author: "Sofia Rostova",
    borrowed: "The Silk Roads",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop",
  },
];

interface Props {
  books?: Book[];
}

export default function TopCategoriesAndReviewsClient({ books = [] }: Props) {
  const getCategoryCount = (categoryName: string) => {
    return books.filter(
      (b) => b.category?.toLowerCase() === categoryName.toLowerCase(),
    ).length;
  };

  return (
    <section className="w-full bg-[#FAF8F5] py-16 sm:py-20 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10 xl:gap-14">
          {/* ── Left Column: Top Categories (5 cols) ── */}
          <div className="flex flex-col lg:col-span-5">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <h2 className="font-heading mt-1.5 text-3xl font-bold tracking-tight text-[#1a3a2a] sm:text-4xl">
                Top Categories
              </h2>
              <p className="mt-2 text-xs leading-relaxed text-stone-600 sm:text-sm">
                Filter our collection by discipline. Click any shelf below to jump
                directly to matching volumes.
              </p>
            </motion.div>

            {/* Category Rows List */}
            <div className="mt-6 flex flex-col space-y-3 sm:space-y-3.5">
              {categories.map((cat, index) => {
                const count = getCategoryCount(cat.name);
                return (
                  <motion.div
                    key={cat.name}
                    initial={{ opacity: 0, x: -24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.08,
                      ease: "easeOut",
                    }}
                    whileHover={{ x: 6, transition: { duration: 0.2 } }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      href={`/books?category=${encodeURIComponent(cat.name)}`}
                      className="group flex items-center justify-between rounded-2xl border border-stone-200/90 bg-white p-3.5 shadow-2xs transition-all duration-200 hover:border-stone-300 hover:shadow-md sm:p-4 cursor-pointer"
                    >
                      {/* Left: Letter Badge & Category Info */}
                      <div className="flex items-center gap-3.5">
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-stone-100 font-heading text-sm font-bold text-stone-800 transition-colors group-hover:bg-[#1a3a2a] group-hover:text-amber-400">
                          {cat.letter}
                        </div>
                        <div className="flex flex-col leading-tight">
                          <span className="font-heading text-sm font-bold text-stone-900 transition-colors group-hover:text-[#1a3a2a] sm:text-base">
                            {cat.name} Collection
                          </span>
                          <span className="text-[11px] text-stone-400 sm:text-xs">
                            {cat.subtext}
                          </span>
                        </div>
                      </div>

                      {/* Right: Book Count & Chevron */}
                      <div className="flex items-center gap-2">
                        {count > 0 && (
                          <span className="rounded-full bg-stone-100 px-2 py-0.5 text-[11px] font-semibold text-stone-600 transition-colors group-hover:bg-[#1a3a2a]/10 group-hover:text-[#1a3a2a]">
                            {count} {count === 1 ? "book" : "books"}
                          </span>
                        )}
                        <ChevronRight className="size-4 text-stone-400 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-stone-700" />
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* ── Right Column: Reader Reviews (7 cols) ── */}
          <div className="flex flex-col lg:col-span-7">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <h2 className="font-heading mt-1.5 text-3xl font-bold tracking-tight text-[#1a3a2a] sm:text-4xl">
                Reader Reviews
              </h2>
              <p className="mt-2 text-xs leading-relaxed text-stone-600 sm:text-sm">
                Hear from fellow book lovers who actively contribute and borrow
                through BookNook every week.
              </p>
            </motion.div>

            {/* Reviews 2x2 Grid */}
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {reviews.map((rev, index) => (
                <motion.div
                  key={rev.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.1,
                    ease: "easeOut",
                  }}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className="flex flex-col justify-between rounded-2xl border border-stone-200/90 bg-white p-5 shadow-2xs transition-shadow duration-300 hover:shadow-xl sm:rounded-3xl sm:p-6"
                >
                  <div>
                    {/* Stars */}
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="size-3.5 fill-amber-400 text-amber-400 sm:size-4"
                        />
                      ))}
                    </div>

                    {/* Review Quote */}
                    <blockquote className="mt-3.5 text-xs italic leading-relaxed text-stone-600 sm:text-sm">
                      &ldquo;{rev.quote}&rdquo;
                    </blockquote>
                  </div>

                  {/* Reviewer Info */}
                  <div className="mt-5 flex items-center gap-3 border-t border-stone-100 pt-3.5">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                      className="relative size-9 shrink-0 overflow-hidden rounded-full ring-2 ring-stone-100 sm:size-10"
                    >
                      <Image
                        src={rev.avatar}
                        alt={rev.author}
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </motion.div>
                    <div className="flex flex-col min-w-0 leading-tight">
                      <span className="font-heading text-xs font-bold text-stone-900 truncate sm:text-sm">
                        {rev.author}
                      </span>
                      <span className="text-[10px] text-[#C26D24] font-medium truncate sm:text-[11px] mt-0.5">
                        Borrowed: {rev.borrowed}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

