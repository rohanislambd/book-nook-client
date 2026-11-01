"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { Book, BookContextType } from "@/types/type";

const BookContext = createContext<BookContextType | undefined>(undefined);

export function BookProvider({ children }: { children: React.ReactNode }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Manual refresh function (can be called from actions/forms)
  const refreshBooks = async () => {
    try {
      setLoading(true);
      const apiUrl = process.env.NEXT_PUBLIC_API_URL
        ? `${process.env.NEXT_PUBLIC_API_URL}/books`
        : "/api/books";

      const res = await fetch(apiUrl);
      if (!res.ok) {
        throw new Error("Failed to fetch books");
      }

      const data = await res.json();
      setBooks(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error refreshing books in BookContext:", error);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch on mount without synchronous setState calls
  useEffect(() => {
    let isMounted = true;

    const loadInitialBooks = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL
          ? `${process.env.NEXT_PUBLIC_API_URL}/books`
          : "/api/books";

        const res = await fetch(apiUrl);
        if (!res.ok) {
          throw new Error("Failed to fetch books");
        }

        const data = await res.json();
        if (isMounted) {
          setBooks(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error("Error fetching books in BookContext:", error);
        if (isMounted) {
          setBooks([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadInitialBooks();

    return () => {
      isMounted = false;
    };
  }, []);

  // Context value object - easily extensible for future state/actions
  const value: BookContextType = {
    books,
    allBooksCount: books.length,
    loading,
    setBooks,
    refreshBooks,
  };

  return (
    <BookContext.Provider value={value}>
      {children}
    </BookContext.Provider>
  );
}

export function useBooks() {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error("useBooks must be used within a BookProvider");
  }
  return context;
}
