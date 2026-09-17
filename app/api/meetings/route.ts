// GET /api/meetings (POST is optional stretch)
import { getMeetings } from "@/lib/meetings-db";
import type { SacramentMeeting } from "@/lib/types";

export async function GET(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url);

  const date: string | null = searchParams.get("date");

  const meetings: SacramentMeeting[] = getMeetings(date);

  return Response.json(meetings);
}