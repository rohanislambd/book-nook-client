"use client";

import { useState, useEffect } from "react";
import { Search, RotateCw } from "lucide-react";
import BookCard from "@/components/books/BookCard";
import { useBooks } from "@/context/BookContext";

const CATEGORIES = ["All", "Fiction", "Science", "History", "Kids", "Others"];

export default function AllBookPage() {
  const { books, loading, refreshBooks } = useBooks();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showOnlyAvailable, setShowOnlyAvailable] = useState<boolean>(false);

  // Automatically refresh books when navigating to or loading this page
  useEffect(() => {
    refreshBooks();
  }, [refreshBooks]);

  // Filter books based on category, search query, and availability
  const filteredBooks = books.filter((book) => {
    const matchesCategory =
      selectedCategory === "All" ||
      book.category?.toLowerCase() === selectedCategory.toLowerCase();

    const matchesSearch =
      !searchQuery.trim() ||
      book.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesAvailable = !showOnlyAvailable || (book.availableCopies ?? 0) > 0;

    return matchesCategory && matchesSearch && matchesAvailable;
  });

  const totalAvailableCount = books.filter(
    (book) => (book.availableCopies ?? 0) > 0
  ).length;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* ── Header Section ── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold tracking-tight text-[#1a3a2a] sm:text-4xl">
            All Library Books
          </h1>
          <p className="mt-1 text-sm text-stone-500">
            Showing {filteredBooks.length} of {books.length} total volumes in our
            community catalog.
          </p>
        </div>

        {/* Search & Refresh Section */}
        <div className="flex w-full items-center gap-2 sm:w-auto">
          <div className="relative w-full sm:w-80">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by book title or author..."
              className="w-full rounded-xl border border-stone-200 bg-white py-2.5 pl-10 pr-4 text-sm text-stone-800 placeholder-stone-400 shadow-2xs focus:border-[#1a3a2a] focus:outline-none focus:ring-1 focus:ring-[#1a3a2a]"
            />
          </div>

          <button
            type="button"
            onClick={() => refreshBooks()}
            disabled={loading}
            title="Refresh library catalog"
            className="flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-stone-200 bg-white text-stone-600 shadow-2xs transition-colors hover:bg-stone-50 hover:text-[#1a3a2a] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <RotateCw className={`size-4 ${loading ? "animate-spin text-[#1a3a2a]" : ""}`} />
          </button>
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="my-6 border-t border-stone-200" />

      {/* ── Filters Section ── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {CATEGORIES.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-lg px-4 py-1.5 text-xs font-semibold transition-colors sm:text-sm cursor-pointer ${
                  isActive
                    ? "bg-[#1a3a2a] text-white"
                    : "border border-stone-200 bg-white text-stone-700 hover:bg-stone-50"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Show Only Available Checkbox */}
        <label className="flex cursor-pointer items-center gap-2 select-none text-xs font-medium text-stone-700 sm:text-sm">
          <input
            type="checkbox"
            checked={showOnlyAvailable}
            onChange={(e) => setShowOnlyAvailable(e.target.checked)}
            className="size-4 rounded border-stone-300 accent-[#1a3a2a] cursor-pointer"
          />
          <span>Show Only Available Copies ({totalAvailableCount})</span>
        </label>
      </div>

      {/* ── Books Grid ── */}
      {loading ? (
        <div className="py-20 text-center text-sm text-stone-500">
          Loading library catalog...
        </div>
      ) : filteredBooks.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-base font-semibold text-stone-700">
            No books found
          </p>
          <p className="mt-1 text-sm text-stone-500">
            Try adjusting your search or category filter.
          </p>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredBooks.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}
