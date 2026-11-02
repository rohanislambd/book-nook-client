"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { Book, BookContextType } from "@/types/type";
import { authClient } from "@/lib/auth-client";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

const BookContext = createContext<BookContextType | undefined>(undefined);

export function BookProvider({ children }: { children: React.ReactNode }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [myBorrowsCount, setMyBorrowsCount] = useState<number>(0);
  const { data: session } = authClient.useSession();
  const user = session?.user;

  // Manual refresh function for books
  const refreshBooks = useCallback(async () => {
    try {
      setLoading(true);
      const apiUrl = process.env.NEXT_PUBLIC_API_URL
        ? `${process.env.NEXT_PUBLIC_API_URL}/books`
        : "/api/books";

      const res = await fetch(apiUrl, {
        cache: "no-store",
        headers: {
          "Cache-Control": "no-cache",
        },
      });
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
  }, []);

  // Manual refresh function for user's borrowed books
  const refreshBorrows = useCallback(async () => {
    if (!user) {
      setMyBorrowsCount(0);
      return;
    }

    try {
      const token = await getTokenFromClient();
      const headers: Record<string, string> = {};
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/borrows`, {
        headers,
      });

      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setMyBorrowsCount(data.length);
        }
      }
    } catch (error) {
      console.error("Error refreshing borrows in BookContext:", error);
    }
  }, [user]);

  // Initial fetch for all books on mount
  useEffect(() => {
    let isMounted = true;

    const loadInitialBooks = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL
          ? `${process.env.NEXT_PUBLIC_API_URL}/books`
          : "/api/books";

        const res = await fetch(apiUrl, {
          cache: "no-store",
          headers: {
            "Cache-Control": "no-cache",
          },
        });
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

  // Fetch user's borrowed books count when user logs in or updates
  useEffect(() => {
    let isMounted = true;

    const loadInitialBorrows = async () => {
      if (!user) {
        if (isMounted) setMyBorrowsCount(0);
        return;
      }

      try {
        const token = await getTokenFromClient();
        const headers: Record<string, string> = {};
        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/borrows`, {
          headers,
        });

        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && isMounted) {
            setMyBorrowsCount(data.length);
          }
        }
      } catch (error) {
        console.error("Error loading user borrows in BookContext:", error);
      }
    };

    loadInitialBorrows();

    return () => {
      isMounted = false;
    };
  }, [user]);

  // Context value object
  const value: BookContextType = {
    books,
    allBooksCount: books.length,
    myBorrowsCount,
    loading,
    setBooks,
    refreshBooks,
    refreshBorrows,
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
