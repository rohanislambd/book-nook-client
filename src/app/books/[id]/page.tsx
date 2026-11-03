import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Book } from "@/types/type";
import BorrowBookDialog from "@/components/my borrow/BorrowBookDialog";
import Image from "next/image";
import { getTokenFromServer } from "@/lib/getTokenFromServer";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface BookDetailProps {
  params: Promise<{
    id: string;
  }>;
}

async function getBook(id: string): Promise<Book | null> {
  try {
    const jwtToken = await getTokenFromServer();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
      ? `${process.env.NEXT_PUBLIC_API_URL}/books/${id}`
      : `http://localhost:8000/books/${id}`;

    const res = await fetch(apiUrl, {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    if (res.ok) {
      return await res.json();
    }
  } catch (error) {
    console.error("Error fetching book detail:", error);
  }
  return null;
}

export async function generateMetadata({
  params,
}: BookDetailProps): Promise<Metadata> {
  const { id } = await params;
  const book = await getBook(id);

  if (!book) {
    return {
      title: "Book Not Found | BookNook",
      description: "The requested volume could not be found in our catalog.",
    };
  }

  return {
    title: `${book.title} | BookNook`,
    description: book.description
      ? book.description.slice(0, 160)
      : `Explore "${book.title}" by ${book.author} on BookNook.`,
    openGraph: {
      title: `${book.title} - ${book.author} | BookNook`,
      description: book.description ? book.description.slice(0, 160) : undefined,
      images: book.coverImage ? [book.coverImage] : [],
    },
  };
}

const BookDetailPage = async ({ params }: BookDetailProps) => {
  const { id } = await params;
  const book = await getBook(id);

  if (!book) {
    notFound();
  }

  const contributorName =
    book.contributor?.name || book.userName || "Eleanor Vance";
  const contributorEmail =
    book.contributor?.email || book.userEmail || "eleanor@booknook.org";

  const formattedDate = book.createdAt
    ? new Date(book.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Feb 22, 2025";

  return (
    <div className="min-h-screen bg-[#FAF8F5] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* ── Back Navigation ── */}
        <Link
          href="/books"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 transition-colors hover:text-stone-900 sm:text-sm"
        >
          <ChevronLeft className="size-4" />
          Back to All Books
        </Link>

        {/* ── Main Book Card Container ── */}
        <div className="mt-6 overflow-hidden rounded-3xl border border-stone-200/90 bg-white shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* ── Left Side: Cream Image Area ── */}
            <div className="relative flex flex-col justify-between bg-[#F4F1EA] p-6 sm:p-8 lg:col-span-5">
              {/* Category Badge */}
              <div>
                <span className="inline-flex rounded-full bg-[#133826] px-3.5 py-1 text-xs font-semibold text-white shadow-2xs">
                  {book.category || "Fiction"}
                </span>
              </div>

              {/* Book Cover Container */}
              <div className="my-auto flex items-center justify-center py-6 sm:py-8">
                <div className="relative aspect-3/4 w-full max-w-65 overflow-hidden rounded-2xl bg-white shadow-lg sm:max-w-70">
                  <Image
                    width={300}
                    height={300}
                    src={book.coverImage || "/placeholder-book.jpg"}
                    alt={book.title}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              {/* Bottom spacing helper */}
              <div className="hidden lg:block h-6" />
            </div>

            {/* ── Right Side: Details & Actions ── */}
            <div className="flex flex-col justify-between gap-6 p-6 sm:p-8 lg:col-span-7 lg:p-10">
              {/* Header: Author & Availability */}
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#C07028]">
                    WRITTEN BY {book.author}
                  </p>

                  <span className="rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800">
                    Available: {book.availableCopies} of {book.totalCopies}{" "}
                    Copies
                  </span>
                </div>

                {/* Title */}
                <h1 className="font-heading mt-3 text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl lg:text-4xl">
                  {book.title}
                </h1>
              </div>

              {/* Synopsis & Overview */}
              <div className="rounded-2xl bg-[#FAF8F5] border font-semibold border-stone-200/80 p-5 sm:p-6 shadow-2xs">
                <p className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
                  SYNOPSIS &amp; OVERVIEW
                </p>
                <p className="mt-2 text-xs leading-relaxed text-stone-600 sm:text-sm">
                  {book.description}
                </p>
              </div>

              {/* Contributor & Catalog Info Grid */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Contributed By */}
                <div className="rounded-2xl border border-stone-200/80 bg-[#FAF8F5] p-4.5 shadow-2xs">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                    CONTRIBUTED BY
                  </p>
                  <p className="mt-1 text-sm font-bold text-stone-800">
                    {contributorName}
                  </p>
                  <p className="mt-0.5 truncate text-xs text-stone-500">
                    {contributorEmail}
                  </p>
                </div>

                {/* Catalog Date & Status */}
                <div className="rounded-2xl border border-stone-200/80 bg-[#FAF8F5] p-4.5 shadow-2xs">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                    CATALOG DATE &amp; STATUS
                  </p>
                  <p className="mt-1 text-sm font-bold text-stone-800">
                    Added {formattedDate}
                  </p>
                  <p className="mt-0.5 text-xs font-medium text-[#1F7A65]">
                    Verified Community Edition
                  </p>
                </div>
              </div>

              {/* borrow book dialog */}
              <BorrowBookDialog book={book} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailPage;
