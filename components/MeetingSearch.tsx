"use client";

import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function MeetingSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback(
    (term: string) => {
      const params = new URLSearchParams(
        searchParams.toString()
      );

      // Whenever a new search starts,
      // return pagination to page 1.
      params.set("page", "1");

      if (term.trim()) {
        params.set("query", term.trim());
      } else {
        params.delete("query");
      }

      replace(`${pathname}?${params.toString()}`);
    },
    300
  );

  return (
    <div className="w-full">
      <label
        htmlFor="meeting-search"
        className="sr-only"
      >
        Search meetings
      </label>

      <input
        id="meeting-search"
        type="search"
        placeholder="Search by speaker, leader, or meeting type..."
        defaultValue={
          searchParams.get("query")?.toString() ?? ""
        }
        onChange={(event) =>
          handleSearch(event.target.value)
        }
        aria-label="Search meetings"
        className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-foreground outline-none transition focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
}