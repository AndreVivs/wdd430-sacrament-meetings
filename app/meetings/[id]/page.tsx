import MeetingDetail from "@/components/MeetingDetail";
import { getBaseUrl } from "@/lib/api";
import type { SacramentMeeting } from "@/lib/types";
import { notFound } from "next/navigation";

interface MeetingPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function MeetingPage({
  params,
}: MeetingPageProps) {
  const { id } = await params;

  const baseUrl: string = await getBaseUrl();

  const response: Response = await fetch(
    `${baseUrl}/api/meetings/${id}`,
    {
      cache: "no-store",
    }
  );

  if (response.status === 404) {
    notFound();
  }

  if (response.status === 400) {
    notFound();
  }

  if (!response.ok) {
    throw new Error("Failed to fetch meeting");
  }

  const meeting: SacramentMeeting =
    (await response.json()) as SacramentMeeting;

  return <MeetingDetail meeting={meeting} />;
}