"use client";

import { useState } from "react";
import { CirclePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useBooks } from "@/context/BookContext";

const CATEGORIES = ["Fiction", "Science", "History", "Kids", "Others"];

export default function AddBookPage() {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const router = useRouter();
  const { refreshBooks } = useBooks();

  const [isSubmitting, setIsSubmitting] = useState(false);

  /* ── Core submit: POST /api/books ── */
  const handleAddBook = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) {
      toast.error("You must be logged in to add a book.");
      router.push("/login");
      return;
    }

    const formData = new FormData(e.currentTarget);


    const newBook = {
      title: formData.get("title") as string,
      author: formData.get("author") as string,
      category: formData.get("category") as string,
      coverImage: formData.get("coverImage") as string,
      description: formData.get("description") as string,
      totalCopies: Number(formData.get("totalCopies")),
      availableCopies: Number(formData.get("totalCopies")),
      // Read-only 
      userName: session?.user?.name,
      userEmail: session?.user?.email,
      createdAt: new Date().toISOString(),
    };
  

    setIsSubmitting(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBook),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error ?? "Failed to add book.");
        return;
      }

      toast.success("Book added successfully!");
      await refreshBooks();
      (e.target as HTMLFormElement).reset();
      setTimeout(()=>{
        router.push("/my-book");
      },1000)
      
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-screen items-start justify-center bg-[#F5F3EE] px-4 py-12">
      <div className="w-full max-w-2xl rounded-2xl bg-white px-8 py-10 shadow-sm">
        {/* ── Header breadcrumb ── */}
       

        <h1 className="font-heading mt-1 text-2xl font-bold text-[#1a3a2a]">
          Add a New Book to BookNook
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Share a volume with the community. Your contributor details are
          automatically linked below.
        </p>

        {/* ── Divider ── */}
        <div className="my-6 border-t border-border" />

        {/* ── Form ── */}
        <form onSubmit={handleAddBook} className="flex flex-col gap-6">
          {/* Row 1 – Title & Author */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="title"
                className="text-[0.7rem] font-bold uppercase tracking-widest text-foreground"
              >
                Book Title <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                name="title"
                placeholder="e.g., The Midnight Library"
                required
                className="h-11 rounded-xl px-4 text-sm"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="author"
                className="text-[0.7rem] font-bold uppercase tracking-widest text-foreground"
              >
                Author Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="author"
                name="author"
                placeholder="e.g., Matt Haig"
                required
                className="h-11 rounded-xl px-4 text-sm"
              />
            </div>
          </div>

          {/* Row 2 – Category & Total Copies */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="category"
                className="text-[0.7rem] font-bold uppercase tracking-widest text-foreground"
              >
                Category <span className="text-red-500">*</span>
              </Label>
              <select
                id="category"
                name="category"
                required
                className="h-11 w-full rounded-xl border border-input bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a3a2a]/30"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="totalCopies"
                className="text-[0.7rem] font-bold uppercase tracking-widest text-foreground"
              >
                Total Copies <span className="text-red-500">*</span>
              </Label>
              <Input
                id="totalCopies"
                name="totalCopies"
                type="number"
                min="1"
                placeholder="e.g., 3"
                required
                className="h-11 rounded-xl px-4 text-sm"
              />
            </div>
          </div>

          {/* Row 3 – Cover Image */}
          <div className="flex flex-col gap-2 rounded-xl border border-border p-4">
            <Label
              htmlFor="coverImage"
              className="text-[0.7rem] font-bold uppercase tracking-widest text-foreground"
            >
              Book Cover Image (Upload to ImgBB / PostImage or paste URL){" "}
              <span className="text-red-500">*</span>
            </Label>

            <Input
              id="coverImage"
              type="url"
              name="coverImage"
              placeholder="https://…"
              required
              className="h-10 rounded-xl px-4 text-sm"
            />
          </div>

          {/* Row 4 – Description */}
          <div className="flex flex-col gap-1.5">
            <Label
              htmlFor="description"
              className="text-[0.7rem] font-bold uppercase tracking-widest text-foreground"
            >
              Short Description <span className="text-red-500">*</span>
            </Label>
            <textarea
              id="description"
              name="description"
              placeholder="Write a clear summary of the book's theme, setting, and why readers will enjoy it…"
              required
              rows={4}
              className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm resize-y focus:outline-none focus:ring-2 focus:ring-[#1a3a2a]/30"
            />
          </div>

          {/* Row 5 – Read-only user fields */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label className="text-[0.7rem] font-bold uppercase tracking-widest text-foreground">
                User Name (Read-Only)
              </Label>
              <Input
                value={user?.name ?? ""}
                readOnly
                className="h-11 rounded-xl bg-muted/40 px-4 text-sm text-muted-foreground cursor-not-allowed"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label className="text-[0.7rem] font-bold uppercase tracking-widest text-foreground">
                User Email (Read-Only)
              </Label>
              <Input
                value={user?.email ?? ""}
                readOnly
                className="h-11 rounded-xl bg-muted/40 px-4 text-sm text-muted-foreground cursor-not-allowed"
              />
            </div>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-12 w-full rounded-xl bg-[#1a3a2a] text-sm font-semibold text-white hover:bg-[#1a3a2a]/90 disabled:opacity-60"
          >
            <CirclePlus className="mr-2 size-4" />
            {isSubmitting ? "Adding Book…" : "Add Book"}
          </Button>
        </form>
      </div>
    </main>
  );
}
