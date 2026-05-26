import type { Metadata } from 'next';
import Reveal from '@/components/Reveal';
import VideoGrid from '@/components/VideoGrid';
import Gallery from '@/components/Gallery';
import { getVideos, getGallery, VIDEO_CATEGORIES } from '@/lib/site';

export const metadata: Metadata = { title: 'Media' };

export default async function MediaPage() {
  const [videos, gallery] = await Promise.all([getVideos(), getGallery()]);

  return (
    <div className="pt-32 md:pt-40">
      <header className="mx-auto max-w-6xl px-6 md:px-10">
        <Reveal>
          <p className="eyebrow">Media</p>
          <h1 className="mt-4 max-w-2xl font-serif text-5xl text-brown md:text-6xl">
            Watch &amp; listen
          </h1>
          <p className="mt-5 max-w-xl text-lg text-brown-soft">
            A growing collection of conducting, composition, singing, and collaborative piano.
          </p>
        </Reveal>
      </header>

      <div className="mx-auto max-w-6xl px-6 md:px-10">
        {VIDEO_CATEGORIES.map((cat) => {
          const items = videos.filter((v) => v.category === cat.value);
          return (
            <section key={cat.value} className="mt-20 first:mt-16">
              <Reveal>
                <h2 className="mb-8 flex items-baseline gap-4 font-serif text-3xl text-brown">
                  {cat.label}
                  <span className="h-px flex-1 bg-line" />
                </h2>
              </Reveal>
              <Reveal delay={80}>
                <VideoGrid videos={items} />
              </Reveal>
            </section>
          );
        })}
      </div>

      {/* Photo gallery */}
      <section className="mt-28 bg-greige/40 py-20">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <Reveal>
            <h2 className="mb-8 flex items-baseline gap-4 font-serif text-3xl text-brown">
              Photo Gallery
              <span className="h-px flex-1 bg-line" />
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <Gallery photos={gallery} />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
