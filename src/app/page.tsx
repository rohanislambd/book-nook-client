import GoogleLoginToast from "@/components/shared/google-login-toast";
import Banner from "@/components/home/Banner";
import NewArrivals from "@/components/home/NewArrivals";

export default function Home() {
  return (
    <main>
      <GoogleLoginToast />
      <Banner />
      <NewArrivals/>
    </main>
  );
}
