import type { SacramentMeeting } from "./types";

const meetings: SacramentMeeting[] = [
  {
    id: 1,
    date: "2026-05-03",
    meetingType: "regular",
    presiding: "Bishop Smith",
    conducting: "Brother Jones",
    announcements: ["Ward temple night: May 10"],
    openingHymn: {
      number: 2,
      title: "The Spirit of God",
    },
    openingPrayer: "Sister Williams",
    wardBusiness: [
      {
        description: "Sustaining of new Primary president",
      },
    ],
    stakeBusiness: false,
    sacramentHymn: {
      number: 169,
      title: "In Remembrance of Thy Suffering",
    },
    speakers: [
      {
        name: "Sister Brown",
        topic: "Faith in Jesus Christ",
        type: "speaker",
      },
      {
        name: "Youth Choir",
        topic: "",
        type: "musical-number",
      },
    ],
    closingHymn: {
      number: 31,
      title: "O God, Our Help in Ages Past",
    },
    closingPrayer: "Brother Davis",
  },

  {
    id: 2,
    date: "2026-09-20",
    meetingType: "testimony",
    presiding: "Bishop Smith",
    conducting: "Brother Taylor",
    announcements: [
      "Youth activity on Wednesday",
      "Relief Society service project on Saturday",
    ],
    openingHymn: {
      number: 85,
      title: "How Firm a Foundation",
    },
    openingPrayer: "Sister Anderson",
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: {
      number: 196,
      title: "Jesus, Once of Humble Birth",
    },
    speakers: [
      {
        name: "Ward Members",
        topic: "Testimonies",
        type: "speaker",
      },
    ],
    closingHymn: {
      number: 98,
      title: "I Need Thee Every Hour",
    },
    closingPrayer: "Brother Wilson",
  },

  {
    id: 3,
    date: "2026-09-13",
    meetingType: "stake",
    presiding: "President Miller",
    conducting: "Bishop Smith",
    announcements: ["Stake conference next month"],
    openingHymn: {
      number: 5,
      title: "High on the Mountain Top",
    },
    openingPrayer: "Sister Williams",
    wardBusiness: [],
    stakeBusiness: true,
    sacramentHymn: {
      number: 169,
      title: "In Remembrance of Thy Suffering",
    },
    speakers: [
      {
        name: "President Miller",
        topic: "Strengthening Families",
        type: "speaker",
      },
      {
        name: "Stake Choir",
        topic: "",
        type: "musical-number",
      },
    ],
    closingHymn: {
      number: 134,
      title: "I Believe in Christ",
    },
    closingPrayer: "Brother Davis",
  },

  {
    id: 4,
    date: "2026-09-27",
    meetingType: "regular",
    presiding: "Bishop Smith",
    conducting: "Brother Jones",
    announcements: [
      "Ward picnic on September 26",
      "Temple recommend interviews available after church",
    ],
    openingHymn: {
      number: 72,
      title: "Praise to the Lord, the Almighty",
    },
    openingPrayer: "Sister Martinez",
    wardBusiness: [
      {
        description: "Release of Young Women adviser",
      },
      {
        description: "Sustaining of new Young Women adviser",
      },
    ],
    stakeBusiness: false,
    sacramentHymn: {
      number: 171,
      title: "With Humble Heart",
    },
    speakers: [
      {
        name: "Brother Wilson",
        topic: "Service and Discipleship",
        type: "speaker",
      },
      {
        name: "Sister Johnson",
        topic: "Personal Revelation",
        type: "speaker",
      },
    ],
    closingHymn: {
      number: 220,
      title: "Lord, I Would Follow Thee",
    },
    closingPrayer: "Brother Garcia",
  },

  {
    id: 5,
    date: "2026-10-04",
    meetingType: "general",
    presiding: "Bishop Smith",
    conducting: "Brother Taylor",
    announcements: [
      "General conference broadcast will begin at 10:00 AM",
    ],
    openingHymn: {
      number: 6,
      title: "Redeemer of Israel",
    },
    openingPrayer: "Sister Brown",
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: {
      number: 169,
      title: "In Remembrance of Thy Suffering",
    },
    speakers: [
      {
        name: "General Authorities",
        topic: "General Conference",
        type: "speaker",
      },
      {
        name: "Tabernacle Choir",
        topic: "",
        type: "musical-number",
      },
    ],
    closingHymn: {
      number: 85,
      title: "How Firm a Foundation",
    },
    closingPrayer: "Brother Anderson",
  },
];

export function getMeetings(date?: string | null): SacramentMeeting[] {
  if (date) return meetings.filter(m => m.date === date);
  return meetings;
}

export function getMeetingById(id: number): SacramentMeeting | null {
  return meetings.find(m => m.id === id) ?? null;
}

export function getClosestMeeting(
  targetDate: string
): SacramentMeeting | null {
  if (meetings.length === 0) {
    return null;
  }

  const [year, month, day] = targetDate
    .split("-")
    .map(Number);

  const target = new Date(year, month - 1, day);

  return meetings.reduce((closest, meeting) => {
    const [meetingYear, meetingMonth, meetingDay] =
      meeting.date.split("-").map(Number);

    const meetingDate = new Date(
      meetingYear,
      meetingMonth - 1,
      meetingDay
    );

    const [closestYear, closestMonth, closestDay] =
      closest.date.split("-").map(Number);

    const closestDate = new Date(
      closestYear,
      closestMonth - 1,
      closestDay
    );

    const meetingDifference = Math.abs(
      meetingDate.getTime() - target.getTime()
    );

    const closestDifference = Math.abs(
      closestDate.getTime() - target.getTime()
    );

    return meetingDifference < closestDifference
      ? meeting
      : closest;
  });
}