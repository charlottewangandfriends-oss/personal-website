import type { Metadata } from 'next';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import { getCompositionFeature } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Libretto — Requiem: Ceaseless Life',
  description: 'The complete libretto for Requiem: Ceaseless Life by Haoran Tong.',
};

function isMovementHeading(section: string) {
  return /^[IVX]+\.\s/.test(section);
}

export default async function LibrettoPage() {
  const content = await getCompositionFeature();
  const sections = content.librettoBody
    .split(/\n\s*\n/)
    .map((section) => section.trim())
    .filter(Boolean);

  return (
    <div className="pt-32 pb-24 md:pt-40">
      <header className="mx-auto max-w-4xl px-6 md:px-10">
        <Reveal>
          <Link
            href="/media/composition/requiem"
            className="link-underline text-sm tracking-wide text-brown-soft hover:text-brown"
          >
            ← Back to Requiem
          </Link>
          <p className="eyebrow mt-8">Complete libretto</p>
          <h1 className="mt-4 font-serif text-5xl leading-[0.96] text-brown sm:text-6xl md:text-7xl">
            {content.featureTitle}
          </h1>
          <p className="mt-6 text-base tracking-wide text-brown-soft">
            {content.librettoCredit}
          </p>
        </Reveal>
      </header>

      <main className="mx-auto mt-14 max-w-3xl px-6 md:mt-20 md:px-10">
        <Reveal>
          {sections.length > 0 ? (
            <article className="border-t border-line pt-10">
              {sections.map((section, index) => {
                if (section === 'LIBRETTO') {
                  return (
                    <div key={index} className="my-16 border-y border-line py-7">
                      <p className="eyebrow">Libretto</p>
                    </div>
                  );
                }

                if (isMovementHeading(section)) {
                  return (
                    <h2
                      key={index}
                      className="mb-8 mt-16 font-serif text-4xl text-brown md:text-5xl"
                    >
                      {section}
                    </h2>
                  );
                }

                return (
                  <p
                    key={index}
                    className="mb-8 whitespace-pre-line text-[1.04rem] leading-[1.9] text-brown-soft"
                  >
                    {section}
                  </p>
                );
              })}
            </article>
          ) : (
            <p className="border-t border-line pt-10 text-brown-soft">
              The complete libretto will appear here.
            </p>
          )}

          <div className="mt-16 border-t border-line pt-8">
            <Link
              href="/media/composition/requiem"
              className="link-underline text-sm tracking-wide text-brown-soft hover:text-brown"
            >
              ← Back to Requiem
            </Link>
          </div>
        </Reveal>
      </main>
    </div>
  );
}
