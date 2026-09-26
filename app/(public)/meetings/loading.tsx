export default function Loading() {
  return (
    <div
      className="space-y-6"
      aria-label="Loading meetings"
      aria-busy="true"
    >
      <div className="h-8 w-56 animate-pulse rounded-lg bg-border" />

      <div className="grid gap-6 md:grid-cols-2">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="h-52 animate-pulse rounded-xl border border-border bg-surface"
          />
        ))}
      </div>
    </div>
  );
}