import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Reveal from '@/components/Reveal';
import WorkingDraftNote from '@/components/WorkingDraftNote';
import { ABOUT_AREA_LINKS } from '@/lib/about-area-links';
import { getAboutArea, toParagraphs } from '@/lib/site';

const WORKING_DRAFT_AREAS = new Set(['conducting', 'composition', 'piano', 'more']);

export function generateStaticParams() {
  return ABOUT_AREA_LINKS.map((area) => ({ area: area.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ area: string }>;
}): Promise<Metadata> {
  const { area: slug } = await params;
  const area = await getAboutArea(slug);

  return area
    ? {
        title: `${area.title} — About`,
        description: area.intro || undefined,
      }
    : { title: 'About' };
}

export default async function AboutAreaPage({
  params,
}: {
  params: Promise<{ area: string }>;
}) {
  const { area: slug } = await params;
  const area = await getAboutArea(slug);
  if (!area || !ABOUT_AREA_LINKS.some((item) => item.slug === slug)) notFound();

  const paragraphs = toParagraphs(area.body);
  const highlights = (area.highlights ?? []).filter((item) => item.title.trim());
  const relatedLinks = [
    { label: area.primaryLinkLabel, href: area.primaryLinkHref },
    { label: area.secondaryLinkLabel, href: area.secondaryLinkHref },
    { label: area.tertiaryLinkLabel, href: area.tertiaryLinkHref },
  ].filter(
    (link): link is { label: string; href: string } =>
      Boolean(link.label?.trim() && link.href?.trim()),
  );

  return (
    <article className="pb-24 pt-32 md:pt-40">
      <div className="mx-auto max-w-5xl px-6 md:px-10">
        <Reveal>
          <Link
            href="/about"
            className="link-underline text-sm tracking-wide text-brown-soft hover:text-brown focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-olive"
          >
            ← Back to About
          </Link>
          <p className="eyebrow mt-7">{area.eyebrow || 'About'}</p>
          <h1 className="mt-3 font-serif text-5xl text-brown sm:text-6xl md:text-7xl">
            {area.title}
          </h1>
          {area.intro && (
            <p className="mt-6 max-w-3xl font-serif text-2xl leading-snug text-brown-soft md:text-3xl">
              {area.intro}
            </p>
          )}
        </Reveal>

        {area.heroImage && (
          <Reveal
            delay={100}
            className="relative mt-12 aspect-[16/9] overflow-hidden rounded-sm border border-line bg-greige/30"
          >
            <Image
              src={area.heroImage}
              alt={area.heroAlt || ''}
              fill
              priority
              sizes="(max-width: 768px) 92vw, 960px"
              className={`object-cover ${area.heroImagePositionClass}`}
            />
          </Reveal>
        )}

        <div className={area.heroImage ? 'mt-14' : 'mt-12'}>
          {WORKING_DRAFT_AREAS.has(slug) && <WorkingDraftNote />}

          <Reveal className="max-w-3xl">
            {paragraphs.length > 0 ? (
              <div className="prose-warm text-[1.08rem] md:text-[1.14rem]">
                {paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            ) : (
              <p className="italic text-brown-soft/70">More about this work is coming soon.</p>
            )}
          </Reveal>

          {highlights.length > 0 && (
            <Reveal delay={100} className="mt-16 max-w-4xl">
              <section aria-labelledby={`${slug}-highlights-heading`}>
                <p className="eyebrow">Selected work</p>
                <h2
                  id={`${slug}-highlights-heading`}
                  className="mt-3 font-serif text-3xl text-brown md:text-4xl"
                >
                  {area.highlightsHeading || 'Selected highlights'}
                </h2>
                <ol className="mt-8 border-t border-line">
                  {highlights.map((item) => {
                    const href = item.href.trim();
                    const external = /^https?:\/\//.test(href);
                    const linkLabel = item.linkLabel.trim() || 'Learn more';
                    const linkClassName =
                      'link-underline mt-3 inline-flex min-h-11 items-center text-xs uppercase tracking-[0.12em] text-olive hover:text-brown focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-olive';

                    return (
                      <li
                        key={`${item.date}-${item.title}`}
                        className="grid gap-3 border-b border-line py-7 md:grid-cols-[10.5rem_minmax(0,1fr)] md:gap-9"
                      >
                        <p className="pt-1 text-xs uppercase leading-relaxed tracking-[0.12em] text-olive">
                          {item.date}
                        </p>
                        <div>
                          <h3 className="font-serif text-xl leading-snug text-brown md:text-2xl">
                            {item.title}
                          </h3>
                          {item.description && (
                            <p className="mt-2 max-w-2xl text-[1rem] leading-relaxed text-brown-soft md:text-[1.04rem]">
                              {item.description}
                            </p>
                          )}
                          {href &&
                            (external ? (
                              <a
                                href={href}
                                target="_blank"
                                rel="noreferrer"
                                className={linkClassName}
                              >
                                {linkLabel} ↗
                              </a>
                            ) : (
                              <Link href={href} className={linkClassName}>
                                {linkLabel} →
                              </Link>
                            ))}
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </section>
            </Reveal>
          )}

          {relatedLinks.length > 0 && (
            <Reveal delay={120}>
              <nav
                aria-label={`${area.title} related links`}
                className="mt-12 flex flex-wrap gap-x-8 gap-y-2 border-y border-line py-6"
              >
                {relatedLinks.map((link) => {
                  const external = /^https?:\/\//.test(link.href);
                  const className =
                    'link-underline inline-flex min-h-11 items-center text-sm uppercase tracking-[0.12em] text-olive hover:text-brown focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-olive';

                  return external ? (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className={className}
                    >
                      {link.label} ↗
                    </a>
                  ) : (
                    <Link key={link.href} href={link.href} className={className}>
                      {link.label} →
                    </Link>
                  );
                })}
              </nav>
            </Reveal>
          )}
        </div>

        <Reveal delay={180} className="mt-20 border-t border-line pt-8">
          <nav aria-label="Explore other About sections">
            <p className="eyebrow">Explore About</p>
            <ul className="mt-4 flex flex-wrap gap-x-7 gap-y-3">
              {ABOUT_AREA_LINKS.map((item) => {
                const active = item.slug === slug;
                return (
                  <li key={item.slug}>
                    <Link
                      href={`/about/${item.slug}`}
                      aria-current={active ? 'page' : undefined}
                      className={`link-underline text-sm tracking-wide focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-olive ${
                        active ? 'text-olive' : 'text-brown-soft hover:text-brown'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </Reveal>
      </div>
    </article>
  );
}
