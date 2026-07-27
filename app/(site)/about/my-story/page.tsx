import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import { getAbout, toParagraphs } from '@/lib/site';

export const metadata: Metadata = {
  title: "Charlotte's Music Journey",
  description: "Explore Charlotte's path from Amherst College to graduate studies in choral conducting at the University of Michigan.",
};

export default async function MyStoryPage() {
  const about = await getAbout();
  const myStory = toParagraphs(about.myStory);

  return (
    <article className="pt-32 pb-24 md:pt-40">
      <div className="mx-auto max-w-4xl px-6 md:px-10">
        <Reveal>
          <Link
            href="/about"
            className="link-underline text-sm tracking-wide text-brown-soft hover:text-brown"
          >
            ← Back to About
          </Link>
          <p className="eyebrow mt-6">My Story</p>
          <h1 className="mt-3 font-serif text-4xl text-brown sm:text-5xl md:text-6xl">
            {about.storyCardTitle}
          </h1>
        </Reveal>

        <Reveal delay={120} className="relative mt-10 aspect-[16/9] w-full overflow-hidden rounded-sm border border-line">
          <Image
            src={about.myStoryHeroPhoto}
            alt="Charlotte Wang Conducting"
            fill
            priority
            className={`object-cover ${about.myStoryHeroPositionClass}`}
          />
        </Reveal>

        <section className="mt-14 max-w-3xl">
          <Reveal className="prose-warm text-[1.1rem] leading-relaxed">
            {myStory.length ? (
              myStory.map((p, i) => <p key={i} className="mb-6">{p}</p>)
            ) : (
              <p className="italic text-brown-soft/70">Story content coming soon.</p>
            )}
          </Reveal>
        </section>

        <Reveal delay={200} className="mt-16 border-t border-line pt-8">
          <Link
            href="/about"
            className="link-underline text-sm tracking-wide text-brown-soft hover:text-brown"
          >
            ← Back to About
          </Link>
        </Reveal>
      </div>
    </article>
  );
}
