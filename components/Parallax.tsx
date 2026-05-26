'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';

type Props = {
  src: string;
  /** Optional large serif quote layered over the image. */
  quote?: string;
  /** Optional small attribution / source line under the quote. */
  cite?: string;
  /** Band height. */
  className?: string;
  objectPosition?: string;
  /** 0 = no movement, ~0.3 = subtle, 0.5 = strong. */
  speed?: number;
  /** Darken the image so overlaid text stays legible. */
  overlay?: boolean;
  priority?: boolean;
};

export default function Parallax({
  src,
  quote,
  cite,
  className = 'h-[60vh] md:h-[78vh]',
  objectPosition = 'center',
  speed = 0.28,
  overlay = true,
  priority = false,
}: Props) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    let raf = 0;
    const update = () => {
      const section = sectionRef.current;
      const img = imageRef.current;
      if (!section || !img) return;
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      if (rect.bottom < 0 || rect.top > vh) return; // off-screen, skip
      // progress: -1 when band is just below viewport, +1 when just above.
      const progress = (rect.top + rect.height / 2 - vh / 2) / (vh / 2 + rect.height / 2);
      const shift = progress * speed * rect.height * 0.5;
      img.style.transform = `translate3d(0, ${shift.toFixed(1)}px, 0)`;
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [speed]);

  return (
    <section ref={sectionRef} className={`relative w-full overflow-hidden ${className}`}>
      {/* Oversized image wrapper that we translate for the parallax */}
      <div ref={imageRef} className="absolute inset-x-0 -top-[18%] h-[136%] will-change-transform">
        <Image
          src={src}
          alt={quote ? '' : 'Charlotte Wang'}
          aria-hidden={quote ? true : undefined}
          fill
          priority={priority}
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition }}
        />
      </div>

      {overlay && quote && (
        <div className="absolute inset-0 bg-brown/45" />
      )}

      {quote && (
        <div className="relative z-10 flex h-full items-center justify-center px-6">
          <div className="max-w-4xl text-center">
            <p className="font-serif text-2xl uppercase leading-[1.45] tracking-[0.06em] text-cream sm:text-3xl md:text-[2.6rem] md:leading-[1.4]">
              {quote}
            </p>
            {cite && (
              <p className="mt-7 text-xs uppercase tracking-[0.28em] text-cream/60">{cite}</p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
