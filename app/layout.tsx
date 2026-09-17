import "./globals.css";

import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getMeetings } from "@/lib/meetings-db";
import type { SacramentMeeting } from "@/lib/types";

import { Inter, Playfair_Display } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Sacrament Meeting Manager",
  description:
    "Manage, view, and print sacrament meeting programs for current and past Sundays.",
};

export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const today = new Date();

  const currentDate: string = today.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const dayOfWeek: number = today.getDay();

  const sunday = new Date(today);
  sunday.setDate(today.getDate() - dayOfWeek);

  const sundayDate: string = [
    sunday.getFullYear(),
    String(sunday.getMonth() + 1).padStart(2, "0"),
    String(sunday.getDate()).padStart(2, "0"),
  ].join("-");

  const currentMeetings: SacramentMeeting[] =
    getMeetings(sundayDate);

  const currentMeetingId: number | undefined =
    currentMeetings[0]?.id;

  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} flex min-h-screen flex-col font-sans`}
      >
        <Header
          wardName="Lehi 3rd Ward"
          currentDate={currentDate}
          currentMeetingId={currentMeetingId}
        />

        <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-8">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}