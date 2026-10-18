import type { Metadata } from 'next';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import { getBirthdayReflections } from '@/lib/site';

export const metadata: Metadata = { title: 'Birthday Reflections — Writing' };

export default async function BirthdayReflectionsPage() {
  const entries = await getBirthdayReflections();
  return (
    <main className="mx-auto max-w-4xl px-6 pt-32 pb-24 md:px-10 md:pt-40">
      <Reveal>
        <Link href="/writing/prose-blog" className="link-underline text-sm text-brown-soft hover:text-brown">← Back to Prose &amp; Blogs</Link>
        <p className="eyebrow mt-8">Prose &amp; Blogs · Collection</p>
        <h1 className="mt-3 font-serif text-4xl text-brown sm:text-5xl md:text-6xl">Birthday Reflections</h1>
        <p className="mt-5 text-lg text-brown-soft">Annual reflections, collected by year.</p>
      </Reveal>
      <ul className="mt-12">
        {entries.map((entry) => (
          <Reveal as="li" key={entry.slug}>
            <Link href={`/writing/prose-blog/birthday-reflections/${entry.slug}`} className="group flex items-center justify-between gap-4 border-b border-line py-7 hover:bg-paper/60">
              <h2 className="font-serif text-3xl text-brown group-hover:text-olive">{entry.year}</h2>
              <span className="text-sm text-brown-soft">{[entry.bodyZh?.trim() ? '中文' : '', entry.bodyEn?.trim() ? 'English' : ''].filter(Boolean).join(' / ')} →</span>
            </Link>
          </Reveal>
        ))}
      </ul>
    </main>
  );
}
