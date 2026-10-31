import GoogleLoginToast from "@/components/shared/google-login-toast";

export default function Home() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <GoogleLoginToast />
      <h1 className="font-heading text-4xl font-bold">Welcome to BookNook</h1>
    </main>
  );
}
