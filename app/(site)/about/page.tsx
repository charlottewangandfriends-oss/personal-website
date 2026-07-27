import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import Parallax from '@/components/Parallax';
import { getAbout, toParagraphs } from '@/lib/site';

export const metadata: Metadata = { title: 'About' };

export default async function AboutPage() {
  const about = await getAbout();
  const bio = toParagraphs(about.bio);

  return (
    <article className="pt-28 sm:pt-32 lg:pt-36">
      {/* Header */}
      <header className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-[1.12fr_0.88fr] lg:gap-20 xl:gap-24">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">About</p>
            <h1 className="mt-4 max-w-2xl font-serif text-5xl leading-[0.98] text-brown sm:text-6xl lg:text-[4.25rem]">
              {about.heading}
            </h1>
            {about.cv && (
              <a
                href={about.cv}
                className="mt-8 inline-block rounded-full border border-brown px-7 py-3 text-sm tracking-wide text-brown transition-colors hover:bg-brown hover:text-cream"
              >
                Download CV
              </a>
            )}
          </Reveal>
          <Reveal
            delay={120}
            className="relative mx-auto aspect-[5/6] w-full max-w-[28rem] overflow-hidden rounded-[2px] border border-line shadow-[0_24px_70px_rgba(63,47,33,0.10)] ring-1 ring-lavender/20 lg:mx-0 lg:justify-self-end"
          >
            <Image
              src={about.portrait}
              alt="Charlotte Wang"
              fill
              sizes="(max-width: 1023px) 90vw, 28rem"
              className={`object-cover ${about.portraitPositionClass}`}
            />
          </Reveal>
        </div>
      </header>

      {/* Bio Summary */}
      <section className="mx-auto mt-16 max-w-3xl px-6 md:mt-20 md:px-10">
        <Reveal className="prose-warm text-[1.08rem]">
          {bio.length ? bio.map((p, i) => <p key={i}>{p}</p>) : <p>Biography coming soon.</p>}
        </Reveal>
      </section>

      {/* Parallax quote band */}
      <div className="mt-24">
        <Parallax
          src={about.parallaxPhoto}
          objectPosition={about.parallaxPhotoPosition}
          quote={about.parallaxQuote}
          className="h-[52vh] md:h-[66vh]"
        />
      </div>

      {/* Explore Sub-pages (Superlinks) */}
      <section className="mx-auto max-w-6xl px-6 py-24 md:px-10">
        <Reveal>
          <p className="eyebrow mb-2">Explore Further</p>
          <h2 className="font-serif text-3xl text-brown md:text-4xl">Stories & Philosophy</h2>
        </Reveal>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {/* Card 1: Charlotte's Music Journey */}
          <Reveal delay={100}>
            <Link
              href="/about/my-story"
              className="editorial-card group block overflow-hidden rounded-sm border border-line"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={about.storyCardPhoto}
                  alt="Charlotte's music journey"
                  fill
                  sizes="(max-width: 768px) 90vw, 45vw"
                  className={`object-cover ${about.storyCardPositionClass} transition-transform duration-700 group-hover:scale-105`}
                />
              </div>
              <div className="p-8">
                <p className="eyebrow">My Story</p>
                <h3 className="mt-2 font-serif text-2xl text-brown transition-colors group-hover:text-olive">
                  {about.storyCardTitle}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-brown-soft">
                  {about.storyCardDescription}
                </p>
                <span className="link-underline mt-6 inline-block text-xs font-semibold uppercase tracking-wider text-olive">
                  Read full story →
                </span>
              </div>
            </Link>
          </Reveal>

          {/* Card 2: Music, Community, and Human Connection */}
          <Reveal delay={200}>
            <Link
              href="/about/music-community-human-connection"
              className="editorial-card group block overflow-hidden rounded-sm border border-line"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={about.statementCardPhoto}
                  alt="Music, Community, and Human Connection"
                  fill
                  sizes="(max-width: 768px) 90vw, 45vw"
                  className={`object-cover ${about.statementCardPositionClass} transition-transform duration-700 group-hover:scale-105`}
                />
              </div>
              <div className="p-8">
                <p className="eyebrow">Philosophy</p>
                <h3 className="mt-2 font-serif text-2xl text-brown transition-colors group-hover:text-olive">
                  {about.statementHeading}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-brown-soft">
                  {about.statementCardDescription}
                </p>
                <span className="link-underline mt-6 inline-block text-xs font-semibold uppercase tracking-wider text-olive">
                  Read statement →
                </span>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>
    </article>
  );
}
