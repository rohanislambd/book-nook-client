import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Books | BookNook",
  description:
    "Explore our full community library catalog. Filter by category, search by author or title, and borrow books easily.",
};

export default function BooksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

