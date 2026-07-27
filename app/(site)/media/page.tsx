import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import { getMediaPage, getVideoCategories } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Media — Watch & Listen',
  description: 'Conducting, composition, voice, collaborative piano, percussion, viola, and Charlotte with Friends performances.',
};

export default async function MediaPage() {
  const [media, categories] = await Promise.all([getMediaPage(), getVideoCategories()]);

  return (
    <div className="pt-32 pb-24 md:pt-40">
      <header className="mx-auto max-w-6xl px-6 md:px-10">
        <Reveal>
          <span className="inline-block px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-olive-soft/70 text-olive-deep">
            Media
          </span>
          <h1 className="mt-4 max-w-2xl font-serif text-5xl text-brown md:text-6xl">
            {media.heading}
          </h1>
          <p className="mt-5 max-w-xl text-lg text-brown-soft">
            {media.intro}
          </p>
        </Reveal>
      </header>

      {/* Category Superlink Cards Grid */}
      <section className="mx-auto max-w-6xl px-6 mt-16 md:px-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, i) => (
            <Reveal key={cat.value} delay={i * 90}>
              <Link
                href={`/media/${cat.value}`}
                className="group flex flex-col h-full overflow-hidden rounded-xl border border-line border-t-4 border-t-olive bg-paper transition-all hover:border-olive/60 hover:shadow-md"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={cat.img}
                    alt={cat.label}
                    fill
                    sizes="(max-width: 768px) 90vw, 30vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-7 flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="mt-3 font-serif text-2xl text-brown transition-colors group-hover:text-olive">
                      {cat.label}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-brown-soft">
                      {cat.description}
                    </p>
                  </div>
                  <span className="link-underline mt-6 inline-block text-xs font-semibold uppercase tracking-wider text-olive">
                    Watch &amp; listen →
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

    </div>
  );
}
