import Link from "next/link";

export default function MeetingNotFound() {
  return (
    <section className="mx-auto max-w-2xl rounded-xl border border-border bg-surface p-8 text-center shadow-sm">
      <h1 className="font-display text-3xl font-bold text-foreground">
        Meeting not found
      </h1>

      <p className="mt-3 text-muted">
        The meeting you are trying to edit does not exist.
      </p>

      <Link
        href="/meetings"
        className="mt-6 inline-block rounded-lg bg-primary px-5 py-3 font-medium text-white transition-opacity hover:opacity-90"
      >
        Back to Meetings
      </Link>
    </section>
  );
}