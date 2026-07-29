'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import type { NovellaReaderProps } from './NovellaReader';

pdfjs.GlobalWorkerOptions.workerSrc = '/pdfjs/pdf.worker.min.mjs';

const PDF_OPTIONS = {
  useWasm: false,
} as const;

const DESKTOP_READER_QUERY = '(min-width: 900px)';

function clampPage(page: number, total: number) {
  return Math.min(Math.max(Math.round(page), 1), Math.max(total, 1));
}

function spreadStart(page: number, total: number, isDesktop: boolean) {
  const safePage = clampPage(page, total);
  if (!isDesktop || safePage === 1) return safePage;
  return safePage % 2 === 0 ? safePage : safePage - 1;
}

function ArrowIcon({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={`h-4 w-4 ${direction === 'right' ? 'rotate-180' : ''}`}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.7"
    >
      <path d="M12 3v12" />
      <path d="m7 10 5 5 5-5" />
      <path d="M5 21h14" />
    </svg>
  );
}

export default function NovellaReaderClient({
  fileUrl,
  title,
  downloadName,
}: NovellaReaderProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageWidth, setPageWidth] = useState(320);
  const [isDesktop, setIsDesktop] = useState(false);
  const [turnDirection, setTurnDirection] = useState<'next' | 'previous'>('next');

  useEffect(() => {
    const mediaQuery = window.matchMedia(DESKTOP_READER_QUERY);
    const updateMode = () => setIsDesktop(mediaQuery.matches);
    updateMode();
    mediaQuery.addEventListener('change', updateMode);
    return () => mediaQuery.removeEventListener('change', updateMode);
  }, []);

  useEffect(() => {
    if (!totalPages) return;
    setCurrentPage((page) => spreadStart(page, totalPages, isDesktop));
  }, [isDesktop, totalPages]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const updateWidth = () => {
      const availableWidth = stage.clientWidth;
      const horizontalPadding = isDesktop ? 96 : 24;
      const pageGap = isDesktop ? 20 : 0;
      const calculatedWidth = isDesktop
        ? (availableWidth - horizontalPadding - pageGap) / 2
        : availableWidth - horizontalPadding;
      setPageWidth(Math.max(220, Math.floor(Math.min(calculatedWidth, 620))));
    };

    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    observer.observe(stage);
    return () => observer.disconnect();
  }, [isDesktop]);

  const visiblePages = useMemo(() => {
    if (!totalPages) return [1];
    const start = spreadStart(currentPage, totalPages, isDesktop);
    if (!isDesktop || start === 1 || start === totalPages) return [start];
    return [start, start + 1];
  }, [currentPage, isDesktop, totalPages]);

  const goToPage = useCallback(
    (requestedPage: number, direction?: 'next' | 'previous') => {
      if (!totalPages) return;
      const nextPage = spreadStart(requestedPage, totalPages, isDesktop);
      if (nextPage === currentPage) return;
      setTurnDirection(direction ?? (nextPage > currentPage ? 'next' : 'previous'));
      setCurrentPage(nextPage);
    },
    [currentPage, isDesktop, totalPages],
  );

  const goPrevious = useCallback(() => {
    if (currentPage <= 1) return;
    if (isDesktop && currentPage <= 2) {
      goToPage(1, 'previous');
      return;
    }
    goToPage(currentPage - (isDesktop ? 2 : 1), 'previous');
  }, [currentPage, goToPage, isDesktop]);

  const goNext = useCallback(() => {
    if (!totalPages || visiblePages.at(-1) === totalPages) return;
    if (currentPage === 1) {
      goToPage(2, 'next');
      return;
    }
    goToPage(currentPage + (isDesktop ? 2 : 1), 'next');
  }, [currentPage, goToPage, isDesktop, totalPages, visiblePages]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.matches('input, textarea, select, button, a')) return;

      if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
        event.preventDefault();
        goPrevious();
      } else if (event.key === 'ArrowRight' || event.key === 'PageDown') {
        event.preventDefault();
        goNext();
      } else if (event.key === 'Home') {
        event.preventDefault();
        goToPage(1, 'previous');
      } else if (event.key === 'End' && totalPages) {
        event.preventDefault();
        goToPage(totalPages, 'next');
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [goNext, goPrevious, goToPage, totalPages]);

  const pageLabel =
    visiblePages.length === 2
      ? `Pages ${visiblePages[0]}–${visiblePages[1]} of ${totalPages}`
      : `Page ${visiblePages[0]} of ${totalPages || '…'}`;

  const atBeginning = currentPage === 1;
  const atEnd = Boolean(totalPages) && visiblePages.at(-1) === totalPages;

  return (
    <div className="mt-10 md:mt-12">
      <div
        ref={stageRef}
        className="relative overflow-hidden rounded-[1.5rem] border border-brown/10 bg-[radial-gradient(circle_at_50%_10%,rgba(207,199,216,0.18),transparent_36%),linear-gradient(145deg,#33281f_0%,#241c17_100%)] px-3 py-7 shadow-[0_28px_80px_rgba(63,47,33,0.13)] md:rounded-[2rem] md:px-12 md:py-12"
        onTouchStart={(event) => {
          touchStartX.current = event.changedTouches[0]?.clientX ?? null;
        }}
        onTouchEnd={(event) => {
          const startX = touchStartX.current;
          const endX = event.changedTouches[0]?.clientX;
          touchStartX.current = null;
          if (startX == null || endX == null) return;
          const distance = endX - startX;
          if (Math.abs(distance) < 52) return;
          if (distance < 0) goNext();
          else goPrevious();
        }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-[8%] top-0 h-px bg-gradient-to-r from-transparent via-lavender/55 to-transparent"
        />

        <Document
          file={fileUrl}
          options={PDF_OPTIONS}
          onLoadSuccess={({ numPages }) => {
            setTotalPages(numPages);
            setCurrentPage((page) => clampPage(page, numPages));
          }}
          loading={
            <div className="flex min-h-[28rem] items-center justify-center text-center text-cream/80">
              <div>
                <span className="mx-auto block h-8 w-8 animate-spin rounded-full border-2 border-cream/20 border-t-lavender" />
                <p className="mt-4 text-sm tracking-wide">Opening the book…</p>
              </div>
            </div>
          }
          error={
            <div className="mx-auto flex min-h-[24rem] max-w-lg items-center justify-center px-6 text-center">
              <div>
                <p className="font-serif text-3xl text-cream">The book could not open.</p>
                <p className="mt-3 text-sm leading-6 text-cream/70">
                  You can still download the original PDF and read it offline.
                </p>
                <a
                  href={fileUrl}
                  download={downloadName}
                  className="mt-6 inline-flex rounded-full bg-cream px-6 py-3 text-sm text-brown"
                >
                  Download PDF
                </a>
              </div>
            </div>
          }
          className="relative z-10"
        >
          <div
            key={`${visiblePages.join('-')}-${pageWidth}`}
            className="novella-spread flex min-h-[20rem] items-center justify-center gap-5"
            data-direction={turnDirection}
          >
            {visiblePages.map((pageNumber) => (
              <figure
                key={pageNumber}
                className="novella-page overflow-hidden bg-white shadow-[0_18px_45px_rgba(0,0,0,0.28)] ring-1 ring-black/10"
                style={{ width: pageWidth }}
              >
                <Page
                  pageNumber={pageNumber}
                  width={pageWidth}
                  devicePixelRatio={
                    typeof window === 'undefined'
                      ? 1
                      : Math.min(window.devicePixelRatio || 1, 2)
                  }
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  loading={
                    <div
                      className="animate-pulse bg-paper"
                      style={{
                        width: pageWidth,
                        aspectRatio: '612 / 792',
                      }}
                    />
                  }
                />
                <figcaption className="sr-only">
                  {title}, PDF page {pageNumber}
                </figcaption>
              </figure>
            ))}
          </div>
        </Document>
      </div>

      <div className="sticky bottom-4 z-30 mx-auto -mt-4 flex max-w-3xl items-center gap-2 rounded-2xl border border-line/80 bg-paper/92 p-2 shadow-[0_16px_45px_rgba(63,47,33,0.16)] backdrop-blur-xl sm:gap-3 sm:rounded-full sm:px-3">
        <button
          type="button"
          onClick={goPrevious}
          disabled={atBeginning}
          aria-label="Previous page"
          className="flex h-10 shrink-0 items-center gap-2 rounded-full px-3 text-sm text-brown transition-colors hover:bg-greige/70 disabled:cursor-not-allowed disabled:opacity-35 sm:px-4"
        >
          <ArrowIcon direction="left" />
          <span className="hidden sm:inline">Previous</span>
        </button>

        <div className="min-w-0 flex-1 px-1">
          <div className="flex items-center justify-between gap-3">
            <span
              aria-live="polite"
              className="truncate text-[0.69rem] font-semibold uppercase tracking-[0.12em] text-brown-soft sm:text-xs"
            >
              {pageLabel}
            </span>
            <span className="hidden text-[0.65rem] uppercase tracking-[0.16em] text-olive/75 md:inline">
              {isDesktop ? 'Two-page view' : 'Single-page view'}
            </span>
          </div>
          <input
            type="range"
            min={1}
            max={Math.max(totalPages, 1)}
            value={visiblePages[0]}
            onChange={(event) => goToPage(Number(event.target.value))}
            aria-label="Jump to a page"
            aria-valuetext={pageLabel}
            className="novella-progress mt-1.5 block w-full"
          />
        </div>

        <a
          href={fileUrl}
          download={downloadName}
          aria-label="Download PDF"
          className="hidden h-10 shrink-0 items-center gap-2 rounded-full px-3 text-sm text-brown transition-colors hover:bg-greige/70 md:flex"
        >
          <DownloadIcon />
          <span>PDF</span>
        </a>

        <button
          type="button"
          onClick={goNext}
          disabled={atEnd}
          aria-label="Next page"
          className="flex h-10 shrink-0 items-center gap-2 rounded-full bg-brown px-3 text-sm text-cream transition-colors hover:bg-olive disabled:cursor-not-allowed disabled:opacity-35 sm:px-4"
        >
          <span className="hidden sm:inline">Next</span>
          <ArrowIcon direction="right" />
        </button>
      </div>

      <p className="mt-5 text-center text-xs leading-5 text-brown-soft/65">
        Swipe on a phone, or use the arrow keys on a keyboard. Your place stays
        within this visit.
      </p>
    </div>
  );
}
