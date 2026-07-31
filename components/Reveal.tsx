'use client';

import { useEffect, useRef, useState } from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: keyof React.JSX.IntrinsicElements;
};

export default function Reveal({ children, className = '', delay = 0, as = 'div' }: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || !('IntersectionObserver' in window)) return;

    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const rect = el.getBoundingClientRect();
    const isAlreadyVisible = rect.top < viewportHeight * 0.92 && rect.bottom > 0;

    // Server-rendered content stays visible. Only elements that are safely below
    // the initial viewport opt into the decorative reveal animation.
    if (isAlreadyVisible) return;

    setPending(true);

    let observer: IntersectionObserver | null = null;
    let fallbackId: number | undefined;

    const reveal = () => {
      setPending(false);
      observer?.disconnect();
      if (fallbackId !== undefined) window.clearTimeout(fallbackId);
      window.removeEventListener('pageshow', reveal);
    };

    window.addEventListener('pageshow', reveal);

    try {
      observer = new window.IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) reveal();
        },
        { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
      );
      observer.observe(el);

      // Animation is never allowed to keep real content hidden indefinitely.
      fallbackId = window.setTimeout(reveal, 1500);
    } catch {
      reveal();
    }

    return () => {
      observer?.disconnect();
      if (fallbackId !== undefined) window.clearTimeout(fallbackId);
      window.removeEventListener('pageshow', reveal);
    };
  }, []);

  const Tag = as as React.ElementType;
  return (
    <Tag
      ref={ref}
      className={`reveal ${pending ? 'is-pending' : ''} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
