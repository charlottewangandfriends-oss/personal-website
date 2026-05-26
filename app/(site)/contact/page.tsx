import type { Metadata } from 'next';
import Image from 'next/image';
import Reveal from '@/components/Reveal';
import ContactForm from '@/components/ContactForm';
import { getContact } from '@/lib/site';

export const metadata: Metadata = { title: 'Contact' };

export default async function ContactPage() {
  const contact = await getContact();
  const socials = [
    { href: contact.instagram, label: 'Instagram' },
    { href: contact.facebook, label: 'Facebook' },
    { href: contact.youtube, label: 'YouTube' },
  ].filter((s) => s.href);

  return (
    <div className="pt-32 md:pt-40">
      <div className="mx-auto grid max-w-6xl gap-14 px-6 pb-8 md:grid-cols-[1fr_0.85fr] md:px-10">
        <Reveal>
          <p className="eyebrow">Contact</p>
          <h1 className="mt-4 font-serif text-5xl text-brown md:text-6xl">{contact.heading}</h1>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-brown-soft">{contact.blurb}</p>

          <div className="mt-8">
            <ContactForm email={contact.email} />
          </div>

          <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3">
            <a
              href={`mailto:${contact.email}`}
              className="link-underline text-sm text-brown-soft hover:text-brown"
            >
              {contact.email}
            </a>
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href as string}
                target="_blank"
                rel="noreferrer"
                className="link-underline text-sm text-brown-soft hover:text-brown"
              >
                {s.label}
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal
          delay={120}
          className="relative hidden aspect-[3/4] overflow-hidden rounded-sm border border-line md:block"
        >
          <Image
            src="/images/charlotte-lyrical.jpg"
            alt="Charlotte Wang"
            fill
            sizes="40vw"
            className="object-cover"
          />
        </Reveal>
      </div>
    </div>
  );
}
