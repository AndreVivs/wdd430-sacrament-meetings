import MeetingForm from "@/components/MeetingForm";
import { createMeeting } from "@/lib/actions";

export default function NewMeetingPage() {
  return (
    <section className="mx-auto max-w-3xl">
      <div className="mb-6">
        <h1 className="font-display text-3xl font-bold text-foreground">
          Create Meeting
        </h1>

        <p className="mt-2 text-muted">
          Create a new sacrament meeting program.
        </p>
      </div>

      <MeetingForm
        action={createMeeting}
        submitLabel="Create Meeting"
      />
    </section>
  );
}