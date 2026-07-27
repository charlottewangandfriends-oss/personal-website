import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import { getWritingCategories, getWritingIntro, getWritings, toParagraphs } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Writing — Charlotte Wang',
  description: 'Poetry, short stories, reflections, and prose in English, Chinese, and French.',
};

const WALL_BACKGROUND_STYLE = {
  background:
    'linear-gradient(to bottom, #f4f1ea 0%, rgba(244, 241, 234, 0.05) 12%, rgba(244, 241, 234, 0) 82%, #f4f1ea 100%), linear-gradient(to right, #f4f1ea 0%, #887653 19%, #927f5d 81%, #f4f1ea 100%)',
} as const;

const PHOTO_FEATHER_STYLE = {
  WebkitMaskImage:
    'radial-gradient(ellipse 94% 92% at 52% 45%, black 68%, rgba(0,0,0,0.82) 78%, transparent 100%)',
  maskImage:
    'radial-gradient(ellipse 94% 92% at 52% 45%, black 68%, rgba(0,0,0,0.82) 78%, transparent 100%)',
} as const;

const WALL_SEAM_STYLE = {
  backgroundImage:
    'linear-gradient(to right, transparent 33.2%, rgba(54, 43, 29, 0.22) 33.3%, transparent 33.45%, transparent 66.5%, rgba(54, 43, 29, 0.2) 66.6%, transparent 66.75%)',
} as const;

export default async function WritingPage() {
  const [intro, writings, categories] = await Promise.all([
    getWritingIntro(),
    getWritings(),
    getWritingCategories(),
  ]);
  const introParas = toParagraphs(intro.intro);
  const [leadParagraph, ...bodyParagraphs] = introParas;

  return (
    <div className="pb-24 pt-32 md:pt-40">
      {/* Editorial introduction */}
      <header className="mx-auto max-w-6xl px-6 md:px-10">
        <Reveal>
          <p className="eyebrow">Writing</p>
          <div className="mt-5 grid items-end gap-8 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
            <h1 className="font-serif text-6xl leading-[0.92] text-brown sm:text-7xl md:text-8xl">
              {intro.heading}
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-brown-soft md:pb-2 md:text-xl md:leading-9">
              {leadParagraph || 'Coming soon.'}
            </p>
          </div>
        </Reveal>
      </header>

      {/* The real thesis poster remains part of its wall, which dissolves into the webpage. */}
      <section
        aria-label="Dear Tomorrow, Dear Past thesis poster installation"
        className="relative mt-14 overflow-hidden md:mt-20"
        style={WALL_BACKGROUND_STYLE}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-35"
          style={WALL_SEAM_STYLE}
        />

        <div className="relative mx-auto min-h-[54rem] max-w-[100rem] md:min-h-[50rem]">
          <Reveal className="relative z-10 mx-auto max-w-6xl px-6 pt-24 text-paper md:flex md:min-h-[50rem] md:items-center md:px-10 md:pb-24 md:pt-16">
            <div className="max-w-sm md:w-[42%]">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-paper/75">
                {intro.posterEyebrow}
              </p>
              <h2 className="mt-5 whitespace-pre-line font-serif text-5xl leading-[0.95] text-paper md:text-6xl">
                {intro.posterHeading}
              </h2>
              <p className="mt-6 max-w-xs border-t border-paper/35 pt-5 text-sm leading-7 text-paper/80">
                {intro.posterCaption}
              </p>
            </div>
          </Reveal>

          <div
            className="absolute inset-x-0 bottom-0 h-[68%] overflow-hidden md:inset-y-[2%] md:left-auto md:right-[5%] md:h-auto md:w-[48%] md:max-w-[44rem]"
            style={PHOTO_FEATHER_STYLE}
          >
            <Image
              src={intro.portrait}
              alt="Dear Tomorrow, Dear Past senior thesis poster displayed at Amherst College"
              fill
              priority
              sizes="(max-width: 767px) 100vw, 48vw"
              className={`object-cover ${intro.portraitPositionClass}`}
            />
            <div className="pointer-events-none absolute inset-y-0 left-0 w-[18%] bg-gradient-to-r from-[#8d7a58]/70 to-transparent" />
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-cream via-cream/35 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent via-cream/20 to-cream" />
      </section>

      {/* The rest of the introduction now reads as an essay instead of a long narrow column. */}
      {bodyParagraphs.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 pb-4 pt-8 md:px-10 md:pt-12">
          <Reveal className="grid gap-8 border-t border-line pt-10 md:grid-cols-[0.28fr_0.72fr] md:gap-14">
            <div>
              <p className="eyebrow">A writer first</p>
            </div>
            <div className="grid gap-x-12 lg:grid-cols-2">
              {bodyParagraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="mb-7 break-inside-avoid text-[1.02rem] leading-8 text-brown-soft"
                >
                  {paragraph}
                </p>
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
