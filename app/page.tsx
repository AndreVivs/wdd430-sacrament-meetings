import MeetingDetail from "@/components/MeetingDetail";
import { getClosestMeeting } from "@/lib/meetings-db";

export default async function Home() {
  const today = new Date().toISOString().split("T")[0];

  const meeting = await getClosestMeeting(today);

  if (!meeting) {
    return <p className="text-muted">Meeting not found.</p>;
  }

  return <MeetingDetail meeting={meeting} />;
}