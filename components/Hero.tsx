'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

type Props = {
  colorSrc: string;
  bwSrc: string;
  tagline: string;
  subtagline: string;
};

/**
 * Hero portrait that begins in black & white and blooms into color
 * as it enters view (and on hover), echoing Charlotte's mood board.
 */
export default function Hero({ colorSrc, bwSrc, tagline, subtagline }: Props) {
  const [colored, setColored] = useState(false);
  const [hovered, setHovered] = useState(false);
  const figureRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = figureRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const t = setTimeout(() => setColored(true), 450);
          observer.disconnect();
          return () => clearTimeout(t);
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Parallax: the portrait drifts slower than the page as you scroll.
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    let raf = 0;
    const update = () => {
      const el = figureRef.current;
      if (!el) return;
      const shift = Math.min(window.scrollY * 0.22, 160);
      el.style.transform = `translate3d(0, ${shift.toFixed(1)}px, 0)`;
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const showColor = colored || hovered;

  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid min-h-[88vh] max-w-6xl grid-cols-1 items-center gap-10 px-6 pb-16 pt-32 md:grid-cols-[1.05fr_0.95fr] md:gap-16 md:px-10 md:pt-28">
        {/* Text */}
        <div className="order-2 md:order-1">
          <p
            className="reveal is-visible eyebrow"
            style={{ transitionDelay: '120ms' }}
          >
            Conductor · Composer · Soprano · Collaborator
          </p>
          <h1 className="mt-5 font-serif text-[2.9rem] leading-[1.04] text-brown sm:text-6xl md:text-[4.4rem]">
            Charlotte
            <br />
            Wang
          </h1>
          <p className="mt-7 max-w-md font-serif text-xl italic text-olive">
            {subtagline}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="/about"
              className="rounded-full bg-brown px-7 py-3 text-sm tracking-wide text-cream transition-colors hover:bg-brown-soft"
            >
              Meet Charlotte
            </a>
            <a
              href="/media"
              className="link-underline text-sm tracking-wide text-brown-soft hover:text-brown"
            >
              Watch & listen →
            </a>
          </div>
        </div>

        {/* Portrait with color/B&W crossfade */}
        <div className="order-1 md:order-2">
          <div
            ref={figureRef}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="group relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-[2px] md:max-w-md"
          >
            {/* soft lavender wash behind */}
            <div className="absolute -inset-3 -z-10 rounded-sm bg-lavender-soft/60 blur-2xl" />
            <Image
              src={bwSrc}
              alt="Charlotte Wang"
              fill
              priority
              sizes="(max-width: 768px) 90vw, 38vw"
              className="object-cover object-center"
            />
            <Image
              src={colorSrc}
              alt=""
              aria-hidden
              fill
              priority
              sizes="(max-width: 768px) 90vw, 38vw"
              className={`object-cover object-center transition-opacity duration-[1400ms] ease-out ${
                showColor ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
