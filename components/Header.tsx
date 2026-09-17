import Link from "next/link";
import NavLinks from "./NavLinks";
import type { HeaderProps } from "@/lib/types";

export default function Header({
  wardName,
  currentDate,
  currentMeetingId,
  
}: HeaderProps) {
  return (
    <header className="border-b border-border bg-surface">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:justify-between">
        <div>
          <Link
            href="/"
            className="text-2xl font-bold text-foreground transition-colors hover:text-primary"
          >
            {wardName}
          </Link>

          <p className="mt-1 text-sm text-muted">
            {currentDate}
          </p>
        </div>

        <NavLinks currentMeetingId={currentMeetingId} />
      </div>
    </header>
  );
}