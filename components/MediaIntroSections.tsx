import Image from 'next/image';
import Reveal from '@/components/Reveal';
import type { getMediaIntroSections } from '@/lib/site';

type MediaIntroSection = Awaited<ReturnType<typeof getMediaIntroSections>>[number];

function SectionCopy({ section }: { section: MediaIntroSection }) {
  const paragraphs = section.body
    ? section.body
        .split(/\n\s*\n/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean)
    : [];

  return (
    <div className="max-w-2xl">
      {section.eyebrow && <p className="eyebrow">{section.eyebrow}</p>}
      <h2 className={`${section.eyebrow ? 'mt-3' : ''} font-serif text-3xl text-brown md:text-4xl`}>
        {section.title}
      </h2>
      {paragraphs.length > 0 && (
        <div className="prose-warm mt-5 text-base md:text-lg">
          {paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      )}
    </div>
  );
}

function SectionImage({ section }: { section: MediaIntroSection }) {
  if (!section.sectionImage) return null;

  return (
    <figure>
      <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-greige">
        <Image
          src={section.sectionImage}
          alt={section.imageAlt || section.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className={`object-cover ${section.imagePositionClass}`}
        />
      </div>
      {section.imageCaption && (
        <figcaption className="mt-3 text-sm italic leading-relaxed text-brown-soft">
          {section.imageCaption}
        </figcaption>
      )}
    </figure>
  );
}

export default function MediaIntroSections({
  sections,
}: {
  sections: MediaIntroSection[];
}) {
  if (sections.length === 0) return null;

  return (
    <section aria-label="Category introduction" className="mb-20 space-y-12">
      {sections.map((section, index) => {
        const isWide = section.layout === 'wide-image';
        const imageFirst = section.layout === 'image-left';

        return (
          <Reveal key={section.slug} delay={Math.min(index * 80, 240)} as="article">
            <div className="editorial-card overflow-hidden rounded-sm border border-line p-6 md:p-10">
              {isWide ? (
                <>
                  <SectionCopy section={section} />
                  {section.sectionImage && (
                    <div className="mt-8">
                      <SectionImage section={section} />
                    </div>
                  )}
                </>
              ) : section.sectionImage ? (
                <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
                  <div className={imageFirst ? 'md:order-2' : 'md:order-1'}>
                    <SectionCopy section={section} />
                  </div>
                  <div className={imageFirst ? 'md:order-1' : 'md:order-2'}>
                    <SectionImage section={section} />
                  </div>
                </div>
              ) : (
                <SectionCopy section={section} />
              )}
            </div>
          </Reveal>
        );
      })}
    </section>
  );
}
