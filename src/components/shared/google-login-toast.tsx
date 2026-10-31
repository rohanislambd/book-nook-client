"use client";

import { useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function GoogleLoginToast() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const toastShown = useRef(false);

  useEffect(() => {
    if (searchParams.get("login") === "google" && !toastShown.current) {
      toastShown.current = true;
      toast.success("Signed in with Google successfully!");
      router.replace("/");
    }
  }, [searchParams, router]);

  return null;
}

