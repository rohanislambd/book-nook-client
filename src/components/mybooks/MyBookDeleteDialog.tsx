"use client";

import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Book } from "@/types/type";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { getTokenFromClient } from "@/lib/getTokenFromClient";
import { useBooks } from "@/context/BookContext";
import { useRouter } from "next/navigation";

interface MyBookDeleteDialogProps {
  book: Book;
  trigger?: React.ReactNode;
}

const MyBookDeleteDialog = ({ book, trigger }: MyBookDeleteDialogProps) => {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { refreshBooks } = useBooks();
  const router = useRouter();

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      const token = await getTokenFromClient();
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const res = await fetch(`${apiUrl}/books/${book._id}`, {
        method: "DELETE",
        headers,
      });

      const data = await res.json().catch(() => ({}));
      console.log(data);
      if (!res.ok) {
        toast.error(data.message || data.error || "Failed to delete book.");
        return;
      }

      toast.success(`"${book.title}" deleted successfully!`);
      setOpen(false);
      await refreshBooks();
      router.refresh();
    } catch (error) {
      console.error("Error deleting book:", error);
      toast.error("Failed to delete book. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger
        render={
          trigger ? (
            (trigger as React.ReactElement)
          ) : (
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50/50 px-3 py-1.5 text-xs font-semibold text-red-600 shadow-2xs transition-colors hover:bg-red-100/70 hover:text-red-700 cursor-pointer"
            >
              <Trash2 className="size-3.5 text-red-500" />
              <span>Delete</span>
            </button>
          )
        }
      />

      <AlertDialogContent className="w-full max-w-[390px] rounded-3xl border border-stone-200/90 bg-[#FAF8F5] p-6 sm:p-7 text-foreground shadow-2xl outline-none gap-0">
        <div className="flex flex-col items-center text-center">
          {/* Red Trash Icon container */}
          <div className="flex size-14 items-center justify-center rounded-2xl bg-[#FEE4E2]/70 text-[#D92D20]">
            <Trash2 className="size-6 text-[#D92D20]" strokeWidth={1.75} />
          </div>

          {/* Title */}
          <AlertDialogTitle className="font-heading mt-4 text-2xl font-bold text-[#1a3a2a]">
            Delete This Volume?
          </AlertDialogTitle>

          {/* Description */}
          <AlertDialogDescription className="mt-2.5 max-w-[280px] sm:max-w-xs text-sm text-stone-600 leading-relaxed text-center">
            Are you sure you want to permanently remove{" "}
            <span className="font-bold text-stone-800">&quot;{book.title}&quot;</span>{" "}
            from BookNook? This action cannot be undone.
          </AlertDialogDescription>

          {/* Action Buttons */}
          <div className="mt-7 grid grid-cols-2 gap-3.5 w-full">
            <button
              type="button"
              onClick={() => setOpen(false)}
              disabled={isDeleting}
              className="h-11 w-full rounded-xl border border-stone-300/90 bg-white text-sm font-semibold text-stone-700 shadow-2xs hover:bg-stone-50 transition-colors cursor-pointer outline-none"
            >
              Keep Book
            </button>

            <button
              type="button"
              onClick={handleDelete}
              disabled={isDeleting}
              className="h-11 w-full rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-sm font-semibold text-white shadow-xs transition-colors cursor-pointer outline-none disabled:opacity-60 flex items-center justify-center"
            >
              {isDeleting ? "Deleting..." : "Yes, Delete Book"}
            </button>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default MyBookDeleteDialog;
