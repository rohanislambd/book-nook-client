"use client"
import Link from "next/link";
import {
  BookMarked,
  Mail,
  Phone,
  MapPin,
  Clock,
  ArrowRight,
  Heart,
  Sparkles,
} from "lucide-react";

// Social SVGs
const FacebookIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
      clipRule="evenodd"
    />
  </svg>
);

const GithubIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      clipRule="evenodd"
    />
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
      clipRule="evenodd"
    />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const Footer = () => {
  return (
    <footer className="w-full bg-[#0F2419] text-stone-300 border-t border-[#1C3E2C] overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        

        {/* ── Main Footer Navigation Grid ── */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8 pb-12 border-b border-white/10">
          {/* 1. Logo & Short Line & Social Links (4 cols) */}
          <div className="flex flex-col lg:col-span-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 shrink-0">
              <span className="flex size-11 items-center justify-center rounded-2xl bg-[#1A3A2A] text-amber-400 shadow-inner border border-white/10">
                <BookMarked className="size-6" />
              </span>
              <span className="flex flex-col leading-tight">
                <span className="font-heading text-xl font-bold tracking-tight text-white">
                  BookNook
                </span>
                <span className="text-[0.65rem] font-semibold uppercase tracking-widest text-amber-400/90">
                  Online Community Library
                </span>
              </span>
            </Link>

            {/* Short line about the website */}
            <p className="mt-4 text-sm text-stone-300/85 leading-relaxed max-w-sm">
              BookNook is an online community library where readers can discover, borrow, and contribute books freely.
            </p>

            {/* Social Links */}
            <div className="mt-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-stone-400 block mb-3">
                Follow Our Community
              </span>
              <div className="flex items-center gap-2.5">
                {[
                  {
                    icon: FacebookIcon,
                    href: "https://www.facebook.com/rohanislamofficial24",
                    label: "Facebook",
                  },
                  {
                    icon: GithubIcon,
                    href: "https://github.com/rohanislambd",
                    label: "GitHub",
                  },
                  {
                    icon: InstagramIcon,
                    href: "https://instagram.com",
                    label: "Instagram",
                  },
                  {
                    icon: LinkedinIcon,
                    href: "https://www.linkedin.com/in/rohanislambd/",
                    label: "LinkedIn",
                  },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex size-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-stone-300 hover:border-amber-400/40 hover:bg-amber-400/10 hover:text-amber-400 transition-colors"
                  >
                    <Icon className="size-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* 2. Explore Shelves (3 cols) */}
          <div className="flex flex-col lg:col-span-3">
            <h4 className="font-heading text-base font-bold text-white mb-4">
              Explore Shelves
            </h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: "All Library Books", href: "/books" },
                {
                  label: "Fiction Collection",
                  href: "/books?category=Fiction",
                },
                {
                  label: "Science & Technology",
                  href: "/books?category=Science",
                },
                {
                  label: "History & Heritage",
                  href: "/books?category=History",
                },
                { label: "Young Readers & Kids", href: "/books?category=Kids" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-stone-300/80 hover:text-amber-400 transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Circulation Desk (2 cols) */}
          <div className="flex flex-col lg:col-span-2">
            <h4 className="font-heading text-base font-bold text-white mb-4">
              Circulation
            </h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: "Contribute Book", href: "/add-book" },
                { label: "My Added Books", href: "/my-book" },
                { label: "My Active Borrows", href: "/my-borrows" },
                { label: "Register Account", href: "/register" },
                { label: "Member Login", href: "/login" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-stone-300/80 hover:text-amber-400 transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Contact Info (3 cols) */}
          <div className="flex flex-col lg:col-span-3">
            <h4 className="font-heading text-base font-bold text-white mb-4">
              Contact Info
            </h4>
            <ul className="space-y-3.5 text-sm text-stone-300/85">
              <li className="flex items-start gap-3">
                <Mail className="size-4 shrink-0 text-amber-400 mt-1" />
                <div className="flex flex-col">
                  <span className="text-[11px] text-stone-400 uppercase tracking-wider font-semibold">
                    Email Support
                  </span>
                  <a
                    href="mailto:coderootbdofficial24@gmail.com"
                    className="hover:text-amber-400 transition-colors text-white"
                  >
                  coderootbdofficial24@gmail.com
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <Phone className="size-4 shrink-0 text-amber-400 mt-1" />
                <div className="flex flex-col">
                  <span className="text-[11px] text-stone-400 uppercase tracking-wider font-semibold">
                    Helpline
                  </span>
                  <a
                    href="tel:+880 1308-477409"
                    className="hover:text-amber-400 transition-colors text-white"
                  >
                    +880 1308-477409
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <MapPin className="size-4 shrink-0 text-amber-400 mt-1" />
                <div className="flex flex-col">
                  <span className="text-[11px] text-stone-400 uppercase tracking-wider font-semibold">
                    Location
                  </span>
                  <span className="text-stone-200">
                    BookNook Library, Dhaka, Bangladesh
                  </span>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <Clock className="size-4 shrink-0 text-amber-400 mt-1" />
                <div className="flex flex-col">
                  <span className="text-[11px] text-stone-400 uppercase tracking-wider font-semibold">
                    Digital Circulation
                  </span>
                  <span className="text-stone-200">
                    Available 24/7 online
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* ── 5. Copyright Line & Bottom Bar ── */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 text-xs text-stone-400 sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} BookNook. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <Link
              href="/books"
              className="hover:text-amber-400 transition-colors"
            >
              Catalog
            </Link>
            <Link
              href="/add-book"
              className="hover:text-amber-400 transition-colors"
            >
              Add Volume
            </Link>
            <span className="inline-flex items-center gap-1 text-stone-400">
              Crafted with{" "}
              <Heart className="size-3.5 fill-amber-400 text-amber-400 inline" />{" "}
              for readers
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
