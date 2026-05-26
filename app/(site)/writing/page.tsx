import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import { getWritingIntro, getWritings, toParagraphs, WRITING_CATEGORIES } from '@/lib/site';

export const metadata: Metadata = { title: 'Writing' };

const langLabel: Record<string, string> = { en: 'English', zh: '中文', fr: 'Français' };

export default async function WritingPage() {
  const [intro, writings] = await Promise.all([getWritingIntro(), getWritings()]);
  const introParas = toParagraphs(intro.intro);

  return (
    <div className="pt-32 md:pt-40">
      {/* Intro */}
      <header className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="grid items-center gap-12 md:grid-cols-[1.1fr_0.9fr] md:gap-16">
          <Reveal>
            <p className="eyebrow">Writing</p>
            <h1 className="mt-4 font-serif text-5xl text-brown md:text-6xl">{intro.heading}</h1>
            <div className="prose-warm mt-6 max-w-xl">
              {introParas.length ? (
                introParas.map((p, i) => <p key={i}>{p}</p>)
              ) : (
                <p>Coming soon.</p>
              )}
            </div>
          </Reveal>
          <Reveal
            delay={120}
            className="relative aspect-[4/5] overflow-hidden rounded-sm border border-line"
          >
            <Image
              src={intro.portrait}
              alt="Charlotte Wang"
              fill
              sizes="(max-width: 768px) 90vw, 40vw"
              className="object-cover"
            />
          </Reveal>
        </div>
      </header>

      {/* Pieces by category */}
      <div className="mx-auto max-w-4xl px-6 md:px-10">
        {WRITING_CATEGORIES.map((cat) => {
          const items = writings.filter((w) => w.category === cat.value);
          return (
            <section key={cat.value} className="mt-20">
              <Reveal>
                <h2 className="mb-7 flex items-baseline gap-4 font-serif text-3xl text-brown">
                  {cat.label}
                  <span className="h-px flex-1 bg-line" />
                </h2>
              </Reveal>
              {items.length === 0 ? (
                <Reveal>
                  <p className="text-sm italic text-brown-soft/70">Coming soon.</p>
                </Reveal>
              ) : (
                <ul className="flex flex-col">
                  {items.map((w, i) => (
                    <Reveal as="li" key={w.slug} delay={i * 60}>
                      <Link
                        href={`/writing/${w.slug}`}
                        className="group block border-b border-line py-6 transition-colors hover:bg-paper/60"
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
                          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-brown-soft">
                            {w.excerpt}
                          </p>
                        )}
                      </Link>
                    </Reveal>
                  ))}
                </ul>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
