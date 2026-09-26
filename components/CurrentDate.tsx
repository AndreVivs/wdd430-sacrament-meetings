"use client";

export default function CurrentDate() {
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <span>
      {currentDate}
    </span>
  );
}