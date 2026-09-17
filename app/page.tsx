import MeetingDetail from "@/components/MeetingDetail";
import { getMeetingById } from "@/lib/meetings-db";

export default function Home() {
  const meeting = getMeetingById(1);

  if (!meeting) {
    return <p className="text-muted">Meeting not found.</p>;
  }

  return <MeetingDetail meeting={meeting} />;
}