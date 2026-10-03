import { Suspense } from "react";
import MeetingsTypeNav from "@/components/MeetingsTypeNav";

export default function MeetingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="space-y-6">
      <Suspense
        fallback={
          <div className="h-14 rounded-xl border border-border bg-surface" />
        }
      >
        <MeetingsTypeNav />
      </Suspense>

      {children}
    </div>
  );
}