"use client";


import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavLinksProps } from "@/lib/types";

interface NavLink {
  href: string;
  label: string;
}

const links: NavLink[] = [
  {
    href: "/meetings/current",
    label: "Current Meeting",
  },
  {
    href: "/meetings",
    label: "All Meetings",
  },
];

export default function NavLinks({
  currentMeetingId,
}: NavLinksProps) {
  const pathname = usePathname();

  return (
    <nav aria-label="Main navigation">
      <ul className="flex flex-wrap gap-2">
        {links.map((link) => {
          const isCurrentMeeting =
            link.href === "/meetings/current" &&
            (
              pathname === "/meetings/current" ||
              (
                currentMeetingId !== undefined &&
                pathname === `/meetings/${currentMeetingId}`
              )
            );

          const isAllMeetings =
            link.href === "/meetings" &&
            pathname.startsWith("/meetings") &&
            !(
              pathname === "/meetings/current" ||
              (
                currentMeetingId !== undefined &&
                pathname === `/meetings/${currentMeetingId}`
              )
            );

          const isActive =
            isCurrentMeeting || isAllMeetings;

          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary text-white"
                    : "text-muted hover:bg-background hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}