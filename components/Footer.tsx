import Image from 'next/image';
import Link from 'next/link';
import { getContact } from '@/lib/site';

const navLinks = [
  { href: '/engagements', label: 'Engagements' },
  { href: '/about', label: 'About' },
  { href: '/media', label: 'Media' },
  { href: '/writing', label: 'Writing' },
  { href: '/contact', label: 'Contact' },
];

export default async function Footer() {
  const contact = await getContact();
  const socials = [
    { href: contact.instagram, label: 'Instagram' },
    { href: contact.facebook, label: 'Facebook' },
    { href: contact.youtube, label: 'YouTube' },
  ].filter((s) => s.href);

  return (
    <footer className="mt-24 border-t border-line bg-greige/40 md:mt-32">
      <div className="mx-auto max-w-6xl px-6 py-10 sm:py-12 md:px-10 md:py-16">
        <div className="grid gap-10 md:grid-cols-[1.25fr_0.75fr_1fr] md:gap-12">
          <div className="flex items-start gap-4 sm:gap-5">
            <div className="relative h-14 w-14 shrink-0 sm:h-16 sm:w-16 md:h-[4.5rem] md:w-[4.5rem]">
              <Image
                src="/images/brand-mark-dandelion-2026.png"
                alt="Charlotte Wang logo"
                fill
                sizes="72px"
                className="object-contain opacity-55"
              />
            </div>
            <div className="min-w-0 pt-0.5">
              <p className="font-serif text-2xl leading-none text-brown">Charlotte Wang</p>
              <p className="mt-3 max-w-sm text-sm leading-6 text-brown-soft">
                Conductor, composer, soprano, and collaborative pianist.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-8 sm:max-w-md md:contents">
            <nav className="flex flex-col gap-2.5">
              <p className="eyebrow mb-1">Explore</p>
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="link-underline w-fit text-sm text-brown-soft hover:text-brown"
                >
                  {l.label}
                </Link>
              ))}
            </nav>

            <div className="flex min-w-0 flex-col gap-2.5">
              <p className="eyebrow mb-1">Connect</p>
              <a
                href={`mailto:${contact.email}`}
                className="link-underline w-fit max-w-full break-words text-sm leading-5 text-brown-soft hover:text-brown"
              >
                {contact.email}
              </a>
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href as string}
                  target="_blank"
                  rel="noreferrer"
                  className="link-underline w-fit text-sm text-brown-soft hover:text-brown"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-line">
        <p className="mx-auto max-w-6xl px-6 py-5 text-[0.68rem] leading-5 text-brown-soft/70 md:px-10 md:py-6 md:text-xs">
          © {new Date().getFullYear()} Charlotte Wang. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
