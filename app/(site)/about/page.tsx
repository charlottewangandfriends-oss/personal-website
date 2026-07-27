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
    <article className="pt-24 sm:pt-28 lg:pt-32">
      {/* Full-bleed feathered hero */}
      <header className="overflow-hidden bg-cream">
        <Reveal className="relative h-[82vw] min-h-[23rem] max-h-[34rem] overflow-hidden bg-cream md:h-[clamp(38rem,54vw,54rem)] md:max-h-none">
          <Image
            src={about.portrait}
            alt="Charlotte Wang with a conductor's baton"
            fill
            priority
            unoptimized={about.portrait.endsWith('.svg')}
            sizes="100vw"
            className={`scale-[1.006] object-cover ${about.portraitPositionClass} md:object-contain md:object-left`}
          />

          {/* Soft edge fades blend the photograph into the page without obscuring its details. */}
          <div className="absolute inset-x-0 top-0 h-[12%] bg-gradient-to-b from-cream via-cream/40 to-transparent" />
          <div className="absolute inset-y-0 right-0 hidden w-[62%] bg-gradient-to-r from-transparent via-cream/75 to-cream md:block" />
          <div className="absolute inset-x-0 bottom-0 h-[12%] bg-gradient-to-b from-transparent via-cream/15 to-cream md:h-[10%]" />

          <div className="relative z-10 mx-auto hidden h-full max-w-7xl items-center px-10 md:flex">
            <div className="ml-auto w-[44%] -translate-y-[3%] lg:w-[43%]">
              <p className="eyebrow">About</p>
              <h1 className="mt-4 font-serif text-[2.3rem] leading-[0.98] text-brown lg:text-5xl xl:text-[3.6rem]">
                {about.heading}
              </h1>
              {about.cv && (
                <a
                  href={about.cv}
                  className="mt-7 w-fit rounded-full border border-brown/70 px-6 py-2.5 text-sm tracking-wide text-brown transition-colors hover:bg-brown hover:text-cream"
                >
                  Download CV
                </a>
              )}
            </div>
          </div>
        </Reveal>

        <Reveal className="relative z-10 -mt-9 px-6 md:hidden">
          <p className="eyebrow">About</p>
          <h1 className="mt-3 font-serif text-5xl leading-[0.98] text-brown">
            {about.heading}
          </h1>
          {about.cv && (
            <a
              href={about.cv}
              className="mt-7 inline-block rounded-full border border-brown px-7 py-3 text-sm tracking-wide text-brown transition-colors hover:bg-brown hover:text-cream"
            >
              Download CV
            </a>
          )}
        </Reveal>
      </header>

      {/* Bio Summary */}
      <section className="mx-auto mt-14 max-w-3xl px-6 md:mt-8 md:px-10">
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
