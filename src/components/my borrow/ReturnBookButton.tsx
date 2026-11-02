"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { getTokenFromClient } from "@/lib/getTokenFromClient";
import { useBooks } from "@/context/BookContext";

interface ReturnBookButtonProps {
  borrowId: string;
  bookTitle: string;
}

export default function ReturnBookButton({
  borrowId,
  bookTitle,
}: ReturnBookButtonProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { refreshBorrows, refreshBooks } = useBooks();

  const handleReturn = async () => {
    
        
    setLoading(true);
    try {
      const token = await getTokenFromClient();
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || ""}/borrows/${borrowId}`,
        {
          method: "DELETE",
          headers,
        },
      );

      const result = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(result.message || "Failed to return book");
      }

      toast.success(`"${bookTitle}" returned successfully!`);
      await Promise.allSettled([refreshBorrows(), refreshBooks()]);
      router.refresh();
    } catch (error) {
      toast.error("Failed to return book. Please try again!",);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleReturn}
      disabled={loading}
      className="cursor-pointer rounded-xl bg-[#1a3a2a] px-4 py-2 text-xs font-semibold text-white shadow-2xs transition-colors hover:bg-[#132c1f] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading ? "Returning..." : "Return Book"}
    </button>
  );
}

