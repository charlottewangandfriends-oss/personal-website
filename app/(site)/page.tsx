import Image from 'next/image';
import Link from 'next/link';
import Hero from '@/components/Hero';
import Reveal from '@/components/Reveal';
import { getHome, toParagraphs } from '@/lib/site';

export default async function HomePage() {
  const home = await getHome();
  const intro = toParagraphs(home.intro);

  return (
    <>
      <Hero
        colorSrc={home.heroColor}
        bwSrc={home.heroBw}
        tagline={home.tagline}
        subtagline={home.subtagline}
      />

      {/* Meet Charlotte */}
      <section className="mx-auto max-w-6xl px-6 py-24 md:px-10">
        <div className="grid items-center gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
          <Reveal className="relative aspect-[4/5] overflow-hidden rounded-sm border border-line">
            <Image
              src="/images/charlotte-lyrical.jpg"
              alt="Charlotte Wang"
              fill
              sizes="(max-width: 768px) 90vw, 42vw"
              className="object-cover"
            />
          </Reveal>
          <Reveal delay={120}>
            <p className="eyebrow">{home.introHeading}</p>
            <h2 className="mt-4 font-serif text-4xl text-brown md:text-5xl">
              Stories that feel both deeply personal and universally resonant.
            </h2>
            <div className="prose-warm mt-6 max-w-xl text-[1.05rem]">
              {intro.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <Link
              href="/about"
              className="link-underline mt-7 inline-block text-sm tracking-wide text-olive"
            >
              Read more about Charlotte →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Entry tiles (Media / Writing / About) */}
      <section className="mx-auto max-w-6xl px-6 pb-24 md:px-10">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              href: '/media',
              eyebrow: 'Media',
              title: 'Watch & listen',
              text: 'Conducting, composition, singing, and collaborative piano.',
              img: '/images/charlotte-conducting-live-1.jpg',
            },
            {
              href: '/writing',
              eyebrow: 'Writing',
              title: 'A writer, first',
              text: 'Poetry, short stories, and prose in English and Chinese.',
              img: '/images/charlotte-lyrical.jpg',
            },
            {
              href: '/about',
              eyebrow: 'About',
              title: 'Her journey',
              text: 'From Amherst to the University of Michigan, and beyond.',
              img: '/images/charlotte-group-backstage.jpg',
            },
          ].map((tile, i) => (
            <Reveal key={tile.href} delay={i * 110}>
              <Link
                href={tile.href}
                className="group block overflow-hidden rounded-sm border border-line bg-paper"
              >
                <div className="relative aspect-[5/4] overflow-hidden">
                  <Image
                    src={tile.img}
                    alt={tile.title}
                    fill
                    sizes="(max-width: 768px) 90vw, 30vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <p className="eyebrow">{tile.eyebrow}</p>
                  <h3 className="mt-2 font-serif text-2xl text-brown">{tile.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-brown-soft">{tile.text}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
