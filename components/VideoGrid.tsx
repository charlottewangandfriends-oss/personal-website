import type { ReactNode } from 'react';
import { youtubeId } from '@/lib/site';

type Video = {
  slug: string;
  title: string;
  youtubeUrl: string | null;
  orientation?: 'landscape' | 'portrait' | null;
  description: string | null;
};

type VideoGridProps = {
  videos: Video[];
  supplemental?: ReactNode;
};

function VideoPlayer({ video }: { video: Video }) {
  const id = youtubeId(video.youtubeUrl);
  const isPortrait = video.orientation === 'portrait';

  return (
    <div
      className={`relative overflow-hidden rounded-sm border border-line bg-greige ${
        isPortrait ? 'aspect-[9/16]' : 'aspect-video'
      }`}
    >
      {id ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${id}`}
          title={video.title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <div className="flex h-full items-center justify-center text-sm italic text-brown-soft">
          Video link coming soon
        </div>
      )}
    </div>
  );
}

export default function VideoGrid({ videos, supplemental }: VideoGridProps) {
  if (videos.length === 0) {
    return (
      <p className="rounded-sm border border-dashed border-line bg-paper/60 px-6 py-10 text-center text-sm italic text-brown-soft">
        Performance videos coming soon.
      </p>
    );
  }

  const singlePortrait = videos.length === 1 && videos[0].orientation === 'portrait';

  if (singlePortrait) {
    const video = videos[0];

    return (
      <figure className="mx-auto grid max-w-4xl items-center gap-8 md:grid-cols-[minmax(0,16rem)_minmax(0,1fr)] md:gap-12 lg:grid-cols-[minmax(0,17rem)_minmax(0,1fr)] lg:gap-16">
        <div className="mx-auto w-full max-w-[16rem] sm:max-w-[17rem] md:mx-0 md:max-w-none">
          <VideoPlayer video={video} />
        </div>
        <figcaption className="max-w-xl md:py-5">
          <p className="eyebrow">Conducting retrospective</p>
          <h2 className="mt-3 font-serif text-3xl leading-tight text-brown sm:text-4xl">
            {video.title}
          </h2>
          {video.description ? (
            <p className="mt-5 whitespace-pre-line text-base leading-relaxed text-brown-soft">
              {video.description}
            </p>
          ) : null}
          {supplemental ? (
            <div className="mt-7 border-t border-line pt-5">{supplemental}</div>
          ) : null}
        </figcaption>
      </figure>
    );
  }

  return (
    <>
      <div className={`grid gap-8 ${videos.length === 1 ? 'mx-auto max-w-2xl' : 'sm:grid-cols-2'}`}>
        {videos.map((video) => {
          const isPortrait = video.orientation === 'portrait';
          return (
            <figure
              key={video.slug}
              className={`group ${isPortrait ? 'mx-auto w-full max-w-sm' : ''}`}
            >
              <VideoPlayer video={video} />
              <figcaption className="mt-3">
                <p className="font-serif text-xl text-brown">{video.title}</p>
                {video.description ? (
                  <p className="mt-1 whitespace-pre-line text-sm leading-relaxed text-brown-soft">
                    {video.description}
                  </p>
                ) : null}
              </figcaption>
            </figure>
          );
        })}
      </div>
      {supplemental ? (
        <div className="mt-10 max-w-2xl border-l border-lavender-deep/40 pl-5">
          {supplemental}
        </div>
      ) : null}
    </>
  );
}
