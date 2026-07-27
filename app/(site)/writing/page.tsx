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
    'linear-gradient(to bottom, #f4f1ea 0%, rgba(244, 241, 234, 0.08) 11%, rgba(244, 241, 234, 0) 82%, #f4f1ea 100%), radial-gradient(ellipse 88% 112% at 53% 48%, #887653 0%, #8d7a59 54%, rgba(141, 122, 89, 0.82) 69%, rgba(141, 122, 89, 0.34) 84%, rgba(244, 241, 234, 0) 100%), #f4f1ea',
} as const;

const PHOTO_FEATHER_STYLE = {
  WebkitMaskImage:
    'radial-gradient(ellipse 54% 92% at 52% 45%, black 45%, rgba(0,0,0,0.96) 54%, rgba(0,0,0,0.72) 60%, rgba(0,0,0,0.26) 68%, rgba(0,0,0,0.06) 75%, transparent 82%)',
  maskImage:
    'radial-gradient(ellipse 54% 92% at 52% 45%, black 45%, rgba(0,0,0,0.96) 54%, rgba(0,0,0,0.72) 60%, rgba(0,0,0,0.26) 68%, rgba(0,0,0,0.06) 75%, transparent 82%)',
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

  return (
    <div className="pb-24 pt-20 md:pt-[4.5rem]">
      {/* The real thesis poster remains part of its wall, while the page title
          sits beside it instead of presenting the thesis as a separate feature. */}
      <section
        aria-label="Dear Tomorrow, Dear Past thesis poster installation"
        className="relative overflow-hidden"
        style={WALL_BACKGROUND_STYLE}
      >
        <div className="relative mx-auto min-h-[54rem] max-w-[100rem] md:min-h-[50rem]">
          <Reveal className="relative z-10 mx-auto max-w-6xl px-6 pt-24 text-paper md:flex md:min-h-[50rem] md:items-center md:px-10 md:pb-24 md:pt-16">
            <div className="max-w-md md:w-[46%]">
              <p className="eyebrow text-paper/75">Writing</p>
              <h1 className="mt-5 font-serif leading-[0.9] text-paper">
                <span className="block text-6xl tracking-[-0.045em] sm:text-7xl md:text-[clamp(5rem,7vw,7.4rem)]">
                  {writerName || 'Charlotte Wang'}
                </span>
                <span className="mt-4 block text-3xl font-normal italic tracking-[-0.02em] text-paper/78 md:text-4xl">
                  {writerRole}
                </span>
              </h1>
              <p className="mt-8 max-w-sm border-t border-paper/35 pt-6 text-base leading-8 text-paper/84">
                {leadParagraph || 'Coming soon.'}
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
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-cream via-cream/35 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent via-cream/20 to-cream" />
      </section>

      {/* The rest of the introduction reads like an editorial essay, with a
          generous title column and quiet section markers for each movement. */}
      {bodyParagraphs.length > 0 && (
        <section className="mx-auto mt-20 max-w-[94rem] px-6 pb-6 md:mt-32 md:px-8">
          <Reveal className="grid gap-12 border-t border-line pt-16 md:grid-cols-[0.23fr_0.77fr] md:gap-8 md:pt-24">
            <div>
              <h2 className="max-w-[18rem] font-serif text-brown">
                <span className="flex items-baseline gap-2 whitespace-nowrap">
                  <span className="text-4xl leading-none tracking-[-0.035em] md:text-[2.7rem]">
                    A
                  </span>
                  <span className="text-5xl uppercase leading-none tracking-[-0.065em] md:text-[3.7rem]">
                    writer
                  </span>
                </span>
                <span className="ml-[42%] mt-2 block text-4xl italic leading-none tracking-[-0.035em] md:text-5xl">
                  first
                </span>
              </h2>
            </div>
            <div className="grid gap-x-16 lg:grid-cols-2">
              {bodyParagraphs.map((paragraph, index) => (
                <div key={index} className="mb-12 break-inside-avoid">
                  <span
                    aria-hidden="true"
                    className="block text-[0.62rem] font-semibold tracking-[0.24em] text-olive/55"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <p className="mt-3 text-[1.02rem] leading-8 text-brown-soft md:text-[1.08rem] md:leading-9">
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
