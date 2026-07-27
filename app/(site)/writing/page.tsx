import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import { getWritingCategories, getWritingIntro, getWritings, toParagraphs } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Writing — Charlotte Wang',
  description: 'Poetry, short stories, reflections, and prose in English, Chinese, and French.',
};

export default async function WritingPage() {
  const [intro, writings, categories] = await Promise.all([
    getWritingIntro(),
    getWritings(),
    getWritingCategories(),
  ]);
  const introParas = toParagraphs(intro.intro);

  return (
    <div className="pt-32 pb-24 md:pt-40">
      {/* Intro Header */}
      <header className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="grid items-center gap-12 md:grid-cols-[1.1fr_0.9fr] md:gap-16">
          <Reveal>
            <span className="inline-block px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-lavender-soft text-brown">
              Writing
            </span>
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
            className="relative aspect-[4/5] overflow-hidden rounded-sm border border-line shadow-sm"
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

      {/* Writing Categories Superlink Cards */}
      <section className="mx-auto max-w-6xl px-6 mt-20 md:px-10">
        <Reveal>
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-olive-soft/70 text-olive-deep">
            {intro.categoriesEyebrow}
          </span>
          <h2 className="mt-3 font-serif text-3xl text-brown md:text-4xl">{intro.categoriesHeading}</h2>
        </Reveal>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
          {categories.map((cat, i) => {
            const count = writings.filter((w) => w.category === cat.value).length;
            return (
              <Reveal key={cat.value} delay={i * 100}>
                <Link
                  href={`/writing/${cat.value}`}
                  className="group flex flex-col h-full overflow-hidden rounded-xl border border-line border-t-4 border-t-lavender-deep bg-paper transition-all hover:border-lavender-deep/60 hover:shadow-md"
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={cat.img}
                      alt={cat.label}
                      fill
                      sizes="(max-width: 768px) 90vw, 45vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-8 flex flex-col flex-1 justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-lavender-soft text-brown">
                          {cat.label}
                        </span>
                        <span className="text-xs text-brown-soft/70 font-medium">
                          {count} {count === 1 ? 'piece' : 'pieces'}
                        </span>
                      </div>
                      <h3 className="mt-3 font-serif text-2xl text-brown transition-colors group-hover:text-olive">
                        {cat.label}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-brown-soft">
                        {cat.description}
                      </p>
                    </div>
                    <span className="link-underline mt-6 inline-block text-xs font-semibold uppercase tracking-wider text-olive">
                      Read category →
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>
    </div>
  );
}
