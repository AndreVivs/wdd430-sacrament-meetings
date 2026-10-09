import MeetingDetail from "@/components/MeetingDetail";
import { getBaseUrl } from "@/lib/api";
import type { SacramentMeeting } from "@/lib/types";
import { notFound } from "next/navigation";

import type { Metadata } from "next";
import { getMeetingById } from "@/lib/meetings-db";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { id } = await params;

  const meetingId = Number(id);

  if (
    !Number.isInteger(meetingId) ||
    meetingId <= 0
  ) {
    return {
      title: "Meeting Not Found",
      description:
        "The requested sacrament meeting could not be found.",
    };
  }

  const meeting =
    await getMeetingById(meetingId);

  if (!meeting) {
    return {
      title: "Meeting Not Found",
      description:
        "The requested sacrament meeting could not be found.",
    };
  }

  const formattedDate =
    new Date(
      `${meeting.date}T00:00:00`
    ).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

  const title =
    `${formattedDate} Sacrament Meeting`;

  const description =
    `View the ${meeting.meetingType} sacrament meeting program for ${formattedDate}.`;

  return {
    title,
    description,

    openGraph: {
      title,
      description,
      images: ["/opengraph-image.png"],
    },
  };
}

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
    console.log("MEETING:", meeting);
  return <MeetingDetail meeting={meeting} />;
}