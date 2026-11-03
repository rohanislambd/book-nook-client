import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Allow public access to catalog page /books
  if (pathname === "/books") {
    return NextResponse.next();
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const isAuthRoute = pathname === "/login" || pathname === "/register";

  // If user is already logged in, redirect away from login & register pages
  if (session && isAuthRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If user is not logged in and visits protected routes, redirect to login with callbackUrl
  if (!session && !isAuthRoute) {
    const loginUrl = new URL("/login", request.url);
    const requestedPath = request.nextUrl.pathname + request.nextUrl.search;
    loginUrl.searchParams.set("callbackUrl", requestedPath);

    if (pathname.startsWith("/books/")) {
      loginUrl.searchParams.set("toast", "book_details");
    }

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/add-book",
    "/my-book",
    "/my-borrows",
    "/books/:path*",
    "/login",
    "/register",
  ],
};
