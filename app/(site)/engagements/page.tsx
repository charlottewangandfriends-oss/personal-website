import type { Metadata } from 'next';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import { getEngagements, getEngagementsPage, toParagraphs } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Engagements',
  description: 'Upcoming performances, conducting engagements, and appearances by Charlotte Wang.',
};

export const revalidate = 3600;

function todayInDetroit() {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Detroit',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date());
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
}

function formatDate(value: string | null | undefined) {
  if (!value) return null;
  const date = new Date(`${value}T12:00:00`);
  return {
    month: new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date),
    day: new Intl.DateTimeFormat('en-US', { day: '2-digit' }).format(date),
    year: new Intl.DateTimeFormat('en-US', { year: 'numeric' }).format(date),
    full: new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(date),
  };
}

type Engagement = Awaited<ReturnType<typeof getEngagements>>[number];

function EngagementList({
  entries,
  emptyMessage,
  showCalendar = true,
}: {
  entries: Engagement[];
  emptyMessage?: string;
  showCalendar?: boolean;
}) {
  if (!entries.length) {
    return emptyMessage ? (
      <p className="border-t border-line py-10 text-brown-soft/75">{emptyMessage}</p>
    ) : null;
  }

  return (
    <ol className="border-t border-line">
      {entries.map((entry, index) => {
        const isFeatured = entry.featured;
        const date = formatDate(entry.date);
        const endDate = formatDate(entry.endDate);
        const paragraphs = toParagraphs(entry.description);

        return (
          <Reveal
            as="li"
            key={entry.slug}
            delay={Math.min(index * 40, 200)}
            className="border-b border-line"
          >
            <article
              data-featured={isFeatured ? 'true' : undefined}
              className={
                isFeatured
                  ? 'grid gap-4 border-l-[3px] border-l-lavender-deep py-8 pl-5 sm:grid-cols-[6rem_1fr] sm:gap-8 sm:pl-6 md:gap-9 md:py-9'
                  : 'grid gap-3 py-5 sm:grid-cols-[4.75rem_1fr] md:gap-7 md:py-6'
              }
            >
              <time
                dateTime={entry.date || undefined}
                className="flex items-baseline gap-2 text-brown sm:block"
              >
                {date ? (
                  <>
                    <span className="block text-xs uppercase tracking-[0.22em] text-olive">
                      {date.month}
                    </span>
                    <span
                      className={`block font-serif leading-none sm:mt-1 ${
                        isFeatured ? 'text-4xl sm:text-5xl' : 'text-3xl sm:text-4xl'
                      }`}
                    >
                      {date.day}
                    </span>
                    <span className="mt-1 block text-xs tracking-[0.16em] text-brown-soft">
                      {date.year}
                    </span>
                  </>
                ) : (
                  <span className="eyebrow">Date TBA</span>
                )}
              </time>

              <div>
                {isFeatured && (
                  <p className="mb-2 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-lavender-deep">
                    Featured
                  </p>
                )}

                <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
                  <h3
                    className={`font-serif text-brown ${
                      isFeatured
                        ? 'text-[2rem] sm:text-4xl'
                        : 'text-xl sm:text-2xl md:text-[1.7rem]'
                    }`}
                  >
                    {entry.title}
                  </h3>
                  {endDate && date && (
                    <p className="shrink-0 text-sm text-brown-soft">
                      {date.full} – {endDate.full}
                    </p>
                  )}
                </div>

                {(entry.venue || entry.location || entry.time) && (
                  <p
                    className={`uppercase tracking-[0.12em] text-olive ${
                      isFeatured ? 'mt-3 text-sm' : 'mt-2 text-xs leading-5'
                    }`}
                  >
                    {[entry.venue, entry.location, entry.time].filter(Boolean).join(' · ')}
                  </p>
                )}

                {paragraphs.length > 0 && (
                  <div
                    className={`max-w-2xl text-brown-soft ${
                      isFeatured
                        ? 'mt-5 space-y-3 leading-7'
                        : 'mt-3 space-y-2 text-sm leading-6'
                    }`}
                  >
                    {paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                )}

                <div
                  className={`flex flex-wrap items-center gap-x-6 gap-y-3 ${
                    isFeatured ? 'mt-6' : 'mt-4'
                  }`}
                >
                  {entry.detailsUrl && (
                    <a
                      href={entry.detailsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="link-underline inline-flex min-h-11 items-center py-2 text-sm tracking-wide text-brown hover:text-olive"
                    >
                      {entry.detailsLabel || 'Event details'} ↗
                    </a>
                  )}
                  {showCalendar && entry.date && (
                    <a
                      href={
                        entry.calendarUrl ||
                        `/engagements/${entry.slug}/calendar.ics`
                      }
                      target={entry.calendarUrl ? '_blank' : undefined}
                      rel={entry.calendarUrl ? 'noreferrer' : undefined}
                      className="link-underline inline-flex min-h-11 items-center py-2 text-sm tracking-wide text-olive hover:text-brown"
                    >
                      {entry.calendarLabel || 'Add to calendar'} ↗
                    </a>
                  )}
                </div>
              </div>
            </article>
          </Reveal>
        );
      })}
    </ol>
  );
}

export default async function EngagementsPage() {
  const [page, entries] = await Promise.all([getEngagementsPage(), getEngagements()]);
  const today = todayInDetroit();
  const upcoming = entries.filter(
    (entry) => !entry.date || (entry.endDate || entry.date) >= today,
  );
  const past = entries
    .filter((entry) => entry.date && (entry.endDate || entry.date) < today)
    .reverse();

  return (
    <div className="pb-24 pt-32 md:pt-40">
      <header className="mx-auto max-w-6xl px-6 md:px-10">
        <Reveal>
          <p className="eyebrow">Schedule</p>
          <h1 className="mt-4 font-serif text-5xl text-brown sm:text-6xl md:text-7xl">
            {page.heading}
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-brown-soft md:text-xl">
            {page.intro}
          </p>
        </Reveal>
      </header>

      <main className="mx-auto mt-20 max-w-6xl px-6 md:px-10">
        <section aria-labelledby="upcoming-engagements">
          <Reveal>
            <p className="eyebrow">Calendar</p>
            <h2
              id="upcoming-engagements"
              className="mt-3 font-serif text-4xl text-brown md:text-5xl"
            >
              Upcoming
            </h2>
          </Reveal>
          <div className="mt-8">
            <EngagementList
              entries={upcoming}
              emptyMessage="New engagements will be announced here soon."
            />
          </div>
        </section>

        {past.length > 0 && (
          <section aria-labelledby="past-engagements" className="mt-24">
            <Reveal>
              <p className="eyebrow">Archive</p>
              <h2
                id="past-engagements"
                className="mt-3 font-serif text-4xl text-brown md:text-5xl"
              >
                Past engagements
              </h2>
            </Reveal>
            <div className="mt-8">
              <EngagementList entries={past} showCalendar={false} />
            </div>
          </section>
        )}

        <Reveal className="mt-24 border-y border-line py-12 md:flex md:items-end md:justify-between md:gap-12">
          <div>
            <p className="eyebrow">Inquiries</p>
            <h2 className="mt-3 font-serif text-4xl text-brown">{page.footerHeading}</h2>
            <p className="mt-4 max-w-2xl leading-7 text-brown-soft">{page.footerBody}</p>
          </div>
          <Link
            href="/contact"
            className="mt-8 inline-flex shrink-0 rounded-full bg-brown px-7 py-3.5 text-sm tracking-wide text-cream transition-colors hover:bg-olive md:mt-0"
          >
            Get in touch →
          </Link>
        </Reveal>
      </main>
    </div>
  );
}
