"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { MeetingType } from "@/lib/types";

interface MeetingTypeLink {
  label: string;
  type: MeetingType;
}

const meetingTypes: MeetingTypeLink[] = [
  {
    label: "Testimony",
    type: "testimony",
  },
  {
    label: "Regular",
    type: "regular",
  },
  {
    label: "Stake",
    type: "stake",
  },
  {
    label: "General",
    type: "general",
  },
];

export default function MeetingsTypeNav() {
  const searchParams = useSearchParams();
  const activeType = searchParams.get("type");

  return (
    <nav
      aria-label="Meeting type navigation"
      className="rounded-xl border border-border bg-surface p-4"
    >
      <ul className="flex flex-wrap gap-3">
        {meetingTypes.map((meetingType) => {
          const isActive = activeType === meetingType.type;

          return (
            <li key={meetingType.type}>
              <Link
                href={`/meetings?type=${meetingType.type}`}
                className={`inline-block rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "border-primary bg-primary text-white"
                    : "border-border text-foreground hover:border-primary hover:text-primary"
                }`}
              >
                {meetingType.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}