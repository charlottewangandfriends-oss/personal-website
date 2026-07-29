import type { Metadata } from 'next';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import { getEngagements, getEngagementsPage, toParagraphs } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Engagements',
  description: 'Upcoming performances, conducting engagements, and appearances by Charlotte Wang.',
};

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
}: {
  entries: Engagement[];
  emptyMessage?: string;
}) {
  if (!entries.length) {
    return emptyMessage ? (
      <p className="border-t border-line py-10 text-brown-soft/75">{emptyMessage}</p>
    ) : null;
  }

  return (
    <ol className="border-t border-line">
      {entries.map((entry, index) => {
        const date = formatDate(entry.date);
        const endDate = formatDate(entry.endDate);
        const paragraphs = toParagraphs(entry.description);

        return (
          <Reveal as="li" key={entry.slug} delay={Math.min(index * 50, 250)}>
            <article className="grid gap-6 border-b border-line py-9 sm:grid-cols-[7rem_1fr] md:gap-10 md:py-12">
              <time dateTime={entry.date || undefined} className="block text-brown">
                {date ? (
                  <>
                    <span className="block text-xs uppercase tracking-[0.22em] text-olive">
                      {date.month}
                    </span>
                    <span className="mt-1 block font-serif text-5xl leading-none">{date.day}</span>
                    <span className="mt-1 block text-xs tracking-[0.16em] text-brown-soft">
                      {date.year}
                    </span>
                  </>
                ) : (
                  <span className="eyebrow">Date TBA</span>
                )}
              </time>

              <div>
                <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
                  <h3 className="font-serif text-3xl text-brown md:text-4xl">{entry.title}</h3>
                  {endDate && date && (
                    <p className="shrink-0 text-sm text-brown-soft">
                      {date.full} – {endDate.full}
                    </p>
                  )}
                </div>

                {(entry.venue || entry.location || entry.time) && (
                  <p className="mt-3 text-sm uppercase tracking-[0.12em] text-olive">
                    {[entry.venue, entry.location, entry.time].filter(Boolean).join(' · ')}
                  </p>
                )}

                {paragraphs.length > 0 && (
                  <div className="mt-5 max-w-2xl space-y-3 leading-7 text-brown-soft">
                    {paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                )}

                <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                  {entry.detailsUrl && (
                    <a
                      href={entry.detailsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="link-underline inline-block text-sm tracking-wide text-brown hover:text-olive"
                    >
                      {entry.detailsLabel || 'Event details'} ↗
                    </a>
                  )}
                  {entry.date && (
                    <a
                      href={
                        entry.calendarUrl ||
                        `/engagements/${entry.slug}/calendar.ics`
                      }
                      target={entry.calendarUrl ? '_blank' : undefined}
                      rel={entry.calendarUrl ? 'noreferrer' : undefined}
                      className="link-underline inline-block text-sm tracking-wide text-olive hover:text-brown"
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
  const today = new Date().toISOString().slice(0, 10);
  const upcoming = entries.filter((entry) => !entry.date || entry.date >= today);
  const past = entries
    .filter((entry) => entry.date && entry.date < today)
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
              <EngagementList entries={past} />
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
