import MeetingCard from "@/components/MeetingCard";
import MeetingSearch from "@/components/MeetingSearch";
import Pagination from "@/components/Pagination";
import {
  getMeetings,
  getMeetingsTotalPages,
} from "@/lib/meetings-db";
import type { SacramentMeeting } from "@/lib/types";

interface MeetingsPageProps {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}

export default async function MeetingsPage({
  searchParams,
}: MeetingsPageProps) {
  const params = await searchParams;

  const query: string = params?.query ?? "";
  const currentPage: number =
    Number(params?.page) || 1;

  const [meetings, totalPages]: [
    SacramentMeeting[],
    number
  ] = await Promise.all([
    getMeetings(query, currentPage),
    getMeetingsTotalPages(query),
  ]);

  return (
    <section>
      <div className="mb-6">
        <h1 className="font-display text-3xl font-bold text-foreground">
          Meetings
        </h1>

        <p className="mt-2 text-muted">
          View current and past meeting programs.
        </p>
      </div>

      <div className="mb-6">
        <MeetingSearch />
      </div>

      {meetings.length > 0 ? (
        <>
          <div className="grid gap-6 md:grid-cols-2">
            {meetings.map((meeting) => (
              <MeetingCard
                key={meeting.id}
                meeting={meeting}
              />
            ))}
          </div>

          <div className="mt-8">
            <Pagination totalPages={totalPages} />
          </div>
        </>
      ) : (
        <p className="rounded-xl border border-border bg-surface p-6 text-muted">
          No meetings found.
        </p>
      )}
    </section>
  );
}