import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Reveal from '@/components/Reveal';
import { getBirthdayReflection, getBirthdayReflections, toParagraphs } from '@/lib/site';

const collectionPath = '/writing/prose-blog/birthday-reflections';
export async function generateStaticParams() {
  return (await getBirthdayReflections()).map((entry) => ({ year: entry.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ year: string }> }): Promise<Metadata> {
  const { year } = await params;
  const entry = await getBirthdayReflection(year);
  return { title: entry ? `${entry.year} — Birthday Reflections` : 'Birthday Reflections' };
}
function inlineEmphasis(text: string) {
  return text.split(/(\*[^*]+\*)/g).map((part, index) =>
    part.startsWith('*') && part.endsWith('*') ? <em key={index}>{part.slice(1, -1)}</em> : part
  );
}
export default async function BirthdayReflectionPage({ params }: { params: Promise<{ year: string }> }) {
  const { year } = await params;
  const entry = await getBirthdayReflection(year);
  if (!entry || (!entry.bodyZh?.trim() && !entry.bodyEn?.trim())) notFound();
  const versions = [
    { lang: 'zh', label: '中文', body: entry.bodyZh },
    { lang: 'en', label: 'English', body: entry.bodyEn },
  ].filter((version) => version.body?.trim());
  return (
    <article className="mx-auto max-w-2xl px-6 pt-32 pb-24 md:px-10 md:pt-40">
      <Reveal>
        <Link href={collectionPath} className="link-underline text-sm text-brown-soft hover:text-brown">← Back to Birthday Reflections</Link>
        <p className="eyebrow mt-8">Birthday Reflections</p>
        <h1 className="mt-3 font-serif text-4xl text-brown md:text-5xl">{entry.year}</h1>
        {entry.date && <p className="mt-3 text-sm text-brown-soft/70">{new Date(entry.date).toLocaleDateString('en-US', { timeZone: 'UTC', year: 'numeric', month: 'long', day: 'numeric' })}</p>}
        {entry.sourceDate && entry.sourceDate !== entry.date && <p className="mt-2 text-sm text-brown-soft/70">Originally posted {new Date(entry.sourceDate).toLocaleDateString('en-US', { timeZone: 'UTC', year: 'numeric', month: 'long', day: 'numeric' })}</p>}
        {versions.length > 1 && <nav aria-label="Languages" className="mt-6 flex gap-5">{versions.map((version) => <a key={version.lang} href={`#${version.lang}`} className="link-underline text-sm text-brown">{version.label}</a>)}</nav>}
      </Reveal>
      {entry.photo && <figure className="mt-10">
        {/* Preserve the original photograph's full frame and aspect ratio. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={entry.photo} alt={entry.photoAlt || `Birthday photograph, ${entry.year}`} className="mx-auto h-auto max-h-[38rem] w-auto max-w-full rounded-sm" />
        {entry.photoCaption && <figcaption className="mt-3 text-center text-sm text-brown-soft/80">{entry.photoCaption}</figcaption>}
      </figure>}
      {versions.map((version) => (
        <section key={version.lang} id={version.lang} lang={version.lang} className="mt-10 scroll-mt-28">
          <h2 className="eyebrow mb-6">{version.label}</h2>
          <div className="prose-warm text-[1.1rem] leading-loose">
            {toParagraphs(version.body).map((paragraph, i) => <p key={i} className="whitespace-pre-line">{inlineEmphasis(paragraph)}</p>)}
          </div>
        </section>
      ))}
      <Link href={collectionPath} className="link-underline mt-16 inline-block text-sm text-brown-soft hover:text-brown">← Back to Birthday Reflections</Link>
    </article>
  );
}
