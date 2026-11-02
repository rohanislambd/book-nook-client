"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Book } from "@/types/type";
import { BookmarkCheck, Bookmark, X, Info } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getTokenFromClient } from "@/lib/getTokenFromClient";
import { useBooks } from "@/context/BookContext";

interface BorrowBookDialogProps {
  book: Book;
  trigger?: React.ReactNode;
}

const BorrowBookDialog = ({ book, trigger }: BorrowBookDialogProps) => {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAlreadyBorrowed, setIsAlreadyBorrowed] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  const isOutOfStock = Number(book.availableCopies ?? 0) <= 0;

  const { data: session } = authClient.useSession();
  const router = useRouter();
  const { refreshBorrows, refreshBooks } = useBooks();

  const user = session?.user;

  const token = getTokenFromClient();

  // Borrower details from session or defaults matching the design
  const borrowerName = user?.name || "Eleanor Vance";
  const borrowerEmail = user?.email || "eleanor@booknook.org";

  // Date formatting
  const today = new Date();
  const formattedBorrowDate = `${String(today.getMonth() + 1).padStart(2, "0")}/${String(today.getDate()).padStart(2, "0")}/${today.getFullYear()}`;

  const nextWeek = new Date();
  nextWeek.setDate(nextWeek.getDate() + 7);
  const defaultReturnDate = nextWeek.toISOString().split("T")[0];
  const minReturnDate = today.toISOString().split("T")[0];


  // Check if the user has already borrowed this book when the page loads
useEffect(() => {
  const checkBorrow = async () => {
    try {
      const jwtToken = await token;

      if (!jwtToken) return;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/borrows/check?bookId=${book._id}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      const borrowData = await res.json();
      setIsAlreadyBorrowed(borrowData.alreadyBorrowed);
    } catch (error) {
      console.log(error);
    } finally {
      setIsChecking(false);
    }
  };

  checkBorrow();
}, [book._id, token]);

  // Check duplicate borrow and available copies before opening the borrow modal
const handleBorrowClick = async () => {
  if (isChecking) return;

  if (isOutOfStock) {
    toast.error("This book is currently not available!");
    return;
  }

  try {
    const jwtToken = await token;

    if (!jwtToken) {
      toast.error("Please login first!");
      return;
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/borrows/check?bookId=${book._id}`,
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );

    const borrowData = await res.json();

    if (borrowData.alreadyBorrowed) {
      setIsAlreadyBorrowed(true);
      toast.error("You have already borrowed this book!");
      return;
    }

    setOpen(true);
  } catch (error) {
    toast.error("Something went wrong!");
  }
};
  // POST borrow API call to save the borrowed book
  const handleConfirmBorrow = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const returnDate = formData.get("returnDate") as string;
     const jwtToken = await token;
    try {
      const borrowPayload = {
        bookId: book._id,
        bookTitle: book.title,
        bookCover: book.coverImage,
        author: book.author,
        category: book.category,
        borrowerName,
        borrowerEmail,
        borrowDate: new Date().toISOString(),
        returnDate,
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || ""}/borrows`,
        {
          method: "POST",
          headers: {
             "Content-Type": "application/json" ,
              Authorization: `Bearer ${jwtToken}`,
            },
          body: JSON.stringify(borrowPayload),
        },
      );

      const result = await res.json();

      if (!res.ok) {
        
        toast.error(result.message || "Failed to borrow book!");
        return;
      }
      setIsAlreadyBorrowed(true);
      toast.success("Book borrowed successfully!");
      refreshBorrows();
      refreshBooks();

      setOpen(false);
      router.refresh();

    } catch {

      toast.success("Something went wrong!");
    
      setOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  // If already borrowed, show warning alert banner + changed button state
  if (isAlreadyBorrowed) {
    return (
      <div className="flex flex-col gap-3">
        {/* Active Checkout Warning Banner */}
        <div className="flex flex-col gap-2 rounded-xl border border-amber-300 bg-amber-50/80 p-3.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:p-4">
          <div className="flex items-start gap-2.5 sm:items-center">
            <Info className="mt-0.5 size-4 shrink-0 text-amber-600 sm:mt-0" />
            <p className="text-xs font-medium text-amber-900">
              You currently have a copy of this book checked out. (No Double
              Borrow Rule Active)
            </p>
          </div>
          <Link
            href="/my-borrows"
            className="shrink-0 text-xs font-bold text-stone-900 underline transition-colors hover:text-amber-900"
          >
            View in My Borrows
          </Link>
        </div>

        {/* Changed button with Double-Borrow Guard */}
        <button
          type="button"
          onClick={handleBorrowClick}
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#133826] py-3.5 px-6 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-[#18442e]"
        >
          <BookmarkCheck className="size-4" />
          Borrow This Book (Test Double-Borrow Guard)
        </button>
      </div>
    );
  }

  // If the copies are 0, disable the Borrow button and show "Not Available"
  if (isOutOfStock) {
    return trigger ? (
      React.isValidElement(trigger) ? (
        React.cloneElement(
          trigger as React.ReactElement<{
            disabled?: boolean;
            children?: React.ReactNode;
          }>,
          {
            disabled: true,
            children: "Not Available",
          },
        )
      ) : (
        trigger
      )
    ) : (
      <button
        type="button"
        disabled
        className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-stone-200 py-3.5 px-6 text-sm font-semibold text-stone-500 shadow-xs"
      >
        <Bookmark className="size-4" />
        Not Available
      </button>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          trigger ? (
            (trigger as React.ReactElement)
          ) : (
            <button
              type="button"
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#1a3a2a] py-3.5 px-6 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-[#132c1f]"
            >
              <Bookmark className="size-4" />
              Borrow Book
            </button>
          )
        }
      />

      <DialogContent
        showCloseButton={false}
        className="w-full max-w-[420px] rounded-3xl border border-stone-200/90 bg-[#FAF8F5] p-6 shadow-xl outline-none"
      >
        <form onSubmit={handleConfirmBorrow} className="flex flex-col gap-4">
          {/* ── Dialog Header ── */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#1a3a2a] text-amber-400">
                <BookmarkCheck className="size-5" />
              </div>
              <div className="flex flex-col leading-tight">
                <h2 className="font-heading text-lg font-bold text-[#1a3a2a]">
                  Borrow This Book
                </h2>
                <p className="text-xs text-stone-500">
                  Confirm your circulation details
                </p>
              </div>
            </div>

            {/* Custom Close Button */}
            <DialogClose
              render={
                <button
                  type="button"
                  className="rounded-lg p-1 text-stone-400 transition-colors hover:bg-stone-200/60 hover:text-stone-700 cursor-pointer"
                >
                  <X className="size-4" />
                </button>
              }
            />
          </div>

          {/* ── Divider ── */}
          <div className="border-t border-stone-200/80" />

          {/* ── Book Info Preview Card ── */}
          <div className="flex items-center gap-3.5 rounded-2xl border border-stone-200/80 bg-white p-3.5 shadow-2xs">
            <div className="relative h-20 w-14 shrink-0 overflow-hidden rounded-lg border border-stone-200/60 bg-stone-100">
              <Image
                src={book.coverImage || "/placeholder-book.jpg"}
                alt={book.title}
                width={100}
                height={100}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex min-w-0 flex-col">
              <span className="self-start rounded-md bg-stone-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-stone-600">
                {book.category || "General"}
              </span>
              <h3 className="font-heading mt-1 line-clamp-1 text-sm font-bold text-stone-900">
                {book.title}
              </h3>
              <p className="truncate text-xs text-stone-500">
                By {book.author}
              </p>
              <p className="mt-1 text-xs font-semibold text-[#1F7A65]">
                Available Copies: {book.availableCopies} of {book.totalCopies}
              </p>
            </div>
          </div>

          {/* ── Field 1: Borrower Name (Read-Only) ── */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-stone-600">
              Borrower Name (Read-Only)
            </label>
            <input
              type="text"
              name="borrowerName"
              readOnly
              value={borrowerName}
              className="h-11 w-full rounded-xl border border-stone-200/80 bg-[#F2EFE9] px-3.5 text-sm font-medium text-stone-700 outline-none cursor-not-allowed"
            />
          </div>

          {/* ── Field 2: Borrower Email (Read-Only) ── */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-stone-600">
              Borrower Email (Read-Only)
            </label>
            <input
              type="email"
              name="borrowerEmail"
              readOnly
              value={borrowerEmail}
              className="h-11 w-full rounded-xl border border-stone-200/80 bg-[#F2EFE9] px-3.5 text-sm font-medium text-stone-700 outline-none cursor-not-allowed"
            />
          </div>

          {/* ── Field 3 & 4: Borrow Date & Return Date ── */}
          <div className="grid grid-cols-2 gap-3">
            {/* Borrow Date */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-stone-600">
                Borrow Date
              </label>
              <input
                type="text"
                name="borrowDate"
                readOnly
                value={formattedBorrowDate}
                className="h-11 w-full rounded-xl border border-stone-200/80 bg-[#F2EFE9] px-3.5 text-sm font-medium text-stone-700 outline-none cursor-not-allowed"
              />
            </div>

            {/* Return Date */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#1a3a2a]">
                Return Date *
              </label>
              <input
                type="date"
                name="returnDate"
                required
                defaultValue={defaultReturnDate}
                min={minReturnDate}
                className="h-11 w-full rounded-xl border border-[#1a3a2a] bg-white px-3 text-sm font-medium text-stone-800 outline-none focus:ring-1 focus:ring-[#1a3a2a]"
              />
            </div>
          </div>

          {/* ── Action Buttons ── */}
          <div className="mt-1 grid grid-cols-2 gap-3">
            <DialogClose
              render={
                <button
                  type="button"
                  className="h-11 w-full cursor-pointer rounded-xl border border-stone-300 bg-white text-sm font-semibold text-stone-700 transition-colors hover:bg-stone-50"
                >
                  Cancel
                </button>
              }
            />
            <button
              type="submit"
              disabled={isSubmitting || isOutOfStock}
              className="h-11 w-full cursor-pointer rounded-xl bg-[#1a3a2a] text-sm font-semibold text-white shadow-xs transition-colors hover:bg-[#132c1f] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting
                ? "Borrowing..."
                : isOutOfStock
                  ? "Not Available"
                  : "Confirm Borrow"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BorrowBookDialog;
