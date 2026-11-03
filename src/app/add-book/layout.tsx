import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add Book | BookNook",
  description:
    "Contribute a new book to the BookNook community library. Share literary volumes, specify available copies, and connect fellow readers with great literature.",
};

export default function AddBookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
