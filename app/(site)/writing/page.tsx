import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import { getWritingCategories, getWritingIntro, getWritings, toParagraphs } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Writing — Charlotte Wang',
  description: 'Poetry, short stories, reflections, and prose in English, Chinese, and French.',
};

const POSTER_WALL_STYLE = {
  background:
    'radial-gradient(ellipse 78% 88% at 54% 50%, rgba(137, 124, 77, 0.52) 0%, rgba(137, 124, 77, 0.32) 42%, rgba(137, 124, 77, 0.12) 64%, rgba(244, 241, 234, 0) 84%)',
} as const;

const PROFILE_FEATHER_STYLE = {
  background:
    'linear-gradient(to bottom, rgba(199, 172, 198, 0.26) 0%, transparent 6%, transparent 92%, rgba(47, 22, 54, 0.32) 100%), linear-gradient(to right, rgba(190, 160, 189, 0.22) 0%, transparent 7%, transparent 93%, rgba(190, 160, 189, 0.22) 100%)',
} as const;

export default async function WritingPage() {
  const [intro, writings, categories] = await Promise.all([
    getWritingIntro(),
    getWritings(),
    getWritingCategories(),
  ]);
  const introParas = toParagraphs(intro.intro);
  const [leadParagraph, ...bodyParagraphs] = introParas;
  const [writerName, writerRole = 'writer'] = intro.heading
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean);
  const writerNameParts = (writerName || 'Charlotte Wang').split(/\s+/);
  const writerLastName = writerNameParts.pop();
  const writerFirstName = writerNameParts.join(' ');

  return (
    <div className="pb-24 pt-20 md:pt-[4.5rem]">
      {/* Keep the poster itself crisp. Only the halo behind it borrows the wall
          colour and dissolves into the paper background. */}
      <section
        aria-label="Dear Tomorrow, Dear Past thesis poster installation"
        className="relative overflow-hidden bg-cream"
      >
        <div className="relative mx-auto max-w-[100rem] md:min-h-[48rem]">
          <Reveal className="relative z-10 mx-auto max-w-6xl px-6 pb-10 pt-14 md:flex md:min-h-[48rem] md:items-center md:px-10 md:py-20">
            <div className="max-w-md md:w-[46%]">
              <p className="eyebrow text-olive">Writing</p>
              <h1 className="mt-5 font-serif leading-[0.9] text-brown">
                <span className="block text-[3.7rem] tracking-[-0.045em] sm:text-7xl md:text-[clamp(5rem,7vw,7.4rem)]">
                  <span className="block">{writerFirstName}</span>
                  <span className="ml-[0.18em] block text-brown-soft">{writerLastName}</span>
                </span>
                <span className="mt-3 block text-2xl font-normal italic tracking-[-0.02em] text-olive md:mt-4 md:text-4xl">
                  {writerRole}
                </span>
              </h1>
              <p className="mt-7 max-w-sm border-t border-line pt-5 text-[0.98rem] leading-7 text-brown-soft md:mt-8 md:pt-6 md:text-base md:leading-8">
                {leadParagraph || 'Coming soon.'}
              </p>
            </div>
          </Reveal>

          <div
            className="relative mx-auto mb-12 aspect-[463/708] w-[min(90vw,23.5rem)] md:absolute md:inset-y-[5%] md:right-[2%] md:mx-0 md:mb-0 md:w-auto"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-x-16 -inset-y-10"
              style={POSTER_WALL_STYLE}
            />
            <div className="relative h-full w-full">
              <Image
                src={intro.portrait}
                alt="Dear Tomorrow, Dear Past senior thesis poster displayed at Amherst College"
                fill
                priority
                sizes="(max-width: 767px) 92vw, 46vw"
                className={`object-contain ${intro.portraitPositionClass}`}
              />
              {intro.portrait === '/images/writing-thesis-poster-closeup.jpg' && (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute left-[27.1%] top-[21.5%] h-[30.5%] w-[40.3%]"
                  style={PROFILE_FEATHER_STYLE}
                />
              )}
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent to-cream/95" />
      </section>

      {/* The rest of the introduction reads like an editorial essay, with a
          generous title column and quiet section markers for each movement. */}
      {bodyParagraphs.length > 0 && (
        <section className="mx-auto mt-20 max-w-[94rem] px-6 pb-6 md:mt-32 md:px-8">
          <Reveal className="grid gap-14 border-t border-line pt-16 md:grid-cols-[0.22fr_0.78fr] md:gap-10 md:pt-24">
            <div>
              <h2 className="-ml-1 max-w-[17rem] font-serif text-brown md:-ml-3">
                <span className="flex items-baseline whitespace-nowrap">
                  <span className="text-3xl leading-none tracking-[-0.035em] md:text-[2.5rem]">
                    A
                  </span>
                  <span className="ml-2 text-[3.65rem] lowercase leading-none tracking-[-0.055em] md:text-[4.6rem]">
                    writer
                  </span>
                </span>
                <span className="-mt-1 ml-[38%] block text-3xl italic leading-none tracking-[-0.035em] text-olive md:text-[2.7rem]">
                  first
                </span>
              </h2>
            </div>
            <div className="grid gap-x-16 lg:grid-cols-2">
              {bodyParagraphs.map((paragraph, index) => (
                <div
                  key={index}
                  className={`mb-12 break-inside-avoid border-t border-line/70 pt-5 ${
                    index % 2 === 1 ? 'lg:mt-10' : ''
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className="block text-[0.62rem] font-semibold tracking-[0.24em] text-olive/55"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <p className="mt-3 text-[1rem] leading-8 text-brown-soft first-letter:font-serif first-letter:text-[1.55em] first-letter:font-medium first-letter:leading-none first-letter:text-olive md:text-[1.06rem] md:leading-9">
                    {paragraph}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </section>
      )}

      {/* Writing category links */}
      <section className="mx-auto mt-20 max-w-6xl px-6 md:px-10">
        <Reveal>
          <p className="eyebrow">{intro.categoriesEyebrow}</p>
          <h2 className="mt-3 font-serif text-3xl text-brown md:text-4xl">
            {intro.categoriesHeading}
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          {categories.map((category, index) => {
            const count = writings.filter((writing) => writing.category === category.value).length;

            return (
              <Reveal key={category.value} delay={index * 100}>
                <Link
                  href={`/writing/${category.value}`}
                  className="editorial-card group flex h-full flex-col overflow-hidden rounded-xl border border-line"
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={category.img}
                      alt={category.label}
                      fill
                      sizes="(max-width: 768px) 90vw, 45vw"
                      className={`object-cover ${category.imgPositionClass} transition-transform duration-700 group-hover:scale-105`}
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between p-8">
                    <div>
                      <div className="flex justify-end">
                        <span className="text-xs font-medium text-brown-soft/70">
                          {count} {count === 1 ? 'piece' : 'pieces'}
                        </span>
                      </div>
                      <h3 className="mt-3 font-serif text-2xl text-brown transition-colors group-hover:text-olive">
                        {category.label}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-brown-soft">
                        {category.description}
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
