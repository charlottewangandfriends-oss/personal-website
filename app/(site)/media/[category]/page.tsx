import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Reveal from '@/components/Reveal';
import Gallery from '@/components/Gallery';
import MediaIntroSections from '@/components/MediaIntroSections';
import VideoGrid from '@/components/VideoGrid';
import {
  getGallery,
  getMediaIntroSections,
  getVideoCategories,
  getVideos,
  VIDEO_CATEGORIES,
} from '@/lib/site';

export async function generateStaticParams() {
  return VIDEO_CATEGORIES.map((c) => ({ category: c.value }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const categories = await getVideoCategories();
  const cat = categories.find((c) => c.value === category);
  return { title: cat ? `${cat.label} — Media` : 'Media' };
}

export default async function MediaCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const [categories, allVideos] = await Promise.all([getVideoCategories(), getVideos()]);
  const cat = categories.find((c) => c.value === category);
  if (!cat) notFound();


  const videos = allVideos.filter((v) => v.category === cat.value);
  const [photos, introSections] = await Promise.all([
    getGallery(cat.value),
    getMediaIntroSections(cat.value),
  ]);

  return (
    <div className="pt-32 pb-24 md:pt-40">
      <header className="mx-auto max-w-6xl px-6 md:px-10">
        <Reveal>
          <Link
            href="/media"
            className="link-underline text-sm tracking-wide text-brown-soft hover:text-brown"
          >
            ← Back to Media
          </Link>
          <p className="eyebrow mt-6">Media</p>
          <h1 className="mt-3 font-serif text-4xl text-brown sm:text-5xl md:text-6xl">
            {cat.label}
          </h1>
          <p className="mt-4 max-w-xl text-lg text-brown-soft">
            {cat.description}
          </p>
        </Reveal>
      </header>

      <div className="mx-auto mt-16 max-w-6xl px-6 md:px-10">
        <MediaIntroSections sections={introSections} />

        <section className={introSections.length > 0 ? 'border-t border-line pt-14' : ''}>
          {introSections.length > 0 && (
            <Reveal>
              <p className="eyebrow">Watch & Listen</p>
              <h2 className="mt-3 font-serif text-3xl text-brown md:text-4xl">
                Selected {cat.label} videos
              </h2>
            </Reveal>
          )}
          <Reveal delay={80} className={introSections.length > 0 ? 'mt-8' : ''}>
            <VideoGrid videos={videos} />
          </Reveal>
        </section>

        {photos.length > 0 && (
          <section className="mt-20 border-t border-line pt-14">
            <Reveal>
              <p className="eyebrow">Photography</p>
              <h2 className="mt-3 font-serif text-3xl text-brown md:text-4xl">
                {cat.label} in photos
              </h2>
            </Reveal>
            <Reveal delay={80} className="mt-8">
              <Gallery photos={photos} />
            </Reveal>
          </section>
        )}

        <Reveal delay={200} className="mt-16 border-t border-line pt-8">
          <Link
            href="/media"
            className="link-underline text-sm tracking-wide text-brown-soft hover:text-brown"
          >
            ← Back to Media
          </Link>
        </Reveal>
      </div>
    </div>
  );
}
