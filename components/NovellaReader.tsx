'use client';

import dynamic from 'next/dynamic';

export type NovellaReaderProps = {
  fileUrl: string;
  title: string;
};

const NovellaReaderClient = dynamic(() => import('./NovellaReaderClient'), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-[32rem] items-center justify-center rounded-[1.75rem] border border-line/70 bg-brown/[0.035] px-6 text-center">
      <div>
        <span className="mx-auto block h-8 w-8 animate-spin rounded-full border-2 border-olive/25 border-t-olive" />
        <p className="mt-4 text-sm tracking-wide text-brown-soft">
          Preparing the digital edition…
        </p>
      </div>
    </div>
  ),
});

export default function NovellaReader(props: NovellaReaderProps) {
  return <NovellaReaderClient {...props} />;
}
