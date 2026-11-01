import GoogleLoginToast from "@/components/shared/google-login-toast";
import Banner from "@/components/home/Banner";

export default function Home() {
  return (
    <main>
      <GoogleLoginToast />
      <Banner />
    </main>
  );
}
