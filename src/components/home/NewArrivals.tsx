import { Book } from "@/types/type";
import React from "react";
import BookCard from "../books/BookCard";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";

const NewArrivals = async () => {
  let books: Book[] = [];

  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    const res = await fetch(`${apiUrl}/bookshome`, {
      cache: "no-store",
    });

    if (res.ok) {
      const data = await res.json();
      books = Array.isArray(data) ? data : [];
    } else {
      console.error(
        `Failed to fetch new arrivals: ${res.status} ${res.statusText}`,
      );
    }
  } catch (error) {
    console.error("Error fetching new arrivals:", error);
  }

  return (
    <section className="w-full bg-[#FAF8F5]/60 py-12 sm:py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8 flex flex-col items-center text-center sm:mb-12 sm:items-start sm:text-left">
         
          <h2 className="font-heading mt-1 text-3xl font-bold tracking-tight text-[#1a3a2a] sm:text-4xl lg:text-5xl">
            New Arrivals
          </h2>
          <p className="mt-2 max-w-xl text-sm text-stone-600 sm:text-base">
            Explore the latest volumes added to the BookNook community library by
            fellow readers and archivists.
          </p>
        </div>

        {/* Books Grid / Responsive view */}
        {books.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {books.map((book, index) => (
              <BookCard key={book._id} book={book} index={index} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-stone-200/80 bg-white p-8 text-center shadow-xs sm:p-12">
            <div className="mb-3 flex size-12 items-center justify-center rounded-full bg-stone-100 text-stone-400">
              <BookOpen className="size-6" />
            </div>
            <h3 className="font-heading text-lg font-semibold text-stone-800">
              No new arrivals right now
            </h3>
            <p className="mt-1 max-w-sm text-sm text-stone-500">
              Check back soon or explore all our available books in the library.
            </p>
          </div>
        )}

        {/* See All Books Button */}
        <div className="mt-10 flex justify-center sm:mt-14">
          <Link
            href="/books"
            className="group inline-flex items-center gap-2.5 rounded-2xl bg-[#1a3a2a] px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#132c1f] hover:shadow-lg active:translate-y-0 sm:px-8 sm:py-4 sm:text-base cursor-pointer"
          >
            <span>See All Books</span>
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1 sm:size-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
