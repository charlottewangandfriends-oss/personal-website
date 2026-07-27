import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '../keystatic.config';
import { ABOUT_BIO, ABOUT_STATEMENT, WRITING_INTRO } from './defaults';

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
  aboutParallax: '/images/charlotte-conducting-live-2.jpg',
  storyCardPhoto: '/images/charlotte-conducting-live-2.jpg',
  statementCardPhoto: '/images/charlotte-group-backstage.jpg',
  myStoryHeroPhoto: '/images/charlotte-conducting-live-2.jpg',
  statementHeroPhoto: '/images/charlotte-group-backstage.jpg',
  writingPortrait: '/images/charlotte-lyrical.jpg',
};

/** Curated gallery shown until Charlotte adds her own photos in the editor. */
export const DEFAULT_GALLERY = [
  {
    src: '/images/charlotte-conducting-live-1.jpg',
    caption: 'In concert',
    category: 'conducting',
  },
  {
    src: '/images/charlotte-conducting-live-2.jpg',
    caption: 'On the podium',
    category: 'conducting',
  },
  {
    src: '/images/charlotte-group-backstage.jpg',
    caption: 'After the performance',
    category: 'collaborative-piano',
  },
  {
    src: '/images/charlotte-podium.jpg',
    caption: 'Studio portrait',
    category: 'composition',
  },
  {
    src: '/images/charlotte-lyrical.jpg',
    caption: 'Studio portrait',
    category: 'singing',
  },
];

export const VIDEO_CATEGORIES = [
  {
    value: 'conducting',
    label: 'Conducting',
    description: 'Conducting performances, rehearsals, and musical collaborations.',
    img: '/images/charlotte-conducting-live-1.jpg',
  },
  {
    value: 'composition',
    label: 'Composition',
    description: 'Original compositions and performances of Charlotte’s music.',
    img: '/images/charlotte-podium.jpg',
  },
  {
    value: 'singing',
    label: 'Singing',
    description: 'Solo and ensemble vocal performances.',
    img: '/images/charlotte-lyrical.jpg',
  },
  {
    value: 'collaborative-piano',
    label: 'Collaborative Piano',
    description: 'Collaborative piano performances with singers and instrumentalists.',
    img: '/images/charlotte-group-backstage.jpg',
  },
  {
    value: 'percussion-viola',
    label: 'Percussion & Viola',
    description:
      'Performances on percussion and viola in orchestral, chamber, and collaborative settings.',
    img: '/images/charlotte-conducting-live-2.jpg',
  },
  {
    value: 'charlotte-with-friends',
    label: 'Charlotte with Friends',
    description: 'Performances and creative collaborations with friends and fellow musicians.',
    img: '/images/charlotte-group-backstage.jpg',
  },
] as const;

export const WRITING_CATEGORIES = [
  {
    value: 'poetry',
    label: 'Poetry',
    description: 'Poetry in English, Chinese, and French.',
    img: '/images/charlotte-lyrical.jpg',
  },
  {
    value: 'short-story',
    label: 'Short Story',
    description: 'Short fiction exploring memory, identity, and human connection.',
    img: '/images/charlotte-group-backstage.jpg',
  },
  {
    value: 'dear-past-dear-tomorrow',
    label: 'Dear Past, Dear Tomorrow',
    description: 'Selections and reflections from Charlotte’s memoir project.',
    img: '/images/hero-bw.jpg',
  },
  {
    value: 'prose-blog',
    label: 'Prose & Blogs',
    description: 'Essays, reflections, and occasional notes.',
    img: '/images/charlotte-podium.jpg',
  },
] as const;

export async function getHome() {
  const data = await reader.singletons.home.read();
  return {
    tagline: data?.tagline ?? 'Conductor, composer, soprano, and collaborative pianist',
    subtagline:
      data?.subtagline ??
      '“Who plays some viola and percussion and sometimes sings tenor in choir”',
    heroColor: data?.heroColor ?? DEFAULT_IMAGES.heroColor,
    heroBw: data?.heroBw ?? DEFAULT_IMAGES.heroBw,
  };
}

export async function getAbout() {
  const [data, story, community] = await Promise.all([
    reader.singletons.about.read(),
    reader.singletons.aboutStory.read(),
    reader.singletons.aboutCommunity.read(),
  ]);

  return {
    heading: data?.heading ?? 'Charlotte Wang, conductor and more',
    bio: data?.bio || ABOUT_BIO,
    cv: data?.cv ?? null,
    portrait: data?.portrait ?? DEFAULT_IMAGES.aboutPortrait,
    parallaxPhoto: data?.parallaxPhoto ?? DEFAULT_IMAGES.aboutParallax,
    parallaxQuote:
      data?.parallaxQuote ||
      'Rehearsal rooms where people feel heard, trusted, and inspired to give their best.',
    myStory: story?.body ?? '',
    storyCardTitle: story?.title || "Charlotte's Music Journey",
    storyCardDescription:
      story?.cardDescription ||
      "Explore Charlotte's path from Amherst College to graduate studies in choral conducting at the University of Michigan, her mentors, and her musical development.",
    storyCardPhoto: story?.cardPhoto ?? DEFAULT_IMAGES.storyCardPhoto,
    myStoryHeroPhoto: story?.heroPhoto ?? DEFAULT_IMAGES.myStoryHeroPhoto,
    statementHeading: community?.title || 'Music, Community, and Human Connection',
    statement: community?.body || ABOUT_STATEMENT,
    statementCardDescription:
      community?.cardDescription ||
      "Charlotte's conducting philosophy, building trust and inspiration in rehearsal rooms, and approaching music as a shared human experience.",
    statementCardPhoto: community?.cardPhoto ?? DEFAULT_IMAGES.statementCardPhoto,
    statementHeroPhoto: community?.heroPhoto ?? DEFAULT_IMAGES.statementHeroPhoto,
  };
}

export async function getWritingIntro() {
  const data = await reader.singletons.writing.read();
  return {
    heading: data?.heading ?? 'Charlotte Wang, writer',
    intro: data?.intro || WRITING_INTRO,
    portrait: data?.portrait ?? DEFAULT_IMAGES.writingPortrait,
    categoriesEyebrow: data?.categoriesEyebrow || 'Categories',
    categoriesHeading: data?.categoriesHeading || 'Explore Writing Works',
  };
}

export async function getWritingCategories() {
  const data = await reader.singletons.writing.read();
  return [
    {
      ...WRITING_CATEGORIES[0],
      label: data?.poetryLabel || WRITING_CATEGORIES[0].label,
      description: data?.poetryDescription || WRITING_CATEGORIES[0].description,
      img: data?.poetryImage ?? WRITING_CATEGORIES[0].img,
    },
    {
      ...WRITING_CATEGORIES[1],
      label: data?.shortStoryLabel || WRITING_CATEGORIES[1].label,
      description: data?.shortStoryDescription || WRITING_CATEGORIES[1].description,
      img: data?.shortStoryImage ?? WRITING_CATEGORIES[1].img,
    },
    {
      ...WRITING_CATEGORIES[2],
      label: data?.memoirLabel || WRITING_CATEGORIES[2].label,
      description: data?.memoirDescription || WRITING_CATEGORIES[2].description,
      img: data?.memoirImage ?? WRITING_CATEGORIES[2].img,
    },
    {
      ...WRITING_CATEGORIES[3],
      label: data?.proseLabel || WRITING_CATEGORIES[3].label,
      description: data?.proseDescription || WRITING_CATEGORIES[3].description,
      img: data?.proseImage ?? WRITING_CATEGORIES[3].img,
    },
  ];
}

export async function getMediaPage() {
  const data = await reader.singletons.media.read();
  return {
    heading: data?.heading || 'Watch & Listen',
    intro: data?.intro || "Explore Charlotte's musical works by category below.",
  };
}

export async function getVideoCategories() {
  const data = await reader.singletons.media.read();
  return [
    {
      ...VIDEO_CATEGORIES[0],
      label: data?.conductingLabel || VIDEO_CATEGORIES[0].label,
      description: data?.conductingDescription || VIDEO_CATEGORIES[0].description,
      img: data?.conductingImage ?? VIDEO_CATEGORIES[0].img,
    },
    {
      ...VIDEO_CATEGORIES[1],
      label: data?.compositionLabel || VIDEO_CATEGORIES[1].label,
      description: data?.compositionDescription || VIDEO_CATEGORIES[1].description,
      img: data?.compositionImage ?? VIDEO_CATEGORIES[1].img,
    },
    {
      ...VIDEO_CATEGORIES[2],
      label: data?.singingLabel || VIDEO_CATEGORIES[2].label,
      description: data?.singingDescription || VIDEO_CATEGORIES[2].description,
      img: data?.singingImage ?? VIDEO_CATEGORIES[2].img,
    },
    {
      ...VIDEO_CATEGORIES[3],
      label: data?.pianoLabel || VIDEO_CATEGORIES[3].label,
      description: data?.pianoDescription || VIDEO_CATEGORIES[3].description,
      img: data?.pianoImage ?? VIDEO_CATEGORIES[3].img,
    },
    {
      ...VIDEO_CATEGORIES[4],
      label: data?.percussionViolaLabel || VIDEO_CATEGORIES[4].label,
      description: data?.percussionViolaDescription || VIDEO_CATEGORIES[4].description,
      img: data?.percussionViolaImage ?? VIDEO_CATEGORIES[4].img,
    },
    {
      ...VIDEO_CATEGORIES[5],
      label: data?.friendsLabel || VIDEO_CATEGORIES[5].label,
      description: data?.friendsDescription || VIDEO_CATEGORIES[5].description,
      img: data?.friendsImage ?? VIDEO_CATEGORIES[5].img,
    },
  ];
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

export async function getMediaIntroSections(category: string) {
  const entries = await reader.collections.mediaSections.all();
  return entries
    .map((e) => ({ slug: e.slug, ...e.entry }))
    .filter((section) => section.category === category)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export async function getGallery(category?: string) {
  const entries = await reader.collections.gallery.all();
  const uploaded = entries
    .map((e) => e.entry)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map((e) => ({
      src: e.photo ?? '',
      caption: e.caption,
      category: e.category ?? 'conducting',
    }))
    .filter((e) => e.src);

  if (!category) return uploaded.length ? uploaded : DEFAULT_GALLERY;

  const categoryUploads = uploaded.filter((e) => e.category === category);
  if (categoryUploads.length) return categoryUploads;
  return DEFAULT_GALLERY.filter((e) => e.category === category);
}

export async function getWritings() {
  const entries = await reader.collections.writings.all();
  return entries.map((e) => ({ slug: e.slug, ...e.entry }));
}

export async function getWriting(slug: string) {
  const entry = await reader.collections.writings.read(slug);
  return entry ? { slug, ...entry } : null;
}
