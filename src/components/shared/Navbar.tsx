"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BookMarked,
  Compass,
  LibraryBig,
  Menu,
  X,
  LogOut,
  CirclePlus,
  BookBookmark,
  SaveCheck,
  UserRound,
  BookCopy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import toast from "react-hot-toast";
import { useBooks } from "@/context/BookContext";

/* ─────────────────── nav link definitions ─────────────────── */

type NavLink = {
  href: string;
  label: string;
  icon: React.ElementType;
  count?: number;
  requireAuth?: boolean;
};

/* ─────────────────── Logo ─────────────────── */

const Logo = () => (
  <Link href="/" className="flex items-center gap-3 shrink-0">
    <span className="flex size-10 items-center justify-center rounded-xl bg-[#1a3a2a] text-amber-400">
      <BookMarked className="size-5" />
    </span>
    <span className="flex flex-col leading-tight">
      <span className="font-heading text-base font-bold tracking-tight text-foreground">
        BookNook
      </span>
      <span className="text-[0.6rem] font-semibold uppercase tracking-widest text-muted-foreground">
        Online Community Library
      </span>
    </span>
  </Link>
);

/* ─────────────────── Navbar ─────────────────── */

const Navbar = () => {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;



  const isAuthenticated = user;
  const { allBooksCount, myBorrowsCount, books } = useBooks();

  // Books contributed by current user (matching /my-book page)
  type TBook = {
    userEmail?: string;
    contributor?: {
      email?: string;
    };
  };

  const myBooksCount = books.filter(
    (b: TBook) =>
      Boolean(
        user?.email &&
          (b.userEmail?.toLowerCase() === user.email.toLowerCase() ||
            b.contributor?.email?.toLowerCase() === user.email.toLowerCase())
      )
  ).length;

  const closeMobile = () => setMobileOpen(false);

  // 💡 Define nav links with dynamic count from context
  const navLinks: NavLink[] = [
    { href: "/", label: "Home", icon: Compass },
    { href: "/books", label: "All Books", icon: LibraryBig, count: allBooksCount },
    {
      href: "/add-book",
      label: "Add Book",
      icon: CirclePlus,
      requireAuth: true,
    },
    {
      href: "/my-book",
      label: "My Book",
      icon: BookBookmark,
      count: myBooksCount,
      requireAuth: true,
    },
    {
      href: "/my-borrows",
      label: "My Borows",
      icon: SaveCheck,
      count: myBorrowsCount,
      requireAuth: true,
    },
  ];

  // 💡 Derive counts from navLinks (single source of truth)
  const myBookCount = navLinks.find((l) => l.href === "/my-book")?.count;

  // 💡 Session filter
  const visibleLinks = navLinks.filter((link) => {
    if (link.requireAuth && !isAuthenticated) return false;
    return true;
  });

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          closeMobile();
          toast.success("logout sesefull");
          router.push("/login"); // redirect to login page
        },
      },
    });
  };

  return (
    <header className="w-full border-b border-border bg-[#FAF8F5]">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 relative ">
        {/* Logo — always visible */}
        <Logo />

        {/* ── Desktop nav links (md+) ── */}
        <ul className="hidden md:flex items-center gap-1 xl:gap-2">
          {visibleLinks.map(({ href, label, icon: Icon, count }) => {
            const active = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={cn(
                    "flex items-center gap-1 whitespace-nowrap font-semibold transition-colors px-2 xl:px-3 py-2 rounded-xl text-sm ",
                    active
                      ? "bg-[#1a3a2a] text-white"
                      : "text-muted-foreground hover:bg-black/5 hover:text-foreground",
                  )}
                >
                  <Icon className="size-5" />
                  {label}
                  {count !== undefined && (
                    <Badge
                      className={cn(
                        "ml-0.5 h-4 min-w-4 rounded-full px-1 py-0 text-[10px] font-bold border-0",
                        active
                          ? "bg-white text-[#1a3a2a]"
                          : "bg-[#1a3a2a] text-white",
                      )}
                    >
                      {count}
                    </Badge>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* ── Desktop auth buttons (md+) ── */}
        <div className="hidden md:flex items-center gap-2 shrink-0">
          {isAuthenticated ? (
            <Popover>
              <PopoverTrigger
                render={
                  <button className="flex items-center gap-3 rounded-2xl border border-border bg-white px-3 py-2 shadow-sm hover:shadow-md hover:border-[#1a3a2a]/30 transition-all duration-200 cursor-pointer focus:outline-none group">
                    <Avatar className="size-9 ring-2 ring-[#1a3a2a]/20 ring-offset-1 group-hover:ring-[#1a3a2a]/40 transition-all duration-200">
                      <AvatarImage referrerPolicy="no-referrer" src={user?.image as string} />
                      <AvatarFallback className="bg-[#1a3a2a] text-amber-400 font-bold text-sm">
                        {user?.name?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-start leading-tight">
                      <span className="text-sm font-semibold text-foreground truncate max-w-[120px]">
                        {user?.name}
                      </span>
                      <span className="text-[11px] text-muted-foreground font-medium">
                        Member
                      </span>
                    </div>
                  </button>
                }
              />
              <PopoverContent
                className="w-64 p-0 rounded-2xl shadow-xl border border-border overflow-hidden"
                side="bottom"
                align="end"
                sideOffset={10}
              >
                {/* User Info Header */}
                <div className="px-4 py-4">
                  <p className="text-sm font-bold text-foreground leading-tight">
                    {user?.name}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {user?.email}
                  </p>
                </div>

                <Separator />

                {/* Menu Items */}
                <nav className="flex flex-col py-2">
                  <Link
                    href="/profile"
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-black/5 transition-colors"
                  >
                    <UserRound className="size-4 text-muted-foreground" />
                    My Profile
                  </Link>

                  <Link
                    href="/my-book"
                    className="flex items-center justify-between px-4 py-2.5 text-sm text-foreground hover:bg-black/5 transition-colors"
                  >
                    <span className="flex items-center gap-3">
                      <BookCopy className="size-4 text-muted-foreground" />
                      My Added Books
                    </span>
                    {myBookCount !== undefined && (
                      <Badge className="h-5 min-w-5 rounded-full px-1.5 py-0 text-[10px] font-bold bg-amber-100 text-amber-700 border-0">
                        {myBookCount}
                      </Badge>
                    )}
                  </Link>

                  <Link
                    href="/my-borrows"
                    className="flex items-center justify-between px-4 py-2.5 text-sm text-foreground hover:bg-black/5 transition-colors"
                  >
                    <span className="flex items-center gap-3">
                      <BookBookmark className="size-4 text-muted-foreground" />
                      My Borrows
                    </span>
                    {myBorrowsCount !== undefined && (
                      <Badge className="h-5 min-w-5 rounded-full px-1.5 py-0 text-[10px] font-bold bg-amber-100 text-amber-700 border-0">
                        {myBorrowsCount}
                      </Badge>
                    )}
                  </Link>
                </nav>

                <Separator />

                {/* Logout */}
                <div className="py-2">
                  <button
                    onClick={handleSignOut}
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-sm font-semibold text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="size-4" />
                    Logout
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          ) : (
            <div className="flex gap-3">
              <Link href="/login">
                <Button
                  variant="outline"
                  className="rounded-xl px-5 py-4  border-[#1a3a2a] text-[#1a3a2a] font-semibold hover:bg-[#1a3a2a]/5"
                >
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button className="rounded-xl bg-[#1a3a2a] px-5 py-4  text-white font-semibold hover:bg-[#1a3a2a]/90">
                  Register
                </Button>
              </Link>
            </div>
          )}
        </div>



        {/* ── Mobile hamburger / Close button (< md) ── */}
        <div className="flex md:hidden">
          <Button
            variant="outline"
            size="icon"
            aria-label="Toggle menu"
            className="rounded-xl border border-[#1a3a2a]/30 bg-white text-[#1a3a2a]"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </Button>
        </div>
      </nav>

      {/* ── Mobile Dropdown Menu (< md) ── */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-[#FFFFFF] px-6 py-4 pb-6 shadow-sm">
          <nav className="flex flex-col space-y-2">
            {visibleLinks.map(({ href, label, count }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={closeMobile}
                  className={cn(
                    "px-4 py-3 text-sm font-semibold rounded-xl transition-colors",
                    active
                      ? "bg-[#1a3a2a] text-white"
                      : "text-foreground hover:bg-black/5",
                  )}
                >
                  {label}
                  {count !== undefined && ` (${count})`}
                </Link>
              );
            })}
          </nav>

          <div className="mt-4 border-t border-border pt-4">
            {isAuthenticated ? (
              /* ── Mobile user card ── */
              <div className="flex items-center justify-between gap-3 rounded-2xl bg-[#F5F3F0] px-4 py-3">
                {/* Avatar + Info */}
                <div className="flex items-center gap-3 min-w-0">
                  <Avatar className="size-11 shrink-0 ring-2 ring-[#1a3a2a]/20">
                    <AvatarImage src={user?.image ?? ""} />
                    <AvatarFallback className="bg-[#1a3a2a] text-amber-400 font-bold text-sm">
                      {user?.name?.charAt(0).toUpperCase() ?? "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm font-bold text-foreground truncate">
                      {user?.name}
                    </span>
                    <span className="text-xs text-muted-foreground truncate">
                      {user?.email}
                    </span>
                  </div>
                </div>

                {/* Logout */}
                <button
                  // () => { authClient.signOut(); ;
                  onClick={handleSignOut}
                  className="shrink-0 text-sm font-semibold text-red-500 hover:text-red-600 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col w-full gap-3">
                <Link href="/login">
                  <Button
                    variant="outline"
                    className="flex-1 rounded-xl border-[#1a3a2a] text-[#1a3a2a] font-semibold hover:bg-[#1a3a2a]/5 w-full"
                    onClick={closeMobile}
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button
                    className="flex-1 rounded-xl bg-[#1a3a2a] text-white font-semibold hover:bg-[#1a3a2a]/90 w-full py-2"
                    onClick={closeMobile}
                  >
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
