'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookMarked, Compass, LibraryBig, LayoutDashboard, Menu, X, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

/* ─────────────────── nav link definitions ─────────────────── */

type NavLink = {
    href: string;
    label: string;
    icon: React.ElementType;
    count?: number;
    requireAuth?: boolean; 
};

const NAV_LINKS: NavLink[] = [
    { href: '/',      label: 'Home',      icon: Compass },
    { href: '/books', label: 'All Books', icon: LibraryBig, count: 10 },
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, requireAuth: true }, // এটি শুধু লগিন ইউজার দেখবে
];

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

    
    const isAuthenticated = false; 

    const closeMobile = () => setMobileOpen(false);

    // 💡 Session filter 
    const visibleLinks = NAV_LINKS.filter(link => {
        if (link.requireAuth && !isAuthenticated) return false;
        return true;
    });

    return (
        <header className="w-full border-b border-border bg-[#FAF8F5]">
            <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                {/* Logo — always visible */}
                <Logo />

                {/* ── Desktop nav links (md+) ── */}
                <ul className="hidden md:flex items-center gap-2">
                    {visibleLinks.map(({ href, label, icon: Icon, count }) => {
                        const active = pathname === href;
                        return (
                            <li key={href}>
                                <Link
                                    href={href}
                                    className={cn(
                                        'flex items-center gap-1.5 text-sm font-semibold transition-colors px-4 py-2.5 rounded-xl',
                                        active
                                            ? 'bg-[#1a3a2a] text-white'
                                            : 'text-muted-foreground hover:bg-black/5 hover:text-foreground',
                                    )}
                                >
                                    <Icon className="size-4" />
                                    {label}
                                    {count !== undefined && (
                                        <Badge 
                                            className={cn(
                                                "ml-0.5 h-4 min-w-4 rounded-full px-1 py-0 text-[10px] font-bold border-0",
                                                active ? "bg-white text-[#1a3a2a]" : "bg-[#1a3a2a] text-white"
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
                        
                        <Button variant="outline" size="sm" className="rounded-xl px-5 border-red-500 text-red-500 font-semibold hover:bg-red-50">
                            <LogOut className="size-4 mr-2" /> Logout
                        </Button>
                    ) : (
                      
                        <>
                            <Button variant="outline"  className="rounded-xl px-5 py-4 border-[#1a3a2a] text-[#1a3a2a] font-semibold hover:bg-[#1a3a2a]/5">
                                Login
                            </Button>
                            <Button
                                
                                className="rounded-xl bg-[#1a3a2a] px-5 py-4 text-white font-semibold hover:bg-[#1a3a2a]/90"
                            >
                                Register
                            </Button>
                        </>
                    )}
                </div>

                {/* ── Mobile hamburger / Close button (< md) ── */}
                <div className="flex md:hidden">
                    <Button
                        variant="outline"
                        size="icon"
                        aria-label="Toggle menu"
                        className="rounded-xl border-border bg-white"
                        onClick={() => setMobileOpen(!mobileOpen)}
                    >
                        {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
                    </Button>
                </div>
            </nav>

            {/* ── Mobile Dropdown Menu (< md) ── */}
            {mobileOpen && (
                <div className="md:hidden border-t border-border bg-[#FAF8F5] px-6 py-4 pb-6 shadow-sm">
                    <nav className="flex flex-col space-y-2">
                        {visibleLinks.map(({ href, label, count }) => {
                            const active = pathname === href;
                            return (
                                <Link
                                    key={href}
                                    href={href}
                                    onClick={closeMobile}
                                    className={cn(
                                        'px-4 py-3 text-sm font-semibold rounded-xl transition-colors',
                                        active
                                            ? 'bg-[#1a3a2a] text-white'
                                            : 'text-foreground hover:bg-black/5',
                                    )}
                                >
                                    {label}
                                    {count !== undefined && ` (${count})`}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="mt-4 border-t border-border pt-4 flex gap-3">
                        {isAuthenticated ? (
                            <Button
                                variant="outline"
                                className="flex-1 rounded-xl border-red-500 text-red-500 font-semibold hover:bg-red-50"
                                onClick={closeMobile}
                            >
                                <LogOut className="size-4 mr-2" /> Logout
                            </Button>
                        ) : (
                            <>
                                <Button
                                    variant="outline"
                                    className="flex-1 rounded-xl border-[#1a3a2a] text-[#1a3a2a] font-semibold hover:bg-[#1a3a2a]/5"
                                    onClick={closeMobile}
                                >
                                    Login
                                </Button>
                                <Button
                                    className="flex-1 rounded-xl bg-[#1a3a2a] text-white font-semibold hover:bg-[#1a3a2a]/90"
                                    onClick={closeMobile}
                                >
                                    Register
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;