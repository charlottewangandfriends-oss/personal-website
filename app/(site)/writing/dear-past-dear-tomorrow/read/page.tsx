import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import NovellaReader from '@/components/NovellaReader';
import { getWritingIntro } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Read Dear Tomorrow, Dear Past',
  description:
    'Read Shuyao Charlotte Wang’s novella Dear Tomorrow, Dear Past in an online digital edition.',
};

const DOWNLOAD_NAME = 'Dear-Tomorrow-Dear-Past-Charlotte-Wang.pdf';

export default async function ReadNovellaPage() {
  const writingPage = await getWritingIntro();
  if (!writingPage.memoirPdf) notFound();

  return (
    <article className="pb-24 pt-28 md:pb-28 md:pt-36">
      <header className="mx-auto max-w-6xl px-6 md:px-10">
        <Link
          href="/writing/dear-past-dear-tomorrow"
          className="link-underline text-sm tracking-wide text-brown-soft hover:text-brown"
        >
          ← Back to the novella
        </Link>

        <div className="mt-8 border-y border-line py-8 md:grid md:grid-cols-[1fr_auto] md:items-end md:gap-10 md:py-10">
          <div>
            <p className="eyebrow">Digital Edition</p>
            <h1 className="mt-3 max-w-4xl font-serif text-4xl text-brown sm:text-5xl md:text-6xl">
              Dear Tomorrow, Dear Past
            </h1>
            <p className="mt-3 text-sm tracking-wide text-brown-soft md:text-base">
              A novella by Shuyao Charlotte Wang
            </p>
          </div>
          <a
            href={writingPage.memoirPdf}
            download={DOWNLOAD_NAME}
            className="mt-6 inline-flex rounded-full border border-line bg-paper px-6 py-3 text-sm tracking-wide text-brown transition-colors hover:border-olive/45 hover:text-olive md:mt-0"
          >
            Download PDF ↓
          </a>
        </div>
      </header>

      <div className="mx-auto max-w-[94rem] px-3 sm:px-6 md:px-10">
        <NovellaReader
          fileUrl={writingPage.memoirPdf}
          title="Dear Tomorrow, Dear Past"
          downloadName={DOWNLOAD_NAME}
        />
      </div>
    </article>
  );
}
