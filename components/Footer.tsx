import Image from 'next/image';
import Link from 'next/link';
import { getContact } from '@/lib/site';

const navLinks = [
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
    <footer className="mt-32 border-t border-line bg-greige/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-3 md:px-10">
        <div className="flex items-start gap-5">
          <div className="relative mt-0.5 h-16 w-16 shrink-0 md:h-[4.5rem] md:w-[4.5rem]">
            <Image
              src="/image.png"
              alt="Charlotte Wang logo"
              fill
              sizes="72px"
              className="object-contain opacity-58"
            />
          </div>
          <div>
            <p className="font-serif text-2xl text-brown">Charlotte Wang</p>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-brown-soft">
              Conductor, composer, soprano, and collaborative pianist.
            </p>
          </div>
        </div>

        <nav className="flex flex-col gap-2">
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

        <div className="flex flex-col gap-2">
          <p className="eyebrow mb-1">Connect</p>
          <a
            href={`mailto:${contact.email}`}
            className="link-underline w-fit text-sm text-brown-soft hover:text-brown"
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
      <div className="border-t border-line">
        <p className="mx-auto max-w-6xl px-6 py-6 text-xs text-brown-soft/70 md:px-10">
          © {new Date().getFullYear()} Charlotte Wang. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
