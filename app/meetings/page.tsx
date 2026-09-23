import MeetingCard from "@/components/MeetingCard";
import { getBaseUrl } from "@/lib/api";
import type {
  MeetingType,
  SacramentMeeting,
} from "@/lib/types";

interface MeetingsPageProps {
  searchParams: Promise<{
    type?: string;
  }>;
}

const validMeetingTypes: MeetingType[] = [
  "testimony",
  "regular",
  "stake",
  "general",
];

export default async function MeetingsPage({
  searchParams,
}: MeetingsPageProps) {
  const { type } = await searchParams;

  const baseUrl: string = await getBaseUrl();

  const response: Response = await fetch(
    `${baseUrl}/api/meetings`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch meetings");
  }

  const meetings: SacramentMeeting[] =
    (await response.json()) as SacramentMeeting[];

  const selectedType: MeetingType | undefined =
    validMeetingTypes.includes(type as MeetingType)
      ? (type as MeetingType)
      : undefined;

  const filteredMeetings: SacramentMeeting[] =
    selectedType
      ? meetings.filter(
          (meeting) =>
            meeting.meetingType === selectedType
        )
      : meetings;

  return (
    <section>
      <div className="mb-6">
        <h1 className="font-display text-3xl font-bold text-foreground">
          {selectedType
            ? `${selectedType
                .charAt(0)
                .toUpperCase()}${selectedType.slice(1)} Meetings`
            : "All Meetings"}
        </h1>

        <p className="mt-2 text-muted">
          View current and past meeting programs.
        </p>
      </div>

      {filteredMeetings.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {filteredMeetings.map((meeting) => (
            <MeetingCard
              key={meeting.id}
              meeting={meeting}
            />
          ))}
        </div>
      ) : (
        <p className="rounded-xl border border-border bg-surface p-6 text-muted">
          No meetings found for this type.
        </p>
      )}
    </section>
  );
}