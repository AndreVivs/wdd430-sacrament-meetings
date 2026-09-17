// GET /api/meetings/[id]
import { getMeetingById } from "@/lib/meetings-db";
import type { SacramentMeeting } from "@/lib/types";

interface MeetingRouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  request: Request,
  context: MeetingRouteContext
): Promise<Response> {
  const { id } = await context.params;

  const meetingId: number = Number(id);

  if (Number.isNaN(meetingId)) {
    return Response.json(
      { error: "Invalid meeting ID" },
      { status: 400 }
    );
  }

  const meeting: SacramentMeeting | null =
    getMeetingById(meetingId);

  if (!meeting) {
    return Response.json(
      { error: "Meeting not found" },
      { status: 404 }
    );
  }

  return Response.json(meeting, {
    status: 200,
  });
}