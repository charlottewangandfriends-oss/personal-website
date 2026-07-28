import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import { getAbout, toParagraphs } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Music, Community, and Human Connection',
  description: "Why I chose music: its power to cross boundaries, create community, and help us truly know one another.",
};

export default async function MusicCommunityPage() {
  const about = await getAbout();
  const statement = toParagraphs(about.statement);

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
          <p className="eyebrow mt-6">Statement</p>
          <h1 className="mt-3 font-serif text-4xl text-brown sm:text-5xl md:text-6xl">
            {about.statementHeading}
          </h1>
        </Reveal>

        <Reveal delay={120} className="relative mt-10 aspect-[16/9] w-full overflow-hidden rounded-sm border border-line">
          <Image
            src={about.statementHeroPhoto}
            alt="Charlotte Wang with ensemble"
            fill
            priority
            className={`object-cover ${about.statementHeroPositionClass}`}
          />
        </Reveal>

        <section className="mt-14 max-w-3xl">
          <Reveal className="prose-warm text-[1.1rem] leading-relaxed">
            {statement.length ? (
              statement.map((block, i) =>
                block.startsWith('## ') ? (
                  <h2
                    key={i}
                    className="mb-7 mt-16 border-t border-line pt-10 font-serif text-3xl leading-tight text-brown md:text-4xl"
                  >
                    {block.slice(3)}
                  </h2>
                ) : (
                  <p key={i} className="mb-6">
                    {block}
                  </p>
                ),
              )
            ) : (
              <p className="italic text-brown-soft/70">Statement coming soon.</p>
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
