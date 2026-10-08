"use client";

import { useActionState } from "react";
import type { SacramentMeeting } from "@/lib/types";
import type { MeetingActionState } from "@/lib/actions";

type MeetingFormAction = (
  previousState: MeetingActionState,
  formData: FormData
) => Promise<MeetingActionState>;

interface MeetingFormProps {
  action: MeetingFormAction;
  meeting?: SacramentMeeting;
  submitLabel: string;
}

const initialState: MeetingActionState = {
  errors: {},
  message: "",
};

export default function MeetingForm({
  action,
  meeting,
  submitLabel,
}: MeetingFormProps) {
  const [state, formAction, pending] = useActionState(
    action,
    initialState
  );

  return (
    <form
      action={formAction}
      className="space-y-6 rounded-xl border border-border bg-surface p-6 shadow-sm"
    >
      <div>
        <label
          htmlFor="date"
          className="mb-2 block font-medium text-foreground"
        >
          Meeting Date
        </label>

        <input
          id="date"
          name="date"
          type="date"
          defaultValue={meeting?.date ?? ""}
          aria-describedby="date-error"
          className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground"
        />

        <div id="date-error" aria-live="polite">
          {state.errors?.date?.map((error) => (
            <p key={error} className="mt-1 text-sm text-red-600">
              {error}
            </p>
          ))}
        </div>
      </div>

      <div>
        <label
          htmlFor="meetingType"
          className="mb-2 block font-medium text-foreground"
        >
          Meeting Type
        </label>

        <select
          id="meetingType"
          name="meetingType"
          defaultValue={meeting?.meetingType ?? "regular"}
          aria-describedby="meetingType-error"
          className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground"
        >
          <option value="testimony">Testimony</option>
          <option value="regular">Regular</option>
          <option value="stake">Stake</option>
          <option value="general">General</option>
          <option value="special">Special</option>
        </select>

        <div id="meetingType-error" aria-live="polite">
          {state.errors?.meetingType?.map((error) => (
            <p key={error} className="mt-1 text-sm text-red-600">
              {error}
            </p>
          ))}
        </div>
      </div>

      <div>
        <label
          htmlFor="presiding"
          className="mb-2 block font-medium text-foreground"
        >
          Presiding
        </label>

        <input
          id="presiding"
          name="presiding"
          type="text"
          defaultValue={meeting?.presiding ?? ""}
          aria-describedby="presiding-error"
          className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground"
        />

        <div id="presiding-error" aria-live="polite">
          {state.errors?.presiding?.map((error) => (
            <p key={error} className="mt-1 text-sm text-red-600">
              {error}
            </p>
          ))}
        </div>
      </div>

      <div>
        <label
          htmlFor="conducting"
          className="mb-2 block font-medium text-foreground"
        >
          Conducting
        </label>

        <input
          id="conducting"
          name="conducting"
          type="text"
          defaultValue={meeting?.conducting ?? ""}
          aria-describedby="conducting-error"
          className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground"
        />

        <div id="conducting-error" aria-live="polite">
          {state.errors?.conducting?.map((error) => (
            <p key={error} className="mt-1 text-sm text-red-600">
              {error}
            </p>
          ))}
        </div>
      </div>

      <div>
        <label
          htmlFor="announcements"
          className="mb-2 block font-medium text-foreground"
        >
          Announcements
        </label>

        <textarea
          id="announcements"
          name="announcements"
          rows={4}
          defaultValue={
            meeting?.announcements?.join("\n") ?? ""
          }
          aria-describedby="announcements-error"
          className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground"
          placeholder="One announcement per line"
        />

        <div
          id="announcements-error"
          aria-live="polite"
        >
          {state.errors?.announcements?.map((error) => (
            <p
              key={error}
              className="mt-1 text-sm text-red-600"
            >
              {error}
            </p>
          ))}
        </div>
      </div>

      <div>
        <label
          htmlFor="wardBusiness"
          className="mb-2 block font-medium text-foreground"
        >
          Ward Business
        </label>

        <textarea
          id="wardBusiness"
          name="wardBusiness"
          rows={4}
          defaultValue={
            meeting?.wardBusiness
              .map((item) => item.description)
              .join("\n") ?? ""
          }
          aria-describedby="wardBusiness-error"
          className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground"
          placeholder="One item per line"
        />

        <div
          id="wardBusiness-error"
          aria-live="polite"
        >
          {state.errors?.wardBusiness?.map((error) => (
            <p
              key={error}
              className="mt-1 text-sm text-red-600"
            >
              {error}
            </p>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center gap-3">
          <input
            id="stakeBusiness"
            name="stakeBusiness"
            type="checkbox"
            defaultChecked={meeting?.stakeBusiness ?? false}
            aria-describedby="stakeBusiness-error"
            className="h-4 w-4"
          />

          <label
            htmlFor="stakeBusiness"
            className="font-medium text-foreground"
          >
            Includes Stake Business
          </label>
        </div>

        <div
          id="stakeBusiness-error"
          aria-live="polite"
        >
          {state.errors?.stakeBusiness?.map((error) => (
            <p
              key={error}
              className="mt-1 text-sm text-red-600"
            >
              {error}
            </p>
          ))}
        </div>
      </div>

      <div>
        <label
          htmlFor="speakers"
          className="mb-2 block font-medium text-foreground"
        >
          Speakers / Musical Numbers
        </label>

        <textarea
          id="speakers"
          name="speakers"
          rows={5}
          defaultValue={
            meeting?.speakers
              .map(
                (speaker) =>
                  `${speaker.name} | ${speaker.topic} | ${speaker.type}`
              )
              .join("\n") ?? ""
          }
          aria-describedby="speakers-error speakers-help"
          className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground"
          placeholder="Sister Brown | Faith in Christ | speaker"
        />

        <p
          id="speakers-help"
          className="mt-1 text-sm text-muted"
        >
          One entry per line: Name | Topic | speaker or musical-number
        </p>

        <div
          id="speakers-error"
          aria-live="polite"
        >
          {state.errors?.speakers?.map((error) => (
            <p
              key={error}
              className="mt-1 text-sm text-red-600"
            >
              {error}
            </p>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label
            htmlFor="openingHymnNumber"
            className="mb-2 block font-medium text-foreground"
          >
            Opening Hymn Number
          </label>

          <input
            id="openingHymnNumber"
            name="openingHymnNumber"
            type="number"
            defaultValue={meeting?.openingHymn.number ?? ""}
            aria-describedby="openingHymnNumber-error"
            className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground"
          />

          <div id="openingHymnNumber-error" aria-live="polite">
            {state.errors?.openingHymnNumber?.map((error) => (
              <p key={error} className="mt-1 text-sm text-red-600">
                {error}
              </p>
            ))}
          </div>
        </div>

        <div>
          <label
            htmlFor="openingHymnTitle"
            className="mb-2 block font-medium text-foreground"
          >
            Opening Hymn Title
          </label>

          <input
            id="openingHymnTitle"
            name="openingHymnTitle"
            type="text"
            defaultValue={meeting?.openingHymn.title ?? ""}
            aria-describedby="openingHymnTitle-error"
            className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground"
          />

          <div id="openingHymnTitle-error" aria-live="polite">
            {state.errors?.openingHymnTitle?.map((error) => (
              <p key={error} className="mt-1 text-sm text-red-600">
                {error}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div>
        <label
          htmlFor="openingPrayer"
          className="mb-2 block font-medium text-foreground"
        >
          Opening Prayer
        </label>

        <input
          id="openingPrayer"
          name="openingPrayer"
          type="text"
          defaultValue={meeting?.openingPrayer ?? ""}
          aria-describedby="openingPrayer-error"
          className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground"
        />

        <div id="openingPrayer-error" aria-live="polite">
          {state.errors?.openingPrayer?.map((error) => (
            <p key={error} className="mt-1 text-sm text-red-600">
              {error}
            </p>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label
            htmlFor="sacramentHymnNumber"
            className="mb-2 block font-medium text-foreground"
          >
            Sacrament Hymn Number
          </label>

          <input
            id="sacramentHymnNumber"
            name="sacramentHymnNumber"
            type="number"
            defaultValue={meeting?.sacramentHymn.number ?? ""}
            aria-describedby="sacramentHymnNumber-error"
            className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground"
          />

          <div id="sacramentHymnNumber-error" aria-live="polite">
            {state.errors?.sacramentHymnNumber?.map((error) => (
              <p key={error} className="mt-1 text-sm text-red-600">
                {error}
              </p>
            ))}
          </div>
        </div>

        <div>
          <label
            htmlFor="sacramentHymnTitle"
            className="mb-2 block font-medium text-foreground"
          >
            Sacrament Hymn Title
          </label>

          <input
            id="sacramentHymnTitle"
            name="sacramentHymnTitle"
            type="text"
            defaultValue={meeting?.sacramentHymn.title ?? ""}
            aria-describedby="sacramentHymnTitle-error"
            className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground"
          />

          <div id="sacramentHymnTitle-error" aria-live="polite">
            {state.errors?.sacramentHymnTitle?.map((error) => (
              <p key={error} className="mt-1 text-sm text-red-600">
                {error}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label
            htmlFor="closingHymnNumber"
            className="mb-2 block font-medium text-foreground"
          >
            Closing Hymn Number
          </label>

          <input
            id="closingHymnNumber"
            name="closingHymnNumber"
            type="number"
            defaultValue={meeting?.closingHymn.number ?? ""}
            aria-describedby="closingHymnNumber-error"
            className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground"
          />

          <div id="closingHymnNumber-error" aria-live="polite">
            {state.errors?.closingHymnNumber?.map((error) => (
              <p key={error} className="mt-1 text-sm text-red-600">
                {error}
              </p>
            ))}
          </div>
        </div>

        <div>
          <label
            htmlFor="closingHymnTitle"
            className="mb-2 block font-medium text-foreground"
          >
            Closing Hymn Title
          </label>

          <input
            id="closingHymnTitle"
            name="closingHymnTitle"
            type="text"
            defaultValue={meeting?.closingHymn.title ?? ""}
            aria-describedby="closingHymnTitle-error"
            className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground"
          />

          <div id="closingHymnTitle-error" aria-live="polite">
            {state.errors?.closingHymnTitle?.map((error) => (
              <p key={error} className="mt-1 text-sm text-red-600">
                {error}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div>
        <label
          htmlFor="closingPrayer"
          className="mb-2 block font-medium text-foreground"
        >
          Closing Prayer
        </label>

        <input
          id="closingPrayer"
          name="closingPrayer"
          type="text"
          defaultValue={meeting?.closingPrayer ?? ""}
          aria-describedby="closingPrayer-error"
          className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground"
        />

        <div id="closingPrayer-error" aria-live="polite">
          {state.errors?.closingPrayer?.map((error) => (
            <p key={error} className="mt-1 text-sm text-red-600">
              {error}
            </p>
          ))}
        </div>
      </div>

      {state.message && (
        <p
          aria-live="polite"
          className="text-sm font-medium text-red-600"
        >
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-primary px-5 py-3 font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {pending ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}