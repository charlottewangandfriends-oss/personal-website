'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

type Props = {
  colorSrc: string;
  bwSrc: string;
  positionClass: string;
  tagline: string;
  subtagline: string;
};

const chapters = [
  {
    number: '01',
    eyebrow: 'Listen',
    title: 'Media',
    description: 'Conducting, composition, voice, and music made with friends.',
    href: '/media',
  },
  {
    number: '02',
    eyebrow: 'Read',
    title: 'Writing',
    description: 'Poetry, prose, and selections from Dear Tomorrow, Dear Past.',
    href: '/writing',
  },
  {
    number: '03',
    eyebrow: 'Meet',
    title: 'About',
    description: 'The person, practice, and community behind the work.',
    href: '/about',
  },
] as const;

const EYEBROW_REVEAL_STYLE = { transitionDelay: '100ms' } as const;

/**
 * Editorial portrait that develops from black and white into color.
 * The transition is intentionally unhurried, like a photograph appearing.
 */
export default function Hero({ colorSrc, bwSrc, positionClass, tagline, subtagline }: Props) {
  const [colored, setColored] = useState(false);
  const [hovered, setHovered] = useState(false);
  const figureRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = figureRef.current;
    if (!el) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      setColored(true);
      return;
    }

    let timer: number | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timer = window.setTimeout(() => setColored(true), 900);
          observer.disconnect();
        }
      },
      { threshold: 0.28 },
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (timer !== undefined) window.clearTimeout(timer);
    };
  }, []);

  const showColor = colored || hovered;

  return (
    <>
      <section className="relative isolate overflow-hidden bg-cream md:pt-[4.5rem]">
        {/* Lavender is atmospheric here rather than a separate block. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-40 top-8 h-[38rem] w-[38rem] rounded-full bg-lavender/25 blur-[120px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 bottom-[-14rem] h-[34rem] w-[34rem] rounded-full bg-lavender-soft/80 blur-[110px]"
        />

        <div className="relative mx-auto max-w-[100rem] md:min-h-[calc(100svh-4.5rem)]">
          {/* On mobile the portrait begins behind the transparent nav. On desktop it
              touches both section boundaries and dissolves at its left and right edges. */}
          <div
            ref={figureRef}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="group relative h-[57svh] min-h-[24rem] max-h-[31rem] w-full overflow-hidden md:absolute md:inset-y-0 md:right-0 md:h-full md:max-h-none md:w-[70%]"
          >
            <div
              className={`absolute inset-0 scale-[1.08] transition-transform duration-[6000ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:scale-[1.045] motion-reduce:transition-none ${
                showColor ? 'scale-[1.045]' : ''
              }`}
            >
              <Image
                src={bwSrc}
                alt="Charlotte Wang holding a conductor's baton"
                fill
                priority
                sizes="(max-width: 767px) 100vw, 70vw"
                className={`object-cover ${positionClass}`}
              />
              <Image
                src={colorSrc}
                alt=""
                aria-hidden
                fill
                priority
                sizes="(max-width: 767px) 100vw, 70vw"
                className={`object-cover transition-[opacity,filter] duration-[6000ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${positionClass} ${
                  showColor
                    ? 'opacity-100 saturate-100'
                    : 'opacity-0 saturate-[0.72]'
                }`}
              />
            </div>

            {/* These feathers stay inside the photograph so neither edge can form a seam. */}
            <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-[43%] bg-gradient-to-r from-cream via-cream/75 to-transparent md:block" />
            <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[17%] bg-gradient-to-l from-cream via-cream/55 to-transparent md:block" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[27%] bg-gradient-to-b from-transparent via-cream/35 to-cream md:hidden" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-[14%] bg-gradient-to-b from-cream/25 to-transparent md:hidden" />
            <div
              aria-hidden="true"
              className={`pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_68%_28%,rgba(207,199,216,0.25),transparent_44%)] transition-opacity duration-[6000ms] motion-reduce:transition-none ${
                showColor ? 'opacity-30' : 'opacity-100'
              }`}
            />

            <p className="absolute bottom-8 right-6 hidden text-[0.62rem] uppercase tracking-[0.28em] text-brown-soft/60 md:block">
              Black &amp; white, slowly becoming color
            </p>
          </div>

          {/* Text enters the feathered part of the image on larger screens. */}
          <div className="relative z-10 mx-auto -mt-11 flex max-w-6xl items-center px-6 pb-16 md:mt-0 md:min-h-[calc(100svh-4.5rem)] md:px-10 md:py-20">
            <div className="max-w-xl md:w-[57%]">
              <p
                className="reveal is-visible eyebrow"
                style={EYEBROW_REVEAL_STYLE}
              >
                {tagline}
              </p>
              <h1 className="mt-5 font-serif text-[4rem] leading-[0.86] tracking-[-0.045em] text-brown sm:text-7xl md:text-[clamp(5.4rem,8vw,8rem)]">
                Charlotte
                <br />
                <span className="ml-[0.42em] italic text-brown-soft">Wang</span>
              </h1>

              {subtagline && (
                <div className="mt-9 flex max-w-md items-start gap-4 border-t border-line/90 pt-5">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-2 w-2 shrink-0 rounded-full bg-lavender-deep/70"
                  />
                  <p className="font-serif text-lg italic leading-relaxed text-olive md:text-xl">
                    {subtagline}
                  </p>
                </div>
              )}

              <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
                <Link
                  href="/media"
                  className="group rounded-full bg-brown px-7 py-3.5 text-sm tracking-wide text-cream transition-colors duration-500 hover:bg-olive"
                >
                  Enter the work{' '}
                  <span
                    aria-hidden="true"
                    className="inline-block transition-transform duration-500 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
                <Link
                  href="/about"
                  className="link-underline text-sm tracking-wide text-brown-soft hover:text-brown"
                >
                  Meet Charlotte →
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-lavender-deep/35 to-transparent" />
      </section>

      <section aria-labelledby="home-chapters" className="relative overflow-hidden bg-paper/45">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-72 w-[52rem] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(207,199,216,0.2),transparent_68%)]"
        />
        <div className="relative mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-24">
          <div className="flex items-end justify-between gap-8">
            <div>
              <p className="eyebrow">Three ways in</p>
              <h2
                id="home-chapters"
                className="mt-4 font-serif text-4xl text-brown sm:text-5xl"
              >
                Explore Charlotte&apos;s world.
              </h2>
            </div>
            <p className="hidden max-w-xs text-right text-sm leading-relaxed text-brown-soft/75 md:block">
              Music, language, and community—different rooms in the same house.
            </p>
          </div>

          <div className="mt-12 grid border-y border-line md:grid-cols-3">
            {chapters.map((chapter, index) => (
              <Link
                key={chapter.href}
                href={chapter.href}
                className={`group relative overflow-hidden py-9 md:min-h-64 md:px-8 md:py-10 ${
                  index > 0 ? 'border-t border-line md:border-l md:border-t-0' : ''
                }`}
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_118%,rgba(207,199,216,0.42),transparent_56%)] opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                />
                <div className="relative flex h-full flex-col">
                  <div className="flex items-center justify-between">
                    <span className="text-xs tracking-[0.22em] text-brown-soft/55">
                      {chapter.number}
                    </span>
                    <span className="eyebrow">{chapter.eyebrow}</span>
                  </div>
                  <h3 className="mt-8 font-serif text-4xl text-brown transition-colors duration-500 group-hover:text-olive md:text-5xl">
                    {chapter.title}
                  </h3>
                  <p className="mt-4 max-w-xs text-sm leading-7 text-brown-soft">
                    {chapter.description}
                  </p>
                  <span className="mt-8 inline-block text-xl text-brown transition-transform duration-500 group-hover:translate-x-1 md:mt-auto md:pt-8">
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
