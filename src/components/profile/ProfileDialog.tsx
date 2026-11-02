"use client";

import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useBooks } from "@/context/BookContext";
import { authClient } from "@/lib/auth-client";
import { X } from "lucide-react";

interface ProfileDialogProps {
  myBookCount?: number;
  trigger?: React.ReactNode;
}

const ProfileDialog = ({ myBookCount, trigger }: ProfileDialogProps) => {
  const { myBorrowsCount } = useBooks();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const displayName = user?.name || "Eleanor Vance";
  const displayEmail = user?.email || "eleanor@booknook.org";
  const displayImage =
    user?.image ||
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=250&auto=format&fit=crop";

  return (
    <Dialog>
      <DialogTrigger
        render={
          trigger ? (
            (trigger as React.ReactElement)
          ) : (
            <button
              type="button"
              className="w-full text-left cursor-pointer text-sm font-medium text-foreground outline-none"
            >
              Profile
            </button>
          )
        }
      />

      <DialogContent
        showCloseButton={false}
        className="w-full max-w-[390px] rounded-3xl border border-stone-200/90 bg-[#FAF8F5] p-6 text-foreground shadow-2xl outline-none gap-0"
      >
        <div className="flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between pb-3">
            <DialogTitle className="font-heading text-xl font-bold text-[#1a3a2a]">
              Reader Profile Card
            </DialogTitle>
            <DialogClose
              render={
                <button
                  type="button"
                  className="rounded-lg p-1 text-stone-400 hover:text-stone-700 transition-colors cursor-pointer outline-none"
                  aria-label="Close"
                >
                  <X className="size-5" />
                </button>
              }
            />
          </div>

          <DialogDescription className="sr-only">
            Reader profile details and borrowing statistics
          </DialogDescription>

          {/* Divider */}
          <div className="border-t border-[#E8E2D8] mb-5" />

          {/* Profile details */}
          <div className="flex flex-col items-center text-center">
            {/* Avatar */}
            <div className="relative flex items-center justify-center">
              <Avatar className="size-24 ring-4 ring-[#E2DDD5] shadow-xs">
                <AvatarImage
                  referrerPolicy="no-referrer"
                  src={displayImage}
                  alt={displayName}
                  className="object-cover"
                />
                <AvatarFallback className="bg-[#1a3a2a] text-amber-400 font-heading font-bold text-2xl">
                  {displayName.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>

            {/* Role Badge */}
            <div className="mt-3.5">
              <span className="inline-flex items-center rounded-full bg-[#FEF3D6] px-3.5 py-1 text-xs font-semibold text-[#A05C1C]">
                {(user as { role?: string })?.role
                  ? `${(user as { role?: string }).role} & Member`
                  : "Head Archivist & Member"}
              </span>
            </div>

            {/* Name */}
            <h3 className="font-heading text-2xl font-bold text-[#1a3a2a] mt-2.5">
              {displayName}
            </h3>

            {/* Email */}
            <p className="text-sm text-stone-500 mt-0.5">
              {displayEmail}
            </p>

            {/* Statistics Cards */}
            <div className="grid grid-cols-2 gap-3.5 w-full mt-6">
              <div className="rounded-2xl border border-stone-200/90 bg-white py-4 px-3 flex flex-col items-center justify-center shadow-2xs">
                <span className="font-heading text-2xl font-bold text-[#1a3a2a]">
                  {myBookCount ?? 0}
                </span>
                <span className="text-xs text-stone-600 font-medium mt-1">
                  Books Contributed
                </span>
              </div>

              <div className="rounded-2xl border border-stone-200/90 bg-white py-4 px-3 flex flex-col items-center justify-center shadow-2xs">
                <span className="font-heading text-2xl font-bold text-[#c26200]">
                  {myBorrowsCount ?? 0}
                </span>
                <span className="text-xs text-stone-600 font-medium mt-1">
                  Active Borrows
                </span>
              </div>
            </div>

            {/* Close Profile Button */}
            <DialogClose
              render={
                <button
                  type="button"
                  className="mt-6 w-full cursor-pointer rounded-xl bg-[#1a3a2a] py-3.5 px-4 text-center text-sm font-semibold text-white shadow-xs transition-colors hover:bg-[#132c1f] outline-none"
                >
                  Close Profile
                </button>
              }
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileDialog;
