// GET /api/meetings

import {
  getMeetingByDate,
  getMeetings,
} from "@/lib/meetings-db";

import type { SacramentMeeting } from "@/lib/types";

export async function GET(
  request: Request
): Promise<Response> {
  const { searchParams } = new URL(request.url);

  const date: string | null =
    searchParams.get("date");

  if (date) {
    const meeting: SacramentMeeting | null =
      await getMeetingByDate(date);

    if (!meeting) {
      return Response.json([]);
    }

    return Response.json([meeting]);
  }

  const meetings: SacramentMeeting[] =
    await getMeetings();

  return Response.json(meetings);
}