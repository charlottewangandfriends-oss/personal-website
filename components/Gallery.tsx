'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

type Photo = { src: string; caption: string; positionClass?: string };

export default function Gallery({ photos }: { photos: Photo[] }) {
  const [index, setIndex] = useState<number | null>(null);

  const close = useCallback(() => setIndex(null), []);
  const prev = useCallback(
    () => setIndex((i) => (i === null ? i : (i - 1 + photos.length) % photos.length)),
    [photos.length],
  );
  const next = useCallback(
    () => setIndex((i) => (i === null ? i : (i + 1) % photos.length)),
    [photos.length],
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [index, close, prev, next]);

  return (
    <>
      <div className="columns-2 gap-4 md:columns-3 [&>*]:mb-4">
        {photos.map((p, i) => (
          <button
            key={p.src + i}
            onClick={() => setIndex(i)}
            className="group relative block w-full overflow-hidden rounded-sm border border-line"
          >
            <Image
              src={p.src}
              alt={p.caption}
              width={800}
              height={600}
              sizes="(max-width: 768px) 45vw, 30vw"
              className={`h-auto w-full object-cover ${p.positionClass ?? 'object-center'} transition-transform duration-700 group-hover:scale-[1.04]`}
            />
            <span className="pointer-events-none absolute inset-0 bg-brown/0 transition-colors duration-500 group-hover:bg-brown/10" />
          </button>
        ))}
      </div>

      {index !== null && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-brown/90 p-6 backdrop-blur-sm"
          onClick={close}
        >
          <button
            aria-label="Close"
            onClick={close}
            className="absolute right-6 top-6 text-3xl font-light text-cream/80 hover:text-cream"
          >
            ×
          </button>
          <button
            aria-label="Previous"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-4 text-4xl font-light text-cream/70 hover:text-cream md:left-10"
          >
            ‹
          </button>
          <figure className="max-h-[85vh] max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <Image
              src={photos[index].src}
              alt={photos[index].caption}
              width={1600}
              height={1200}
              className="max-h-[80vh] w-auto rounded-sm object-contain"
            />
            <figcaption className="mt-3 text-center text-sm italic text-cream/70">
              {photos[index].caption}
            </figcaption>
          </figure>
          <button
            aria-label="Next"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-4 text-4xl font-light text-cream/70 hover:text-cream md:right-10"
          >
            ›
          </button>
        </div>
      )}
    </>
  );
}
