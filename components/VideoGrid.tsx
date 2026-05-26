import { youtubeId } from '@/lib/site';

type Video = {
  slug: string;
  title: string;
  youtubeUrl: string | null;
  description: string | null;
};

export default function VideoGrid({ videos }: { videos: Video[] }) {
  if (videos.length === 0) {
    return (
      <p className="rounded-sm border border-dashed border-line bg-paper/60 px-6 py-10 text-center text-sm italic text-brown-soft">
        Performance videos coming soon.
      </p>
    );
  }

  return (
    <div className="grid gap-8 sm:grid-cols-2">
      {videos.map((v) => {
        const id = youtubeId(v.youtubeUrl);
        return (
          <figure key={v.slug} className="group">
            <div className="relative aspect-video overflow-hidden rounded-sm border border-line bg-greige">
              {id ? (
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src={`https://www.youtube-nocookie.com/embed/${id}`}
                  title={v.title}
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
            <figcaption className="mt-3">
              <p className="font-serif text-xl text-brown">{v.title}</p>
              {v.description && (
                <p className="mt-1 text-sm leading-relaxed text-brown-soft">{v.description}</p>
              )}
            </figcaption>
          </figure>
        );
      })}
    </div>
  );
}
