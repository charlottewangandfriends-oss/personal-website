'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ABOUT_AREA_LINKS } from '@/lib/about-area-links';

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/media', label: 'Media' },
  { href: '/engagements', label: 'Engagements' },
  { href: '/contact', label: 'Contact' },
];

const aboutLinks = [
  ...ABOUT_AREA_LINKS.filter((area) => area.slug !== 'more').map((area) => ({
    href: `/about/${area.slug}`,
    label: area.label,
  })),
  { href: '/writing', label: 'Writing' },
  { href: '/about/more', label: 'More' },
];

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const isHome = pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setAboutOpen(false);
  }, [pathname]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setAboutOpen(false);
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    };

    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, []);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);
  const isAboutActive = isActive('/about') || isActive('/writing');

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open || aboutOpen
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
          {links.map((l) =>
            l.href === '/about' ? (
              <li
                key={l.href}
                className="group relative"
                onMouseEnter={() => setAboutOpen(true)}
                onMouseLeave={() => setAboutOpen(false)}
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget)) {
                    setAboutOpen(false);
                  }
                }}
              >
                <div className="flex items-center gap-1.5">
                  <Link
                    href={l.href}
                    aria-haspopup="true"
                    onFocus={() => setAboutOpen(true)}
                    className={`link-underline text-sm tracking-wide transition-colors ${
                      isAboutActive ? 'text-olive' : 'text-brown-soft hover:text-brown'
                    }`}
                  >
                    {l.label}
                  </Link>
                  <button
                    type="button"
                    aria-label="Toggle About sections"
                    aria-controls="desktop-about-sections"
                    aria-expanded={aboutOpen}
                    onClick={() => setAboutOpen((value) => !value)}
                    className="flex h-7 w-5 items-center justify-center text-brown-soft transition-colors hover:text-brown focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive"
                  >
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 16 16"
                      fill="none"
                      className={`h-3.5 w-3.5 transition-transform duration-300 ${
                        aboutOpen ? 'rotate-180' : ''
                      }`}
                    >
                      <path
                        d="m3.75 6 4.25 4 4.25-4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>

                <div
                  id="desktop-about-sections"
                  className={`absolute left-1/2 top-full w-44 -translate-x-1/2 pt-3 transition-[opacity,transform,visibility] duration-300 group-hover:visible group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 motion-reduce:transition-none ${
                    aboutOpen
                      ? 'visible pointer-events-auto translate-y-0 opacity-100'
                      : 'invisible pointer-events-none -translate-y-1 opacity-0'
                  }`}
                >
                  <ul
                    aria-label="About sections"
                    className="overflow-hidden rounded-sm border border-lavender-deep/25 bg-paper/95 py-2 shadow-[0_16px_38px_rgba(63,47,33,0.12)] backdrop-blur-md"
                  >
                    {aboutLinks.map((area) => {
                      const active = isActive(area.href);
                      return (
                        <li key={area.href}>
                          <Link
                            href={area.href}
                            aria-current={active ? 'page' : undefined}
                            className={`block px-4 py-2.5 text-xs uppercase tracking-[0.14em] transition-colors hover:bg-lavender-soft/80 hover:text-brown focus-visible:bg-lavender-soft/80 focus-visible:text-brown focus-visible:outline-none ${
                              active ? 'text-olive' : 'text-brown-soft'
                            }`}
                          >
                            {area.label}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </li>
            ) : (
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
            ),
          )}
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
            aria-controls="mobile-site-menu"
            aria-expanded={open}
            onClick={() => {
              const nextOpen = !open;
              setOpen(nextOpen);
              if (!nextOpen) setAboutOpen(false);
            }}
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
        id="mobile-site-menu"
        className={`transition-[max-height] duration-500 md:hidden ${
          open
            ? 'max-h-[calc(100svh-4.5rem)] overflow-y-auto overscroll-contain'
            : 'max-h-0 overflow-hidden'
        }`}
      >
        <ul className="flex flex-col gap-1 px-6 pb-6">
          {links.map((l) =>
            l.href === '/about' ? (
              <li key={l.href}>
                <div className="flex items-center justify-between">
                  <Link
                    href={l.href}
                    className={`block flex-1 py-2 font-serif text-2xl ${
                      isAboutActive ? 'text-olive' : 'text-brown'
                    }`}
                  >
                    {l.label}
                  </Link>
                  <button
                    type="button"
                    aria-label="Toggle About sections"
                    aria-controls="mobile-about-sections"
                    aria-expanded={aboutOpen}
                    onClick={() => setAboutOpen((value) => !value)}
                    className="flex h-11 w-11 items-center justify-center rounded-full text-brown transition-colors hover:bg-lavender-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive"
                  >
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 16 16"
                      fill="none"
                      className={`h-4 w-4 transition-transform duration-300 ${
                        aboutOpen ? 'rotate-180' : ''
                      }`}
                    >
                      <path
                        d="m3.75 6 4.25 4 4.25-4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>

                {aboutOpen && (
                  <ul
                    id="mobile-about-sections"
                    aria-label="About sections"
                    className="mb-2 ml-2 border-l border-lavender-deep/30 pl-4"
                  >
                    {aboutLinks.map((area) => {
                      const active = isActive(area.href);
                      return (
                        <li key={area.href}>
                          <Link
                            href={area.href}
                            aria-current={active ? 'page' : undefined}
                            className={`flex min-h-11 items-center text-sm uppercase tracking-[0.13em] ${
                              active ? 'text-olive' : 'text-brown-soft'
                            }`}
                          >
                            {area.label}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            ) : (
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
            ),
          )}
        </ul>
      </div>
    </header>
  );
}
