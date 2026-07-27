import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Reveal from '@/components/Reveal';
import VideoGrid from '@/components/VideoGrid';
import { getVideos, VIDEO_CATEGORIES } from '@/lib/site';

export async function generateStaticParams() {
  return VIDEO_CATEGORIES.map((c) => ({ category: c.value }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = VIDEO_CATEGORIES.find((c) => c.value === category);
  return { title: cat ? `${cat.label} — Media` : 'Media' };
}

export default async function MediaCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = VIDEO_CATEGORIES.find((c) => c.value === category);
  if (!cat) notFound();

  const allVideos = await getVideos();
  const videos = allVideos.filter((v) => v.category === cat.value);

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
          <p className="eyebrow mt-6">Media Category</p>
          <h1 className="mt-3 font-serif text-4xl text-brown sm:text-5xl md:text-6xl">
            {cat.label}
          </h1>
          <p className="mt-4 max-w-xl text-lg text-brown-soft">
            {cat.description}
          </p>
        </Reveal>
      </header>

      <div className="mx-auto max-w-6xl px-6 mt-16 md:px-10">
        <Reveal delay={80}>
          <VideoGrid videos={videos} />
        </Reveal>

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
