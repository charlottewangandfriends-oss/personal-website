import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '../keystatic.config';
import { ABOUT_BIO, ABOUT_STATEMENT, HOME_INTRO, WRITING_INTRO } from './defaults';

export const reader = createReader(process.cwd(), keystaticConfig);

/** Split a multiline text field into clean paragraphs. */
export function toParagraphs(text: string | null | undefined): string[] {
  if (!text) return [];
  return text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

/** Convert a YouTube URL (watch, youtu.be, or embed) to an embeddable id. */
export function youtubeId(url: string | null | undefined): string | null {
  if (!url) return null;
  const patterns = [
    /youtu\.be\/([\w-]{11})/,
    /[?&]v=([\w-]{11})/,
    /youtube\.com\/embed\/([\w-]{11})/,
    /youtube\.com\/shorts\/([\w-]{11})/,
  ];
  for (const re of patterns) {
    const m = url.match(re);
    if (m) return m[1];
  }
  return null;
}

export const DEFAULT_IMAGES = {
  heroColor: '/images/hero-color.jpg',
  heroBw: '/images/hero-bw.jpg',
  aboutPortrait: '/images/charlotte-podium.jpg',
  writingPortrait: '/images/charlotte-lyrical.jpg',
};

/** Curated gallery shown until Charlotte adds her own photos in the editor. */
export const DEFAULT_GALLERY = [
  { src: '/images/charlotte-conducting-live-1.jpg', caption: 'In concert' },
  { src: '/images/charlotte-conducting-live-2.jpg', caption: 'On the podium' },
  { src: '/images/charlotte-group-backstage.jpg', caption: 'After the performance' },
  { src: '/images/charlotte-podium.jpg', caption: 'Studio portrait' },
  { src: '/images/charlotte-lyrical.jpg', caption: 'Studio portrait' },
];

export const VIDEO_CATEGORIES = [
  { value: 'conducting', label: 'Conducting' },
  { value: 'composition', label: 'Composition' },
  { value: 'singing', label: 'Singing' },
  { value: 'collaborative-piano', label: 'Collaborative Piano' },
] as const;

export const WRITING_CATEGORIES = [
  { value: 'poetry', label: 'Poetry' },
  { value: 'short-story', label: 'Short Story' },
  { value: 'dear-past-dear-tomorrow', label: 'Dear Past, Dear Tomorrow' },
  { value: 'prose-blog', label: 'Proses & Blogs' },
] as const;

export async function getHome() {
  const data = await reader.singletons.home.read();
  return {
    tagline: data?.tagline ?? 'Conductor, composer, soprano, and collaborative pianist',
    subtagline:
      data?.subtagline ??
      '“Who plays some viola and percussion and sometimes sings tenor in choir”',
    introHeading: data?.introHeading ?? 'Meet Charlotte',
    intro: data?.intro || HOME_INTRO,
    heroColor: data?.heroColor ?? DEFAULT_IMAGES.heroColor,
    heroBw: data?.heroBw ?? DEFAULT_IMAGES.heroBw,
  };
}

export async function getAbout() {
  const data = await reader.singletons.about.read();
  return {
    heading: data?.heading ?? 'Charlotte Wang, conductor and more',
    bio: data?.bio || ABOUT_BIO,
    myStoryHeading: data?.myStoryHeading ?? 'My Story',
    myStory: data?.myStory ?? '',
    statementHeading: data?.statementHeading ?? 'Music, Community, and Human Connection',
    statement: data?.statement || ABOUT_STATEMENT,
    cv: data?.cv ?? null,
    portrait: data?.portrait ?? DEFAULT_IMAGES.aboutPortrait,
  };
}

export async function getWritingIntro() {
  const data = await reader.singletons.writing.read();
  return {
    heading: data?.heading ?? 'Charlotte Wang, writer',
    intro: data?.intro || WRITING_INTRO,
    portrait: data?.portrait ?? DEFAULT_IMAGES.writingPortrait,
  };
}

export async function getContact() {
  const data = await reader.singletons.contact.read();
  return {
    heading: data?.heading ?? 'Get in touch',
    blurb:
      data?.blurb ??
      'Get in touch with Charlotte using the form below, or reach out to her via email.',
    email: data?.email ?? 'charlottewangmusic@gmail.com',
    facebook: data?.facebook ?? 'https://www.facebook.com/charlotte.wang.5454',
    instagram: data?.instagram ?? 'https://www.instagram.com/char_l_o_t_te/',
    youtube: data?.youtube ?? 'https://www.youtube.com/@lottiethepotato1529/featured',
  };
}

export async function getVideos() {
  const entries = await reader.collections.videos.all();
  return entries
    .map((e) => ({ slug: e.slug, ...e.entry }))
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export async function getGallery() {
  const entries = await reader.collections.gallery.all();
  if (entries.length === 0) return DEFAULT_GALLERY;
  return entries
    .map((e) => e.entry)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map((e) => ({ src: e.photo ?? '', caption: e.caption }))
    .filter((e) => e.src);
}

export async function getWritings() {
  const entries = await reader.collections.writings.all();
  return entries.map((e) => ({ slug: e.slug, ...e.entry }));
}

export async function getWriting(slug: string) {
  const entry = await reader.collections.writings.read(slug);
  return entry ? { slug, ...entry } : null;
}
