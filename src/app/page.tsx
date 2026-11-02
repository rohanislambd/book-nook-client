import GoogleLoginToast from "@/components/shared/google-login-toast";
import Banner from "@/components/home/Banner";
import NewArrivals from "@/components/home/NewArrivals";
import BorrowingWorks from "@/components/home/BorrowingWorks";
import TopCategoriesAndReviews from "@/components/home/TopCategoriesAndReviews";

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
