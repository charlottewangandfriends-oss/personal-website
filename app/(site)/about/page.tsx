import type { Metadata } from 'next';
import Image from 'next/image';
import Reveal from '@/components/Reveal';
import Parallax from '@/components/Parallax';
import { getAbout, toParagraphs } from '@/lib/site';

export const metadata: Metadata = { title: 'About' };

export default async function AboutPage() {
  const about = await getAbout();
  const bio = toParagraphs(about.bio);
  const myStory = toParagraphs(about.myStory);
  const statement = toParagraphs(about.statement);

  return (
    <article className="pt-32 md:pt-40">
      {/* Header */}
      <header className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="grid items-end gap-10 md:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <p className="eyebrow">About</p>
            <h1 className="mt-4 font-serif text-5xl text-brown md:text-6xl">{about.heading}</h1>
            {about.cv && (
              <a
                href={about.cv}
                className="mt-8 inline-block rounded-full border border-brown px-7 py-3 text-sm tracking-wide text-brown transition-colors hover:bg-brown hover:text-cream"
              >
                Download CV
              </a>
            )}
          </Reveal>
          <Reveal
            delay={120}
            className="relative aspect-[4/5] overflow-hidden rounded-sm border border-line"
          >
            <Image
              src={about.portrait}
              alt="Charlotte Wang"
              fill
              sizes="(max-width: 768px) 90vw, 40vw"
              className="object-cover object-top"
            />
          </Reveal>
        </div>
      </header>

      {/* Bio */}
      <section className="mx-auto mt-20 max-w-3xl px-6 md:px-10">
        <Reveal className="prose-warm text-[1.08rem]">
          {bio.length ? bio.map((p, i) => <p key={i}>{p}</p>) : <p>Biography coming soon.</p>}
        </Reveal>
      </section>

      {/* Parallax quote band */}
      <div className="mt-24">
        <Parallax
          src="/images/charlotte-conducting-live-2.jpg"
          objectPosition="center 30%"
          quote="Rehearsal rooms where people feel heard, trusted, and inspired to give their best."
          className="h-[52vh] md:h-[66vh]"
        />
      </div>

      {/* My Story */}
      <section className="mx-auto mt-24 max-w-3xl px-6 md:px-10">
        <Reveal>
          <p className="eyebrow">{about.myStoryHeading}</p>
          <div className="prose-warm mt-5 text-[1.08rem]">
            {myStory.length ? (
              myStory.map((p, i) => <p key={i}>{p}</p>)
            ) : (
              <p className="italic text-brown-soft/70">Coming soon.</p>
            )}
          </div>
        </Reveal>
      </section>

      {/* Statement */}
      <section className="mt-24 bg-greige/40 py-20">
        <div className="mx-auto max-w-3xl px-6 md:px-10">
          <Reveal>
            <h2 className="font-serif text-3xl text-brown md:text-4xl">
              {about.statementHeading}
            </h2>
            <div className="prose-warm mt-6 text-[1.08rem]">
              {statement.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </article>
  );
}
