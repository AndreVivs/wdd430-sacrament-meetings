import Link from "next/link";
import { deleteMeeting } from "@/lib/actions";
import type { SacramentMeeting } from "@/lib/types";

interface MeetingCardProps {
  meeting: SacramentMeeting;
  canManage: boolean;
}

export default function MeetingCard({
  meeting,
  canManage,
}: MeetingCardProps) {
  const deleteMeetingWithId =
    deleteMeeting.bind(null, meeting.id);

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

      <div className="mt-5 flex flex-wrap gap-3">
        <Link
          href={`/meetings/${meeting.id}`}
          className="inline-block rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          View details
        </Link>

        {canManage && (
          <>
            <Link
              href={`/meetings/${meeting.id}/edit`}
              className="inline-block rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              Edit
            </Link>

            <form action={deleteMeetingWithId}>
              <button
                type="submit"
                className="rounded-lg border border-red-500 px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
              >
                Delete
              </button>
            </form>
          </>
        )}
      </div>
    </article>
  );
}