import { getTokenFromServer } from "@/lib/getTokenFromServer";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {  PlusCircle, Pencil, Trash2 } from "lucide-react";
import { Book } from "@/types/type";
import MyBookEditDialog from "@/components/mybooks/MyBookEditDialog";
import MyBookDeleteDialog from "@/components/mybooks/MyBookDeleteDialog";



const MyBookPage = async () => {
  let books: Book[] = [];
 

try {
  const token = await getTokenFromServer();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/my-book`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch books: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  books = Array.isArray(data) ? data : [];
    
} catch (error) {
  console.error("Error fetching books:", error);
  // books safely defaults to []

};

  const formatDate = (dateVal?: string | Date) => {
    if (!dateVal) return "N/A";
    try {
      const d = new Date(dateVal);
      if (isNaN(d.getTime())) return "N/A";
      return d.toLocaleDateString("en-US", {
        month: "numeric",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return "N/A";
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Top Header Section ── */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
         

            {/* Title */}
            <h1 className="font-heading  mt-1 text-3xl font-bold tracking-tight text-[#1a3a2a] sm:text-4xl">
              My Contributed Books
            </h1>

            {/* Subtitle */}
            <p className="mt-1.5 text-sm text-stone-500 sm:text-base">
              Manage the books you have added to BookNook. You can update
              details or remove volumes at any time.
            </p>
          </div>

        
          <div className="flex flex-wrap items-center gap-3">
            {/* Add New Book Button */}
            <Link
              href="/add-book"
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#1a3a2a] px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-xs transition-colors hover:bg-[#142e21]"
            >
              <PlusCircle className="size-4" />
              <span>Add New Book</span>
            </Link>
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="my-6 border-t border-stone-200/80 sm:my-8" />

        {/* ── Table Card Container (Desktop & Tablet: md+) ── */}
        <div className="hidden overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-2xs md:block">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-stone-200/70 bg-stone-50/40">
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-stone-400">
                    BOOK
                  </th>
                  <th className="px-4 py-4 text-center text-xs font-bold uppercase tracking-wider text-stone-400">
                    CATEGORY
                  </th>
                  <th className="px-4 py-4 text-center text-xs font-bold uppercase tracking-wider text-stone-400">
                    COPIES STATUS
                  </th>
                  <th className="px-4 py-4 text-center text-xs font-bold uppercase tracking-wider text-stone-400">
                    ADDED DATE
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-stone-400">
                    ACTIONS
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {books.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-12 text-center text-sm text-stone-500"
                    >
                      No contributed books found.
                    </td>
                  </tr>
                ) : (
                  books.map((book) => (
                    <tr
                      key={book._id}
                      className="transition-colors hover:bg-stone-50/60"
                    >
                      {/* BOOK Cell */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="relative h-14 w-12 shrink-0 overflow-hidden rounded-lg border border-stone-200/50 bg-stone-100 shadow-2xs sm:h-16 sm:w-13">
                            <Image
                              src={book.coverImage || "/placeholder-book.jpg"}
                              alt={book.title}
                              fill
                              sizes="56px"
                              className="object-cover"
                            />
                          </div>
                          <div className="min-w-0">
                            <h3 className="font-heading text-sm font-bold text-stone-900 sm:text-base line-clamp-1">
                              {book.title}
                            </h3>
                            <p className="mt-0.5 text-xs text-stone-500 font-normal line-clamp-1">
                              {book.author}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* CATEGORY Cell */}
                      <td className="px-4 py-4 text-center">
                        <span className="inline-flex items-center rounded-full border border-stone-200/50 bg-[#1B4332]/10 px-3.5 py-1 text-xs text-[#1B4332] font-bold">
                          {book.category}
                        </span>
                      </td>

                      {/* COPIES STATUS Cell */}
                      <td className="px-4 py-4 text-center">
                        <span className="text-xs font-semibold text-stone-800 sm:text-sm whitespace-nowrap">
                          {book.availableCopies ?? book.totalCopies ?? 0} /{" "}
                          {book.totalCopies ?? 0} Available
                        </span>
                      </td>

                      {/* ADDED DATE Cell */}
                      <td className="px-4 py-4 text-center">
                        <span className="text-xs text-stone-500 sm:text-sm whitespace-nowrap">
                          {formatDate(book.createdAt)}
                        </span>
                      </td>

                      {/* ACTIONS Cell */}
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {/* edit my book  */}
                            <MyBookEditDialog book={book}/>

                           {/* delete my book */}
                           <MyBookDeleteDialog  book={book}/>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Mobile Responsive View (< md) ── */}
        <div className="flex flex-col gap-4 md:hidden">
          {books.length === 0 ? (
            <div className="rounded-2xl border border-stone-200/80 bg-white p-8 text-center text-sm text-stone-500 shadow-sm">
              No contributed books found.
            </div>
          ) : (
            books.map((book) => (
              <div
                key={book._id}
                className="rounded-2xl border border-stone-200/80 bg-white p-4 shadow-sm transition-shadow hover:shadow-md sm:p-5"
              >
                <div className="flex items-start gap-3.5">
                  {/* Cover Thumbnail */}
                  <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-xl border border-stone-200/60 bg-stone-100 shadow-xs">
                    <Image
                      src={book.coverImage || "/placeholder-book.jpg"}
                      alt={book.title}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>

                  {/* Book Info */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center rounded-full border border-stone-200/60 bg-[#1B4332]/10 px-2.5 py-0.5 text-[11px] font-bold text-[#1B4332]">
                        {book.category}
                      </span>
                      <span className="text-[11px] text-stone-400">
                        {formatDate(book.createdAt)}
                      </span>
                    </div>

                    <h3 className="font-heading  mt-1 text-sm font-bold text-stone-900 line-clamp-1">
                      {book.title}
                    </h3>
                    <p className="text-xs text-stone-500 line-clamp-1">
                      {book.author}
                    </p>

                    <p className="mt-1 text-xs font-semibold text-stone-700">
                      {book.availableCopies ?? book.totalCopies ?? 0} /{" "}
                      {book.totalCopies ?? 0} Available
                    </p>
                  </div>
                </div>

                {/* Actions for Mobile */}
                <div className="mt-3.5 flex items-center justify-end gap-2.5 border-t border-stone-100 pt-3">
                  <button
                    type="button"
                    className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-stone-200 bg-white py-2 text-xs font-semibold text-stone-700 shadow-2xs transition-colors hover:bg-stone-50 cursor-pointer"
                  >
                    <Pencil className="size-3.5 text-stone-600" />
                    <span>Edit</span>
                  </button>

                  <button
                    type="button"
                    className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-red-200 bg-red-50/50 py-2 text-xs font-semibold text-red-600 shadow-2xs transition-colors hover:bg-red-100/70 cursor-pointer"
                  >
                    <Trash2 className="size-3.5 text-red-500" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MyBookPage;
