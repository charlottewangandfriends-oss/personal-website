import type { Metadata } from 'next';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import {
  getCompositionFeature,
  getVideos,
  toParagraphs,
  youtubeId,
} from '@/lib/site';

export async function generateMetadata(): Promise<Metadata> {
  const content = await getCompositionFeature();
  return { title: `${content.featureTitle} — Composition` };
}

export default async function RequiemPage() {
  const [content, videos] = await Promise.all([getCompositionFeature(), getVideos()]);
  const featuredVideo = videos.find((video) => video.slug === content.featuredVideoSlug);
  const videoId = youtubeId(featuredVideo?.youtubeUrl);
  const introduction = toParagraphs(content.detailIntroduction);
  const about = toParagraphs(content.aboutBody);
  const premiere = toParagraphs(content.premiereBody);
  const collaboration = toParagraphs(content.collaborationBody);

  return (
    <div className="pt-32 pb-24 md:pt-40">
      <header className="mx-auto max-w-6xl px-6 md:px-10">
        <Reveal>
          <Link
            href="/media/composition"
            className="link-underline text-sm tracking-wide text-brown-soft hover:text-brown"
          >
            ← Back to Composition
          </Link>
          <p className="eyebrow mt-8">{content.detailEyebrow}</p>
          <h1 className="mt-4 max-w-5xl font-serif text-5xl leading-[0.96] text-brown sm:text-6xl md:text-7xl">
            {content.featureTitle}
          </h1>
          {introduction.length > 0 && (
            <div className="prose-warm mt-7 max-w-3xl text-lg md:text-xl">
              {introduction.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          )}
        </Reveal>
      </header>

      <main className="mx-auto mt-16 max-w-6xl px-6 md:mt-20 md:px-10">
        <section className="border-y border-line py-14 md:py-20">
          <Reveal>
            <div className="grid gap-8 md:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] md:gap-16">
              <div>
                <p className="eyebrow">Requiem: Ceaseless Life</p>
                <h2 className="mt-3 font-serif text-3xl text-brown md:text-4xl">
                  {content.aboutHeading}
                </h2>
              </div>
              <div>
                {about.length > 0 && (
                  <div className="prose-warm text-base md:text-lg">
                    {about.map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                )}
                {content.librettoUrl && (
                  <a
                    href={content.librettoUrl}
                    className="link-underline mt-7 inline-block text-sm font-semibold uppercase tracking-wider text-olive"
                  >
                    {content.librettoLinkLabel} →
                  </a>
                )}
              </div>
            </div>
          </Reveal>
        </section>

        <section className="border-b border-line py-16 md:py-20">
          <Reveal>
            <p className="eyebrow">Watch & Listen</p>
            <h2 className="mt-3 font-serif text-3xl text-brown md:text-4xl">
              {featuredVideo?.title || content.featureTitle}
            </h2>

            <figure className="mt-8 max-w-5xl">
              <div className="relative aspect-video overflow-hidden rounded-sm border border-line bg-greige">
                {videoId ? (
                  <iframe
                    className="absolute inset-0 h-full w-full"
                    src={`https://www.youtube-nocookie.com/embed/${videoId}`}
                    title={featuredVideo?.title || content.featureTitle}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div className="flex h-full items-center justify-center px-6 text-center text-sm italic text-brown-soft">
                    Choose a video in the Composition — Requiem editor to show it here.
                  </div>
                )}
              </div>
              {featuredVideo?.description && (
                <figcaption className="mt-4 max-w-3xl text-sm leading-relaxed text-brown-soft">
                  {featuredVideo.description}
                </figcaption>
              )}
            </figure>
          </Reveal>
        </section>

        <section className="border-b border-line py-16 md:py-20">
          <Reveal>
            <div className="grid gap-8 md:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] md:gap-16">
              <div>
                <p className="eyebrow">In performance</p>
                <h2 className="mt-3 font-serif text-3xl text-brown md:text-4xl">
                  {content.premiereHeading}
                </h2>
              </div>
              <div>
                {premiere.length > 0 && (
                  <div className="prose-warm text-base md:text-lg">
                    {premiere.map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                )}
                {content.programPdf && (
                  <a
                    href={content.programPdf}
                    download
                    className="mt-8 inline-block rounded-full bg-brown px-7 py-3 text-sm tracking-wide text-cream transition-colors hover:bg-olive"
                  >
                    {content.programButtonLabel} ↓
                  </a>
                )}
              </div>
            </div>
          </Reveal>
        </section>

        <section className="py-16 md:py-20">
          <Reveal>
            <div className="max-w-3xl">
              <p className="eyebrow">Future directions</p>
              <h2 className="mt-3 font-serif text-4xl text-brown md:text-5xl">
                {content.collaborationHeading}
              </h2>
              {collaboration.length > 0 && (
                <div className="prose-warm mt-6 text-base md:text-lg">
                  {collaboration.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              )}
            </div>
          </Reveal>
        </section>

        <Reveal delay={160} className="border-t border-line pt-8">
          <Link
            href="/media/composition"
            className="link-underline text-sm tracking-wide text-brown-soft hover:text-brown"
          >
            ← Back to Composition
          </Link>
        </Reveal>
      </main>
    </div>
  );
}
