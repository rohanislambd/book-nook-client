import React from "react";
import { Book } from "@/types/type";
import TopCategoriesAndReviewsClient from "./TopCategoriesAndReviewsClient";

const TopCategoriesAndReviews = async () => {
  let books: Book[] = [];

  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    const res = await fetch(`${apiUrl}/books`, {
      cache: "no-store",
    });
    if (res.ok) {
      const data = await res.json();
      books = Array.isArray(data) ? data : [];
    }
  } catch (error) {
    console.error("Error fetching books in TopCategoriesAndReviews:", error);
  }

  return <TopCategoriesAndReviewsClient books={books} />;
};

export default TopCategoriesAndReviews;
