import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Reveal from '@/components/Reveal';
import { getWriting, getWritings, toParagraphs, WRITING_CATEGORIES } from '@/lib/site';

export async function generateStaticParams() {
  const writings = await getWritings();
  return writings.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const piece = await getWriting(slug);
  return { title: piece ? piece.title : 'Writing' };
}

export default async function WritingPiece({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const piece = await getWriting(slug);
  if (!piece) notFound();

  const body = toParagraphs(piece.body);
  const category = WRITING_CATEGORIES.find((c) => c.value === piece.category);

  return (
    <article className="pt-32 md:pt-40">
      <div className="mx-auto max-w-2xl px-6 md:px-10">
        <Reveal>
          <Link
            href="/writing"
            className="link-underline text-sm tracking-wide text-brown-soft hover:text-brown"
          >
            ← All writing
          </Link>
          <p className="eyebrow mt-8">{category?.label}</p>
          <h1 className="mt-3 font-serif text-4xl text-brown md:text-5xl">{piece.title}</h1>
          {piece.date && (
            <p className="mt-3 text-sm text-brown-soft/70">
              {new Date(piece.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          )}
        </Reveal>

        <Reveal delay={100} className="prose-warm mt-10 text-[1.1rem] leading-loose">
          {body.length ? (
            body.map((p, i) => <p key={i}>{p}</p>)
          ) : (
            <p className="italic text-brown-soft/70">This piece will be published soon.</p>
          )}
        </Reveal>
      </div>
    </article>
  );
}
