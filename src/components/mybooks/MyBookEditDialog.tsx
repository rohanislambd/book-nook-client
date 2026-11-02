"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Book } from "@/types/type";
import { Pencil, X, ChevronDown } from "lucide-react";
import toast from "react-hot-toast";
import { getTokenFromClient } from "@/lib/getTokenFromClient";
import { useBooks } from "@/context/BookContext";
import { useRouter } from "next/navigation";

interface MyBookEditDialogProps {
  book: Book;
  trigger?: React.ReactNode;
}

const MyBookEditDialog = ({ book, trigger }: MyBookEditDialogProps) => {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { refreshBooks } = useBooks();
  const router = useRouter();

  const handleUpdateBook = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      const availableCopiesNum = Number(formData.get("availableCopies"));

      const payload = {
        title: (formData.get("title") as string)?.trim(),
        author: (formData.get("author") as string)?.trim(),
        category: formData.get("category") as string,
        availableCopies: availableCopiesNum,
        coverImage: (formData.get("coverImage") as string)?.trim(),
        description: (formData.get("description") as string)?.trim(),
      };

      

      const token = await getTokenFromClient();
      const apiUrl = process.env.NEXT_PUBLIC_API_URL ;

      const res = await fetch(`${apiUrl}/books/${book._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        toast.error(data.message || data.error || "Failed to update book.");
        return;
      }

      toast.success("Book updated successfully!");
      setOpen(false);
      await refreshBooks();
      router.refresh();
    } catch (error) {
      console.error("Error updating book:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          trigger ? (
            (trigger as React.ReactElement)
          ) : (
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-lg border border-stone-200 bg-white px-3 py-1.5 text-xs font-semibold text-stone-700 shadow-2xs transition-colors hover:bg-stone-50 hover:text-stone-900 cursor-pointer"
            >
              <Pencil className="size-3.5 text-stone-600" />
              <span>Edit</span>
            </button>
          )
        }
      />

      <DialogContent
        showCloseButton={false}
        className="w-full max-w-[440px] rounded-3xl border border-stone-200/90 bg-[#FAF8F5] p-6 text-foreground shadow-2xl outline-none gap-0"
      >
        <div className="flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between pb-3">
            <DialogTitle className="font-heading text-xl font-bold text-[#1a3a2a]">
              Update Book Details
            </DialogTitle>
            <DialogClose
              render={
                <button
                  type="button"
                  className="rounded-lg p-1 text-stone-400 hover:text-stone-700 transition-colors cursor-pointer outline-none"
                  aria-label="Close"
                >
                  <X className="size-5" />
                </button>
              }
            />
          </div>

          <DialogDescription className="sr-only">
            Update the book details and save changes
          </DialogDescription>

          {/* Divider */}
          <div className="border-t border-[#E8E2D8] mb-5" />

          {/* Form */}
          <form onSubmit={handleUpdateBook} className="flex flex-col gap-4">
            {/* Row 1 – Title & Author */}
            <div className="grid grid-cols-2 gap-3.5">
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="title"
                  className="text-[11px] font-bold tracking-wider text-stone-700 uppercase"
                >
                  BOOK TITLE *
                </label>
                <input
                  id="title"
                  name="title"
                  defaultValue={book.title}
                  placeholder="Book Title"
                  required
                  className="h-10 w-full rounded-xl border border-stone-300/80 bg-white px-3.5 text-sm text-stone-800 placeholder:text-stone-400 focus:border-[#1a3a2a] focus:outline-none focus:ring-1 focus:ring-[#1a3a2a]"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="author"
                  className="text-[11px] font-bold tracking-wider text-stone-700 uppercase"
                >
                  AUTHOR NAME *
                </label>
                <input
                  id="author"
                  name="author"
                  defaultValue={book.author}
                  placeholder="Author Name"
                  required
                  className="h-10 w-full rounded-xl border border-stone-300/80 bg-white px-3.5 text-sm text-stone-800 placeholder:text-stone-400 focus:border-[#1a3a2a] focus:outline-none focus:ring-1 focus:ring-[#1a3a2a]"
                />
              </div>
            </div>

            {/* Row 2 – Category & Available Copies */}
            <div className="grid grid-cols-2 gap-3.5">
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="category"
                  className="text-[11px] font-bold tracking-wider text-stone-700 uppercase"
                >
                  CATEGORY
                </label>
                <div className="relative">
                  <select
                    id="category"
                    name="category"
                    defaultValue={book.category || "Fiction"}
                    required
                    className="h-10 w-full appearance-none rounded-xl border border-stone-300/80 bg-white px-3.5 pr-8 text-sm text-stone-800 focus:border-[#1a3a2a] focus:outline-none focus:ring-1 focus:ring-[#1a3a2a] cursor-pointer"
                  >
                    <option value="Fiction">Fiction</option>
                    <option value="Science">Science</option>
                    <option value="History">History</option>
                    <option value="Kids">Kids</option>
                    <option value="Others">Others</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 size-4 text-stone-700" />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="availableCopies"
                  className="text-[11px] font-bold tracking-wider text-stone-700 uppercase"
                >
                  AVAILABLE COPIES
                </label>
                <input
                  id="availableCopies"
                  name="availableCopies"
                  type="number"
                  min="0"
                  defaultValue={book.availableCopies}
                  required
                  className="h-10 w-full rounded-xl border border-stone-300/80 bg-white px-3.5 text-sm text-stone-800 placeholder:text-stone-400 focus:border-[#1a3a2a] focus:outline-none focus:ring-1 focus:ring-[#1a3a2a]"
                />
              </div>
            </div>

            {/* Row 3 – Cover Image URL */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="coverImage"
                className="text-[11px] font-bold tracking-wider text-stone-700 uppercase"
              >
                BOOK COVER URL (IMGBB / POSTIMAGE)
              </label>
              <input
                id="coverImage"
                name="coverImage"
                type="url"
                defaultValue={book.coverImage}
                placeholder="https://..."
                required
                className="h-10 w-full rounded-xl border border-stone-300/80 bg-white px-3.5 text-sm text-stone-800 placeholder:text-stone-400 focus:border-[#1a3a2a] focus:outline-none focus:ring-1 focus:ring-[#1a3a2a]"
              />
            </div>

            {/* Row 4 – Short Description */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="description"
                className="text-[11px] font-bold tracking-wider text-stone-700 uppercase"
              >
                SHORT DESCRIPTION *
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                defaultValue={book.description}
                placeholder="Write a clear summary of the book..."
                required
                className="w-full rounded-xl border border-stone-300/80 bg-white p-3.5 text-sm text-stone-800 placeholder:text-stone-400 focus:border-[#1a3a2a] focus:outline-none focus:ring-1 focus:ring-[#1a3a2a] resize-y"
              />
            </div>

            {/* Row 5 – Action Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <DialogClose
                render={
                  <button
                    type="button"
                    className="h-11 w-full rounded-xl border border-stone-300/90 bg-white text-sm font-semibold text-stone-700 shadow-2xs hover:bg-stone-50 transition-colors cursor-pointer outline-none"
                  >
                    Cancel
                  </button>
                }
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="h-11 w-full rounded-xl bg-[#1a3a2a] text-sm font-semibold text-white shadow-xs hover:bg-[#132c1f] disabled:opacity-60 transition-colors cursor-pointer outline-none"
              >
                {isSubmitting ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MyBookEditDialog;
