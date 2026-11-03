import GoogleLoginToast from "@/components/shared/google-login-toast";
import Banner from "@/components/home/Banner";
import NewArrivals from "@/components/home/NewArrivals";
import BorrowingWorks from "@/components/home/BorrowingWorks";
import TopCategoriesAndReviews from "@/components/home/TopCategoriesAndReviews";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | BookNook",
  description:
    "BookNook is an online community library where readers can discover, borrow, and contribute books freely. Explore curated collections, track borrowings, and share your favorite volumes.",
};

export default function Home() {
  return (
    <main>
      <GoogleLoginToast />
      <Banner />
      <NewArrivals />
      <BorrowingWorks />
      <TopCategoriesAndReviews />
    </main>
  );
}
