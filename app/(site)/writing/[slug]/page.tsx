import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Reveal from '@/components/Reveal';
import {
  getWriting,
  getWritingCategories,
  getWritingIntro,
  getWritings,
  toParagraphs,
  WRITING_CATEGORIES,
} from '@/lib/site';

const langLabel: Record<string, string> = { en: 'English', zh: '中文', fr: 'Français' };

export async function generateStaticParams() {
  const writings = await getWritings();
  const categorySlugs = WRITING_CATEGORIES.map((c) => ({ slug: c.value }));
  const pieceSlugs = writings.map((w) => ({ slug: w.slug }));
  return [...categorySlugs, ...pieceSlugs];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const categories = await getWritingCategories();
  const category = categories.find((c) => c.value === slug);
  if (category) {
    return { title: `${category.label} — Writing` };
  }
  const piece = await getWriting(slug);
  return { title: piece ? piece.title : 'Writing' };
}

export default async function WritingSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const categories = await getWritingCategories();

  // 1. Check if slug matches a Writing Category
  const category = categories.find((c) => c.value === slug);
  if (category) {
    const [allWritings, writingPage] = await Promise.all([
      getWritings(),
      getWritingIntro(),
    ]);
    const items = allWritings.filter((w) => w.category === category.value);
    const isMemoir = category.value === 'dear-past-dear-tomorrow';
    const collaborationParagraphs = isMemoir
      ? toParagraphs(writingPage.memoirCollaborationBody)
      : [];

    return (
      <div className="pt-32 pb-24 md:pt-40">
        <header className="mx-auto max-w-4xl px-6 md:px-10">
          <Reveal>
            <Link
              href="/writing"
              className="link-underline text-sm tracking-wide text-brown-soft hover:text-brown"
            >
              ← Back to Writing
            </Link>
            <p className="eyebrow mt-6">Writing Category</p>
            <h1 className="mt-3 font-serif text-4xl text-brown sm:text-5xl md:text-6xl">
              {category.label}
            </h1>
            <p className="mt-4 max-w-xl text-lg text-brown-soft">
              {category.description}
            </p>
            {isMemoir && writingPage.memoirPdf && (
              <a
                href={writingPage.memoirPdf}
                download="Dear-Tomorrow-Dear-Past-Charlotte-Wang.pdf"
                className="mt-8 inline-flex rounded-full bg-brown px-7 py-3.5 text-sm tracking-wide text-cream transition-colors hover:bg-olive"
              >
                {writingPage.memoirButtonLabel} ↓
              </a>
            )}
          </Reveal>
        </header>

        <div className="mx-auto mt-14 max-w-4xl px-6 md:px-10">
          {isMemoir && (
            <Reveal>
              <section className="border-y border-line py-12 md:grid md:grid-cols-[0.72fr_1.28fr] md:gap-14 md:py-16">
                <div>
                  <p className="eyebrow">{writingPage.memoirCollaborationEyebrow}</p>
                  <h2 className="mt-4 font-serif text-4xl leading-tight text-brown md:text-5xl">
                    {writingPage.memoirCollaborationHeading}
                  </h2>
                </div>
                <div className="mt-8 md:mt-0">
                  <div className="space-y-4 text-[1.05rem] leading-8 text-brown-soft">
                    {collaborationParagraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                  <Link
                    href="/contact"
                    className="link-underline mt-7 inline-block text-sm tracking-wide text-brown hover:text-olive"
                  >
                    Start a conversation →
                  </Link>
                </div>
              </section>
            </Reveal>
          )}

          {items.length === 0 && !isMemoir ? (
            <Reveal>
              <div className="rounded-xl border border-line bg-paper p-10 text-center">
                <p className="text-base text-brown-soft/80">Pieces in this category will be published soon.</p>
              </div>
            </Reveal>
          ) : items.length > 0 ? (
            <ul className="flex flex-col">
              {items.map((w, i) => (
                <Reveal as="li" key={w.slug} delay={i * 60}>
                  <Link
                    href={`/writing/${w.slug}`}
                    className="group block border-b border-line py-7 transition-colors hover:bg-paper/60"
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="font-serif text-2xl text-brown group-hover:text-olive">
                        {w.title}
                      </h3>
                      <span className="shrink-0 text-xs uppercase tracking-widest text-brown-soft/60">
                        {langLabel[w.language] ?? ''}
                      </span>
                    </div>
                    {w.excerpt && (
                      <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-brown-soft">
                        {w.excerpt}
                      </p>
                    )}
                  </Link>
                </Reveal>
              ))}
            </ul>
          ) : null}

          <Reveal delay={200} className="mt-16 border-t border-line pt-8">
            <Link
              href="/writing"
              className="link-underline text-sm tracking-wide text-brown-soft hover:text-brown"
            >
              ← Back to Writing
            </Link>
          </Reveal>
        </div>
      </div>
    );
  }

  // 2. Otherwise handle individual writing piece
  const piece = await getWriting(slug);
  if (!piece) notFound();

  const body = toParagraphs(piece.body);
  const pieceCat = categories.find((c) => c.value === piece.category);

  return (
    <article className="pt-32 pb-24 md:pt-40">
      <div className="mx-auto max-w-2xl px-6 md:px-10">
        <Reveal>
          <Link
            href={pieceCat ? `/writing/${pieceCat.value}` : '/writing'}
            className="link-underline text-sm tracking-wide text-brown-soft hover:text-brown"
          >
            ← Back to {pieceCat?.label ?? 'Writing'}
          </Link>
          <p className="eyebrow mt-8">{pieceCat?.label}</p>
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

        <Reveal delay={200} className="mt-16 border-t border-line pt-8">
          <Link
            href={pieceCat ? `/writing/${pieceCat.value}` : '/writing'}
            className="link-underline text-sm tracking-wide text-brown-soft hover:text-brown"
          >
            ← Back to {pieceCat?.label ?? 'Writing'}
          </Link>
        </Reveal>
      </div>
    </article>
  );
}
