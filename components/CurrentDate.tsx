"use client";

import { useEffect, useState } from "react";

export default function CurrentDate() {
  const [currentDate, setCurrentDate] = useState<string>("");

  useEffect(() => {
    const formattedDate: string =
      new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

    setCurrentDate(formattedDate);
  }, []);

  return (
    <p className="mt-1 text-sm text-muted">
      {currentDate}
    </p>
  );
}