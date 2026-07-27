import Image from 'next/image';
import Link from 'next/link';
import Hero from '@/components/Hero';
import Reveal from '@/components/Reveal';
import { getHome, toParagraphs } from '@/lib/site';

export default async function HomePage() {
  const home = await getHome();
  const intro = toParagraphs(home.intro);

  return (
    <>
      <Hero
        colorSrc={home.heroColor}
        bwSrc={home.heroBw}
        tagline={home.tagline}
        subtagline={home.subtagline}
      />

      {/* Meet Charlotte */}
      <section className="relative py-16 md:py-24 my-6 overflow-hidden">
        {/* Soft lavender background gradient wash */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-lavender-soft/40 to-transparent" />
        
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <div className="grid items-center gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-16 bg-paper/90 backdrop-blur-sm p-8 sm:p-12 md:p-14 rounded-2xl border border-lavender/40 shadow-sm">
            <Reveal className="relative aspect-[4/5] overflow-hidden rounded-xl border border-lavender/50 shadow-md">
              <Image
                src={home.meetCharlottePhoto}
                alt="Charlotte Wang"
                fill
                sizes="(max-width: 768px) 90vw, 42vw"
                className="object-cover"
              />
            </Reveal>
            <Reveal delay={120}>
              <span className="inline-block px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-lavender text-brown shadow-xs">
                {home.introHeading}
              </span>
              <h2 className="mt-4 font-serif text-4xl text-brown md:text-5xl">
                Stories that feel both deeply personal and universally resonant.
              </h2>
              <div className="prose-warm mt-6 max-w-xl text-[1.05rem]">
                {intro.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <Link
                href="/about"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-brown px-7 py-3 text-sm font-medium tracking-wide text-cream transition-colors hover:bg-olive-deep shadow-xs"
              >
                Read more about Charlotte →
              </Link>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
