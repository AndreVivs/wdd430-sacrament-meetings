"use client";

import { signOut } from "next-auth/react";

export function SignOutButton() {
  return (
    <button
      type="button"
      onClick={() =>
        signOut({
          redirectTo: "/",
        })
      }
      className="rounded-md border border-border px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-background"
    >
      Sign Out
    </button>
  );
}