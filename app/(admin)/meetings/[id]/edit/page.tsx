import MeetingForm from "@/components/MeetingForm";

import {
  updateMeeting,
} from "@/lib/actions";

import {
  getMeetingById,
} from "@/lib/meetings-db";

interface EditMeetingPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditMeetingPage({
  params,
}: EditMeetingPageProps) {
  const { id } = await params;

  const meetingId = Number(id);

  const meeting =
    await getMeetingById(meetingId);

  if (!meeting) {
    return (
      <p className="text-muted">
        Meeting not found.
      </p>
    );
  }

  const updateMeetingWithId =
    updateMeeting.bind(null, meetingId);

  return (
    <section className="mx-auto max-w-3xl">
      <div className="mb-6">
        <h1 className="font-display text-3xl font-bold text-foreground">
          Edit Meeting
        </h1>

        <p className="mt-2 text-muted">
          Update the sacrament meeting program for{" "}
          {meeting.date}.
        </p>
      </div>

      <MeetingForm
        action={updateMeetingWithId}
        meeting={meeting}
        submitLabel="Update Meeting"
      />
    </section>
  );
}