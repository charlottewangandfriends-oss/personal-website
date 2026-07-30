'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const links = [
  { href: '/', label: 'Home' },
  { href: '/engagements', label: 'Engagements' },
  { href: '/about', label: 'About' },
  { href: '/media', label: 'Media' },
  { href: '/writing', label: 'Writing' },
  { href: '/contact', label: 'Contact' },
];

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const isHome = pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open
          ? 'bg-cream/90 backdrop-blur-md border-b border-line'
          : 'bg-cream/78 backdrop-blur-sm border-b border-line/40 md:bg-transparent md:backdrop-blur-none md:border-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-10 md:py-5">
        <Link
          href="/"
          className="group flex items-center gap-3 font-serif text-xl tracking-tight text-brown md:text-2xl"
        >
          {!isHome && (
            <span className="relative h-10 w-10 shrink-0 md:h-12 md:w-12">
              <Image
                src="/images/brand-mark-dandelion-2026.png"
                alt=""
                aria-hidden
                fill
                sizes="48px"
                className="object-contain opacity-70 transition-opacity duration-300 group-hover:opacity-90"
              />
            </span>
          )}
          <span>Charlotte&nbsp;Wang</span>
        </Link>

        <ul className="hidden items-center gap-6 lg:gap-9 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={`link-underline text-sm tracking-wide transition-colors ${
                  isActive(l.href) ? 'text-olive' : 'text-brown-soft hover:text-brown'
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3 md:hidden">
          <Link
            href="/engagements"
            aria-current={isActive('/engagements') ? 'page' : undefined}
            className={`inline-flex items-center gap-1.5 text-[0.66rem] uppercase tracking-[0.12em] transition-colors ${
              isActive('/engagements') ? 'text-olive' : 'text-brown-soft hover:text-brown'
            }`}
          >
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-lavender shadow-[0_0_0_3px_rgba(207,199,216,0.22)]"
            />
            <span className="min-[350px]:hidden">Dates</span>
            <span className="hidden min-[350px]:inline">Engagements</span>
          </Link>

          <button
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-8 w-8 flex-col items-center justify-center gap-[5px]"
          >
            <span
              className={`h-px w-6 bg-brown transition-transform duration-300 ${
                open ? 'translate-y-[6px] rotate-45' : ''
              }`}
            />
            <span
              className={`h-px w-6 bg-brown transition-opacity duration-300 ${
                open ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`h-px w-6 bg-brown transition-transform duration-300 ${
                open ? '-translate-y-[6px] -rotate-45' : ''
              }`}
            />
          </button>
        </div>
      </nav>

      <div
        className={`overflow-hidden transition-[max-height] duration-500 md:hidden ${
          open ? 'max-h-80' : 'max-h-0'
        }`}
      >
        <ul className="flex flex-col gap-1 px-6 pb-6">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={`block py-2 font-serif text-2xl ${
                  isActive(l.href) ? 'text-olive' : 'text-brown'
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
