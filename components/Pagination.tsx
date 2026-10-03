"use client";

import Link from "next/link";
import {
  usePathname,
  useSearchParams,
} from "next/navigation";

interface PaginationProps {
  totalPages: number;
}

export default function Pagination({
  totalPages,
}: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage =
    Number(searchParams.get("page")) || 1;

  function createPageURL(page: number): string {
    const params = new URLSearchParams(
      searchParams.toString()
    );

    params.set("page", String(page));

    return `${pathname}?${params.toString()}`;
  }

  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-center gap-4"
    >
      {currentPage > 1 ? (
        <Link
          href={createPageURL(currentPage - 1)}
          className="rounded-lg border border-border bg-surface px-4 py-2 font-medium text-foreground transition hover:bg-muted focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Previous
        </Link>
      ) : (
        <span
          className="cursor-not-allowed rounded-lg border border-border px-4 py-2 text-muted opacity-50"
          aria-disabled="true"
        >
          Previous
        </span>
      )}

      <span className="text-sm font-medium text-foreground">
        Page {currentPage} of {totalPages}
      </span>

      {currentPage < totalPages ? (
        <Link
          href={createPageURL(currentPage + 1)}
          className="rounded-lg border border-border bg-surface px-4 py-2 font-medium text-foreground transition hover:bg-muted focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Next
        </Link>
      ) : (
        <span
          className="cursor-not-allowed rounded-lg border border-border px-4 py-2 text-muted opacity-50"
          aria-disabled="true"
        >
          Next
        </span>
      )}
    </nav>
  );
}