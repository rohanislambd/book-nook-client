import type React from "react";

export interface Contributor {
  name: string;
  email?: string;
}

export interface Book {
  _id: string;
  title: string;
  author: string;
  category: string;
  totalCopies: number;
  availableCopies: number;
  coverImage: string;
  description: string;
  contributor?: Contributor;
  userName?: string;
  userEmail?: string;
  createdAt?: string | Date;
}

export interface BookContextType {
  books: Book[];
  allBooksCount: number;
  myBorrowsCount: number;
  loading: boolean;
  setBooks: React.Dispatch<React.SetStateAction<Book[]>>;
  refreshBooks: () => Promise<void>;
  refreshBorrows: () => Promise<void>;
}

export interface BorrowRecord {
  _id?: string;
  bookId: string;
  bookTitle: string;
  bookCover: string;
  author: string;
  category: string;
  borrowerName?: string;
  borrowerEmail?: string;
  borrowDate: string;
  returnDate: string;
  returned?: boolean;
}
