"use client";

import Link from "next/link";

interface MeetingsErrorProps {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
}

export default function MeetingsError({
  error,
  reset,
}: MeetingsErrorProps) {
  console.error(error);

  return (
    <section className="mx-auto max-w-2xl rounded-xl border border-border bg-surface p-8 text-center shadow-sm">
      <h1 className="font-display text-3xl font-bold text-foreground">
        Something went wrong
      </h1>

      <p className="mt-3 text-muted">
        We could not complete your request. Please try again.
      </p>

      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="rounded-lg bg-primary px-5 py-3 font-medium text-white transition-opacity hover:opacity-90"
        >
          Try Again
        </button>

        <Link
          href="/meetings"
          className="rounded-lg border border-border px-5 py-3 font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
        >
          Back to Meetings
        </Link>
      </div>
    </section>
  );
}