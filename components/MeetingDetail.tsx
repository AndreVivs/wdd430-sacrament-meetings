import Image from "next/image";
import type { SacramentMeeting } from "@/lib/types";
import { meetingImages } from "@/lib/meeting-images";

interface MeetingDetailProps {
  meeting: SacramentMeeting;
}

export default function MeetingDetail({
  meeting,
}: MeetingDetailProps) {
  const imageSrc = meetingImages[meeting.meetingType];

  const meetingTitle =
    meeting.meetingType === "stake"
      ? "Stake Meeting"
      : meeting.meetingType === "general"
        ? "General Meeting"
        : "Sacrament Meeting";

  return (
    <article className="mx-auto max-w-3xl rounded-xl border border-border bg-surface p-6 shadow-sm md:p-8">
      <header className="mb-8 border-b border-border pb-5">
        <p className="text-sm font-medium capitalize text-primary">
          {meeting.meetingType} meeting
        </p>

        <Image
          src={imageSrc}
          alt={`${meeting.meetingType} meeting program`}
          width={1200}
          height={500}
          className="mb-6 h-64 w-full rounded-lg object-cover"
          priority
          fetchPriority="high"
        />

        <h1 className="font-display text-3xl font-bold text-foreground">
          {meetingTitle}
        </h1>

        <p className="text-muted">{meeting.date}</p>
      </header>

      <div className="space-y-8">
        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            Meeting Leadership
          </h2>

          <div className="space-y-2 text-muted">
            <p>
              <span className="font-medium text-foreground">
                Presiding:
              </span>{" "}
              {meeting.presiding}
            </p>

            <p>
              <span className="font-medium text-foreground">
                Conducting:
              </span>{" "}
              {meeting.conducting}
            </p>
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            Announcements
          </h2>

          {meeting.announcements &&
          meeting.announcements.length > 0 ? (
            <ul className="list-disc space-y-1 pl-5 text-muted">
              {meeting.announcements.map((announcement, index) => (
                <li key={`${announcement}-${index}`}>
                  {announcement}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted">No announcements.</p>
          )}
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            Opening
          </h2>

          <div className="space-y-2 text-muted">
            <p>
              <span className="font-medium text-foreground">
                Opening Hymn:
              </span>{" "}
              #{meeting.openingHymn.number}{" "}
              {meeting.openingHymn.title}
            </p>

            <p>
              <span className="font-medium text-foreground">
                Opening Prayer:
              </span>{" "}
              {meeting.openingPrayer}
            </p>
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            Ward Business
          </h2>

          {meeting.wardBusiness.length > 0 ? (
            <ul className="list-disc space-y-1 pl-5 text-muted">
              {meeting.wardBusiness.map((item, index) => (
                <li key={`${item.description}-${index}`}>
                  {item.description}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted">No ward business.</p>
          )}

          <p className="mt-3 text-muted">
            <span className="font-medium text-foreground">
              Stake Business:
            </span>{" "}
            {meeting.stakeBusiness ? "Yes" : "No"}
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            Sacrament
          </h2>

          <p className="text-muted">
            <span className="font-medium text-foreground">
              Sacrament Hymn:
            </span>{" "}
            #{meeting.sacramentHymn.number}{" "}
            {meeting.sacramentHymn.title}
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            Speakers and Musical Numbers
          </h2>

          <div className="space-y-3">
            {meeting.speakers.map((item, index) => (
              <div
                key={`${item.name}-${index}`}
                className="rounded-lg border border-border bg-background p-4"
              >
                <p className="font-medium text-foreground">
                  {item.name}
                </p>

                <p className="mt-1 text-sm capitalize text-primary">
                  {item.type === "musical-number"
                    ? "Musical Number"
                    : "Speaker"}
                </p>

                {item.topic && (
                  <p className="mt-2 text-sm text-muted">
                    Topic: {item.topic}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            Closing
          </h2>

          <div className="space-y-2 text-muted">
            <p>
              <span className="font-medium text-foreground">
                Closing Hymn:
              </span>{" "}
              #{meeting.closingHymn.number}{" "}
              {meeting.closingHymn.title}
            </p>

            <p>
              <span className="font-medium text-foreground">
                Closing Prayer:
              </span>{" "}
              {meeting.closingPrayer}
            </p>
          </div>
        </section>
      </div>
    </article>
  );
}