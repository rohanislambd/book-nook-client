import Link from "next/link";
import { Calendar, Clock, BookOpen } from "lucide-react";
import { getTokenFromServer } from "@/lib/getTokenFromServer";
import { BorrowRecord } from "@/types/type";
import ReturnBookButton from "@/components/my borrow/ReturnBookButton";
import Image from "next/image";

const MyBorrowPage = async () => {
  let myborrowData: BorrowRecord[] = [];

  // Try-catch block ensures the page stays online and resilient even if the server is offline
  try {
    const jwtToken = await getTokenFromServer();
    const headers: Record<string, string> = {};
    if (jwtToken) {
      headers["Authorization"] = `Bearer ${jwtToken}`;
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/borrows`, {
      headers,
      cache: "no-store",
    });

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) {
        myborrowData = data;
      }
    }
  } catch (error) {
    console.error("Error fetching borrowed books:", error);
  }

  // Format date to YYYY-MM-DD
  const formatDate = (dateVal?: string | Date) => {
    if (!dateVal) return "N/A";
    try {
      const d = new Date(dateVal);
      if (isNaN(d.getTime())) return String(dateVal);
      return d.toISOString().split("T")[0];
    } catch {
      return String(dateVal);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Top Header Section ── */}
        <div>
      

          <div className="mt-1 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="font-heading text-3xl font-bold tracking-tight text-[#1a3a2a] sm:text-4xl">
                My Borrowed Books
              </h1>
              <p className="mt-1 text-xs text-stone-500 sm:text-sm">
                Review your active borrows and return volumes when you finish reading
                to increment available copies.
              </p>
            </div>

            {/* Action button */}
            <Link
              href="/books"
              className="inline-flex self-start sm:self-auto rounded-xl bg-[#1a3a2a] px-5 py-2.5 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-[#132c1f] sm:text-sm shrink-0"
            >
              Browse More Books
            </Link>
          </div>
        </div>

        {/* ── Table Container ── */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-stone-200/90 bg-white shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              {/* Table Head */}
              <thead className="border-b border-stone-200/80 bg-[#FAF8F5]">
                <tr>
                  <th className="py-4 px-6 text-[11px] font-bold uppercase tracking-wider text-stone-500">
                    Book Cover &amp; Title
                  </th>
                  <th className="py-4 px-6 text-[11px] font-bold uppercase tracking-wider text-stone-500">
                    Borrow Date
                  </th>
                  <th className="py-4 px-6 text-[11px] font-bold uppercase tracking-wider text-stone-500">
                    Return Date
                  </th>
                  <th className="py-4 px-6 text-[11px] font-bold uppercase tracking-wider text-stone-500">
                    Circulation Status
                  </th>
                  <th className="py-4 px-6 text-right text-[11px] font-bold uppercase tracking-wider text-stone-500">
                    Action
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y divide-stone-100">
                {myborrowData.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-16 text-center">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <BookOpen className="size-8 text-stone-300" />
                        <p className="font-heading font-semibold text-stone-700 text-2xl">
                          No Active Borrows Right Now
                        </p>
                        <p className="text-xs text-stone-400">
                          Your reading list is currently clear. Explore the All Books catalog to borrow a volume for a few days!
                        </p>
                        <Link
                          href="/books"
                          className="mt-2 rounded-xl bg-[#1a3a2a] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#132c1f]"
                        >
                         Explore Library Catalog
                        </Link>
                      </div>
                    </td>
                  </tr>
                ) : (
                  myborrowData.map((borrow) => {
                    const id = borrow._id || borrow.bookId;
                    return (
                      <tr
                        key={id}
                        className="transition-colors hover:bg-stone-50/50"
                      >
                        {/* 1. Book Cover & Title */}
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3.5">
                            <div className="relative h-16 w-11 shrink-0 overflow-hidden rounded-lg border border-stone-200/60 bg-stone-100 shadow-2xs">
                              <Image
                              height={40}
                              width={20}
                                src={borrow.bookCover || "/placeholder-book.jpg"}
                                alt={borrow.bookTitle}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="flex flex-col min-w-0">
                              <span className="self-start rounded-md bg-stone-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-stone-600 mb-1">
                                {borrow.category}
                              </span>
                              <h3 className="font-heading text-sm sm:text-base font-bold text-stone-900 leading-tight line-clamp-1">
                                {borrow.bookTitle}
                              </h3>
                            </div>
                          </div>
                        </td>

                        {/* 2. Borrow Date */}
                        <td className="py-4 px-6 whitespace-nowrap">
                          <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-stone-600">
                            <Calendar className="size-4 text-stone-400 shrink-0" />
                            <span>{formatDate(borrow.borrowDate)}</span>
                          </div>
                        </td>

                        {/* 3. Return Date */}
                        <td className="py-4 px-6 whitespace-nowrap">
                          <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-[#C07028]">
                            <Clock className="size-4 text-[#C07028] shrink-0" />
                            <span>{formatDate(borrow.returnDate)}</span>
                          </div>
                        </td>

                        {/* 4. Circulation Status */}
                        <td className="py-4 px-6 whitespace-nowrap">
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200/80 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 ">
                            <span className="size-1.5 rounded-full bg-emerald-500"></span>
                            Checked Out
                          </span>
                        </td>

                        {/* 5. Action */}
                        <td className="py-4 px-6 text-right whitespace-nowrap">
                          <ReturnBookButton
                            borrowId={id}
                            bookTitle={borrow.bookTitle}
                          />
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBorrowPage;
