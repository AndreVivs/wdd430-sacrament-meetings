import Link from "next/link";
import type { SacramentMeeting } from "@/lib/types";

interface MeetingCardProps {
  meeting: SacramentMeeting;
}

export default function MeetingCard({
  meeting,
}: MeetingCardProps) {
  return (
    <article className="rounded-xl border border-border bg-surface p-6 shadow-sm transition hover:shadow-md">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-foreground">
            {meeting.date}
          </h2>

          <p className="mt-1 capitalize text-sm font-medium text-primary">
            {meeting.meetingType} meeting
          </p>
        </div>
      </div>

      <div className="space-y-2 text-sm">
        <p className="text-muted">
          <span className="font-medium text-foreground">
            Presiding:
          </span>{" "}
          {meeting.presiding}
        </p>

        <p className="text-muted">
          <span className="font-medium text-foreground">
            Conducting:
          </span>{" "}
          {meeting.conducting}
        </p>
      </div>

      <Link
        href={`/meetings/${meeting.id}`}
        className="mt-5 inline-block rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
      >
        View details
      </Link>
    </article>
  );
}