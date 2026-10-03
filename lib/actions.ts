"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import {
  addMeeting,
  updateMeeting as updateMeetingInDb,
  deleteMeeting as deleteMeetingFromDb,
} from "@/lib/meetings-db";

import type { SacramentMeeting } from "@/lib/types";

const MeetingFormSchema = z.object({
  date: z
    .string()
    .min(1, "Meeting date is required."),

  meetingType: z.enum([
    "testimony",
    "regular",
    "stake",
    "general",
    "special",
  ]),

  presiding: z
    .string()
    .trim()
    .min(1, "Presiding leader is required."),

  conducting: z
    .string()
    .trim()
    .min(1, "Conducting leader is required."),

  openingHymnNumber: z.coerce
    .number()
    .int()
    .positive("Opening hymn number is required."),

  openingHymnTitle: z
    .string()
    .trim()
    .min(1, "Opening hymn title is required."),

  openingPrayer: z
    .string()
    .trim()
    .min(1, "Opening prayer is required."),

  sacramentHymnNumber: z.coerce
    .number()
    .int()
    .positive("Sacrament hymn number is required."),

  sacramentHymnTitle: z
    .string()
    .trim()
    .min(1, "Sacrament hymn title is required."),

  closingHymnNumber: z.coerce
    .number()
    .int()
    .positive("Closing hymn number is required."),

  closingHymnTitle: z
    .string()
    .trim()
    .min(1, "Closing hymn title is required."),

  closingPrayer: z
    .string()
    .trim()
    .min(1, "Closing prayer is required."),
});

export interface MeetingActionState {
  errors?: {
    date?: string[];
    meetingType?: string[];
    presiding?: string[];
    conducting?: string[];
    openingHymnNumber?: string[];
    openingHymnTitle?: string[];
    openingPrayer?: string[];
    sacramentHymnNumber?: string[];
    sacramentHymnTitle?: string[];
    closingHymnNumber?: string[];
    closingHymnTitle?: string[];
    closingPrayer?: string[];
  };

  message?: string;
}

export async function createMeeting(
  _previousState: MeetingActionState,
  formData: FormData
): Promise<MeetingActionState> {
  const validatedFields = MeetingFormSchema.safeParse({
    date: formData.get("date"),
    meetingType: formData.get("meetingType"),
    presiding: formData.get("presiding"),
    conducting: formData.get("conducting"),
    openingHymnNumber:
      formData.get("openingHymnNumber"),
    openingHymnTitle:
      formData.get("openingHymnTitle"),
    openingPrayer:
      formData.get("openingPrayer"),
    sacramentHymnNumber:
      formData.get("sacramentHymnNumber"),
    sacramentHymnTitle:
      formData.get("sacramentHymnTitle"),
    closingHymnNumber:
      formData.get("closingHymnNumber"),
    closingHymnTitle:
      formData.get("closingHymnTitle"),
    closingPrayer:
      formData.get("closingPrayer"),
  });

  if (!validatedFields.success) {
    return {
      errors:
        validatedFields.error.flatten().fieldErrors,
      message:
        "Please correct the highlighted fields.",
    };
  }

  const data = validatedFields.data;

  const meeting: Omit<SacramentMeeting, "id"> = {
    date: data.date,
    meetingType: data.meetingType,
    presiding: data.presiding,
    conducting: data.conducting,
    announcements: [],

    openingHymn: {
      number: data.openingHymnNumber,
      title: data.openingHymnTitle,
    },

    openingPrayer: data.openingPrayer,
    wardBusiness: [],
    stakeBusiness: false,

    sacramentHymn: {
      number: data.sacramentHymnNumber,
      title: data.sacramentHymnTitle,
    },

    speakers: [],

    closingHymn: {
      number: data.closingHymnNumber,
      title: data.closingHymnTitle,
    },

    closingPrayer: data.closingPrayer,
  };

  try {
    await addMeeting(meeting);
  } catch {
    return {
      message:
        "Database error: failed to create meeting.",
    };
  }

  revalidatePath("/meetings");
  redirect("/meetings");
}

export async function updateMeeting(
  id: number,
  _previousState: MeetingActionState,
  formData: FormData
): Promise<MeetingActionState> {
  const validatedFields = MeetingFormSchema.safeParse({
    date: formData.get("date"),
    meetingType: formData.get("meetingType"),
    presiding: formData.get("presiding"),
    conducting: formData.get("conducting"),
    openingHymnNumber:
      formData.get("openingHymnNumber"),
    openingHymnTitle:
      formData.get("openingHymnTitle"),
    openingPrayer:
      formData.get("openingPrayer"),
    sacramentHymnNumber:
      formData.get("sacramentHymnNumber"),
    sacramentHymnTitle:
      formData.get("sacramentHymnTitle"),
    closingHymnNumber:
      formData.get("closingHymnNumber"),
    closingHymnTitle:
      formData.get("closingHymnTitle"),
    closingPrayer:
      formData.get("closingPrayer"),
  });

  if (!validatedFields.success) {
    return {
      errors:
        validatedFields.error.flatten().fieldErrors,
      message:
        "Please correct the highlighted fields.",
    };
  }

  const data = validatedFields.data;

  const updates: Partial<SacramentMeeting> = {
    date: data.date,
    meetingType: data.meetingType,
    presiding: data.presiding,
    conducting: data.conducting,

    openingHymn: {
      number: data.openingHymnNumber,
      title: data.openingHymnTitle,
    },

    openingPrayer: data.openingPrayer,

    sacramentHymn: {
      number: data.sacramentHymnNumber,
      title: data.sacramentHymnTitle,
    },

    closingHymn: {
      number: data.closingHymnNumber,
      title: data.closingHymnTitle,
    },

    closingPrayer: data.closingPrayer,
  };

  try {
    await updateMeetingInDb(id, updates);
  } catch {
    return {
      message:
        "Database error: failed to update meeting.",
    };
  }

  revalidatePath("/meetings");
  redirect("/meetings");
}

export async function deleteMeeting(
  id: number
): Promise<void> {
  await deleteMeetingFromDb(id);

  revalidatePath("/meetings");
  redirect("/meetings");
}