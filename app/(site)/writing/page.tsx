import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import { getWritingCategories, getWritingIntro, getWritings, toParagraphs } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Writing — Charlotte Wang',
  description: 'Poetry, short stories, reflections, and prose in English, Chinese, and French.',
};

const POSTER_CROP_STYLE = {
  clipPath: 'polygon(2.2% 4.4%, 93.6% 1.4%, 97.3% 96.8%, 2.1% 96.5%)',
  WebkitMaskImage:
    'radial-gradient(ellipse 99% 99% at 50% 50%, black 84%, rgba(0,0,0,0.96) 90%, rgba(0,0,0,0.52) 96%, transparent 100%)',
  maskImage:
    'radial-gradient(ellipse 99% 99% at 50% 50%, black 84%, rgba(0,0,0,0.96) 90%, rgba(0,0,0,0.52) 96%, transparent 100%)',
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
  const isPosterCloseup =
    intro.portrait === '/images/writing-thesis-poster-closeup.jpg';

  return (
    <div className="pb-24 pt-20 md:pt-[4.5rem]">
      {/* Keep the poster itself crisp. Its outermost wall edge dissolves into
          a quiet grey-lavender atmosphere without a painted rectangular halo. */}
      <section
        aria-label="Dear Tomorrow, Dear Past thesis poster installation"
        className="relative overflow-hidden bg-cream"
      >
        <div className="relative mx-auto max-w-[94rem] md:min-h-[48rem]">
          <Reveal className="relative z-10 mx-auto max-w-[88rem] px-8 pb-10 pt-14 sm:px-12 md:flex md:min-h-[48rem] md:items-center md:px-16 md:py-20 lg:px-20">
            <div className="mx-auto max-w-md md:mx-0 md:w-[47%] md:pl-[2vw]">
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
            className="relative mx-auto mb-12 aspect-[463/708] w-[min(88vw,23.5rem)] md:absolute md:inset-y-[5%] md:right-[3.5%] md:mx-0 md:mb-0 md:w-auto"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-x-20 -inset-y-12 rounded-[48%] bg-[radial-gradient(ellipse_at_center,rgba(190,184,201,0.3)_0%,rgba(218,213,224,0.16)_48%,transparent_74%)] blur-3xl"
            />
            <div className="relative h-full w-full">
              {isPosterCloseup ? (
                <>
                  <Image
                    src={intro.portrait}
                    alt="Dear Tomorrow, Dear Past senior thesis poster displayed at Amherst College"
                    fill
                    priority
                    sizes="(max-width: 767px) 88vw, 46vw"
                    className={`object-contain ${intro.portraitPositionClass}`}
                    style={POSTER_CROP_STYLE}
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute left-[27.1%] top-[21.5%] h-[30.5%] w-[40.3%]"
                    style={PROFILE_FEATHER_STYLE}
                  />
                </>
              ) : (
                <Image
                  src={intro.portrait}
                  alt="Dear Tomorrow, Dear Past senior thesis poster displayed at Amherst College"
                  fill
                  priority
                  sizes="(max-width: 767px) 88vw, 46vw"
                  className={`object-contain ${intro.portraitPositionClass}`}
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
        <section className="mx-auto mt-14 max-w-[94rem] px-6 pb-8 sm:px-8 md:mt-28 lg:px-10">
          <Reveal className="border-t border-line/85 pt-10 md:grid md:grid-cols-[minmax(13rem,0.27fr)_minmax(0,0.73fr)] md:gap-x-12 md:pt-20 lg:gap-x-20">
            <div className="md:self-start">
              <h2 className="max-w-[20rem] font-serif text-brown">
                <span className="flex flex-wrap items-end">
                  <span className="mb-[0.18em] mr-2.5 text-[1.7rem] leading-none tracking-[-0.025em] md:text-[2rem]">
                    A
                  </span>
                  <span className="text-[clamp(3.45rem,18vw,4.5rem)] lowercase leading-[0.82] tracking-[-0.055em] md:text-[clamp(4rem,6vw,4.8rem)]">
                    writer
                  </span>
                </span>
                <span className="mt-4 flex items-center justify-end gap-3 pr-12">
                  <span aria-hidden="true" className="h-px w-11 bg-line" />
                  <span className="text-[1.85rem] italic leading-none tracking-[-0.025em] text-olive md:text-[2.25rem]">
                    first
                  </span>
                </span>
              </h2>
            </div>
            <div className="mt-11 max-w-[52rem] md:mt-0">
              {bodyParagraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className={`text-pretty text-[1rem] leading-[1.85] text-brown-soft md:text-[1.04rem] md:leading-[1.9] ${
                    index === 0 ? '' : 'mt-7'
                  }`}
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
