import Link from "next/link";
import { getMeetings } from "@/lib/meetings-db";
import type { SacramentMeeting } from "@/lib/types";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default function CurrentMeetingPage() {
  const today = new Date();

  const dayOfWeek: number = today.getDay();

  const sunday = new Date(today);
  sunday.setDate(today.getDate() - dayOfWeek);

  const sundayDate: string = [
    sunday.getFullYear(),
    String(sunday.getMonth() + 1).padStart(2, "0"),
    String(sunday.getDate()).padStart(2, "0"),
  ].join("-");

  const meetings: SacramentMeeting[] =
    getMeetings(sundayDate);

  const currentMeeting: SacramentMeeting | undefined =
    meetings[0];

  if (currentMeeting) {
    redirect(`/meetings/${currentMeeting.id}`);
  }

  return (
    <section className="mx-auto max-w-2xl rounded-xl border border-border bg-surface p-8 text-center shadow-sm">
      <h1 className="font-display text-3xl font-bold text-foreground">
        No Meeting Scheduled
      </h1>

      <p className="mt-3 text-muted">
        There is no meeting scheduled for Sunday, {sundayDate}.
      </p>

      <Link
        href="/meetings"
        className="mt-6 inline-block rounded-lg bg-primary px-5 py-3 font-medium text-white hover:opacity-90"
      >
        View All Meetings
      </Link>
    </section>
  );
}