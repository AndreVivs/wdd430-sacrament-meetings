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

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

import { auth } from "@/auth";

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

  announcements: z
    .string()
    .optional(),

  wardBusiness: z
    .string()
    .optional(),

  stakeBusiness: z
    .boolean(),

  speakers: z
    .string()
    .optional(),
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
    announcements?: string[];
    wardBusiness?: string[];
    stakeBusiness?: string[];
    speakers?: string[];
  };

  message?: string;
}

export async function createMeeting(
  _previousState: MeetingActionState,
  formData: FormData
): Promise<MeetingActionState> {
  await requireAuthenticatedUser();

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
    announcements:
      formData.get("announcements"),
    wardBusiness:
      formData.get("wardBusiness"),
    stakeBusiness:
      formData.get("stakeBusiness") === "on",
    speakers:
      formData.get("speakers"),
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

  const announcements = data.announcements
  ? data.announcements
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean)
  : [];

const wardBusiness = data.wardBusiness
  ? data.wardBusiness
      .split("\n")
      .map((description) => description.trim())
      .filter(Boolean)
      .map((description) => ({
        description,
      }))
  : [];

const speakers = data.speakers
  ? data.speakers
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const [name, topic = "", type = "speaker"] =
          line.split("|").map((item) => item.trim());

        return {
          name,
          topic,
          type:
            type === "musical-number"
              ? ("musical-number" as const)
              : ("speaker" as const),
        };
      })
  : [];

  const meeting: Omit<SacramentMeeting, "id"> = {
    date: data.date,
    meetingType: data.meetingType,
    presiding: data.presiding,
    conducting: data.conducting,
    announcements,

    openingHymn: {
      number: data.openingHymnNumber,
      title: data.openingHymnTitle,
    },

    openingPrayer: data.openingPrayer,
    wardBusiness,
    stakeBusiness: data.stakeBusiness,

    sacramentHymn: {
      number: data.sacramentHymnNumber,
      title: data.sacramentHymnTitle,
    },

    speakers,

    closingHymn: {
      number: data.closingHymnNumber,
      title: data.closingHymnTitle,
    },

    closingPrayer: data.closingPrayer,
  };

  try {
    await addMeeting(meeting);
  } catch (error) {
    console.error("Failed to create meeting:", error);

    throw new Error(
      "Unable to create the meeting. Please try again."
    );
  }

  revalidatePath("/meetings");
  redirect("/meetings");

}

export async function updateMeeting(
  id: number,
  _previousState: MeetingActionState,
  formData: FormData
): Promise<MeetingActionState> {
  await requireAuthenticatedUser();

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
        announcements:
      formData.get("announcements"),
    wardBusiness:
      formData.get("wardBusiness"),
    stakeBusiness:
      formData.get("stakeBusiness") === "on",
    speakers:
      formData.get("speakers"),
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

  const announcements = data.announcements
  ? data.announcements
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean)
  : [];

const wardBusiness = data.wardBusiness
  ? data.wardBusiness
      .split("\n")
      .map((description) => description.trim())
      .filter(Boolean)
      .map((description) => ({
        description,
      }))
  : [];

const speakers = data.speakers
  ? data.speakers
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const [name, topic = "", type = "speaker"] =
          line.split("|").map((item) => item.trim());

        return {
          name,
          topic,
          type:
            type === "musical-number"
              ? ("musical-number" as const)
              : ("speaker" as const),
        };
      })
  : [];

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

    announcements,
    wardBusiness,
    stakeBusiness: data.stakeBusiness,
    speakers,
  };

  try {
  await updateMeetingInDb(id, updates);
} catch (error) {
  console.error("Failed to update meeting:", error);

  throw new Error(
    "Unable to update the meeting. Please try again."
  );
}

revalidatePath("/meetings");
redirect("/meetings");

}

export async function deleteMeeting(
  id: number
): Promise<void> {
  await requireAuthenticatedUser();

  try {
    await deleteMeetingFromDb(id);
  } catch (error) {
    console.error("Failed to delete meeting:", error);

    throw new Error(
      "Unable to delete the meeting. Please try again."
    );
  }

  revalidatePath("/meetings");
  redirect("/meetings");
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/meetings",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid email or password.";

        default:
          return "Something went wrong.";
      }
    }

    throw error;
  }
}

async function requireAuthenticatedUser() {
  const session = await auth();

  if (!session?.user) {
    throw new Error("Not authenticated.");
  }

  return session;
}