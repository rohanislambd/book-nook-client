"use client";

import { useState } from "react";
import Link from "next/link";
import { LogIn, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const router = useRouter();
  const handleLogin = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries()) as {
      email: string;
      password: string;
    };

    const { data, error } = await authClient.signIn.email({
      ...user,
    });
    if (error) {
      toast.error(error.message ?? "Something went wrong");
    }
    if (data) {
      toast.success("Login Successful");
      fetchOptions: {
        onSuccess:{
          router.push("/"); // redirect to login page
        };
      }
    }

    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    if (!hasUpper || !hasLower) {
      setPasswordError(
        "Password must contain at least one uppercase (A–Z) and one lowercase (a–z) letter.",
      );
      return;
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F5F3EE] px-4 py-12">
      <div className="w-full max-w-sm rounded-2xl bg-white px-8 py-10 shadow-sm">
        {/* ── Icon ── */}
        <div className="flex justify-center">
          <span className="flex size-14 items-center justify-center rounded-2xl bg-[#1a3a2a]">
            <LogIn className="size-6 text-amber-400" />
          </span>
        </div>

        {/* ── Title & subtitle ── */}
        <div className="mt-5 text-center">
          <h1 className="font-heading text-2xl font-bold text-[#1a3a2a]">
            Member Login
          </h1>
          <p className="mt-1 text-xs text-muted-foreground">
            Welcome back! Sign in to access your account.
          </p>
        </div>

        {/* ── Form ── */}
        <form className="mt-7 flex flex-col gap-5" onSubmit={handleLogin}>
          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <Label
              htmlFor="email"
              className="text-[0.7rem] font-bold uppercase tracking-widest text-foreground"
            >
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              name="email"
              // defaultValue="eleanor@booknook.org"
              placeholder="you@example.com"
              className="h-11 rounded-xl px-4 text-sm"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <Label
                htmlFor="password"
                className="text-[0.7rem] font-bold uppercase tracking-widest text-foreground"
              >
                Password
              </Label>
              <Link
                href="/forgot-password"
                className="text-xs font-medium text-amber-600 hover:underline"
              >
                Forget Password?
              </Link>
            </div>

            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                // defaultValue="••••••••••"
                placeholder="Enter password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (passwordError) setPasswordError("");
                }}
                aria-invalid={!!passwordError}
                aria-describedby={passwordError ? "password-error" : undefined}
                className="h-11 rounded-xl px-4 pr-11 text-sm"
              />
              <button
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
            </div>

            {/* Validation error */}
            {passwordError && (
              <p
                id="password-error"
                role="alert"
                className="text-xs text-red-500 mt-0.5"
              >
                {passwordError}
              </p>
            )}
          </div>

          {/* Submit */}
          <Button
            type="submit"
            className="h-11 w-full rounded-xl bg-[#1a3a2a] text-sm font-semibold text-white hover:bg-[#1a3a2a]/90"
          >
            Login
          </Button>
        </form>

        {/* ── Divider ── */}
        <div className="my-6 flex items-center gap-3">
          <div className="flex-1 border-t border-border" />
          <span className="text-xs text-muted-foreground">
            Or continue with social
          </span>
          <div className="flex-1 border-t border-border" />
        </div>

        {/* ── Google SSO ── */}
        <Button
          variant="outline"
          className="h-11 w-full rounded-xl border-border text-sm font-medium"
        >
          {/* Google G logo */}
          <svg
            className="size-4 shrink-0"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Continue with Google
        </Button>

        {/* ── Register link ── */}
        <p className="mt-6 text-center text-xs text-muted-foreground">
          New to BookNook?{" "}
          <Link
            href="/register"
            className="font-semibold text-[#1a3a2a] hover:underline"
          >
            Create a Reader Account
          </Link>
        </p>
      </div>
    </main>
  );
}
