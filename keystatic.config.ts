import { config, fields, collection, singleton } from '@keystatic/core';
import { ABOUT_BIO, ABOUT_STATEMENT, HOME_INTRO, WRITING_INTRO } from './lib/defaults';

// Local development writes directly to disk. The deployed editor uses
// Keystatic Cloud to authenticate and commit edits to GitHub.
const storage =
  process.env.NODE_ENV === 'production'
    ? ({ kind: 'cloud' } as const)
    : ({ kind: 'local' } as const);

const image = (label: string, description?: string) =>
  fields.image({
    label,
    description: description ?? 'Leave empty to keep the current default photo, or upload to replace it.',
    directory: 'public/images/uploads',
    publicPath: '/images/uploads/',
  });

export default config({
  storage,
  cloud: {
    project: 'charlotte/personal-website',
  },
  ui: {
    brand: { name: 'Charlotte Wang' },
  },
  singletons: {
    home: singleton({
      label: 'Home page',
      path: 'content/home',
      format: { data: 'yaml' },
      schema: {
        tagline: fields.text({
          label: 'Tagline',
          defaultValue: 'Conductor, composer, soprano, and collaborative pianist',
        }),
        subtagline: fields.text({
          label: 'Playful subtitle',
          multiline: true,
          defaultValue:
            '“Who plays some viola and percussion and sometimes sings tenor in choir”',
        }),
        introHeading: fields.text({ label: 'Intro heading', defaultValue: 'Meet Charlotte' }),
        intro: fields.text({
          label: 'Intro paragraph',
          multiline: true,
          defaultValue: HOME_INTRO,
        }),
        heroColor: image('Hero photo (color)'),
        heroBw: image('Hero photo (black & white)'),
      },
    }),
    about: singleton({
      label: 'About page',
      path: 'content/about',
      format: { data: 'yaml' },
      schema: {
        heading: fields.text({ label: 'Heading', defaultValue: 'Charlotte Wang, conductor and more' }),
        bio: fields.text({ label: 'Biography', multiline: true, defaultValue: ABOUT_BIO }),
        myStoryHeading: fields.text({ label: 'My Story heading', defaultValue: 'My Story' }),
        myStory: fields.text({
          label: 'My Story',
          multiline: true,
          defaultValue: '(Coming soon.)',
        }),
        statementHeading: fields.text({
          label: 'Statement heading',
          defaultValue: 'Music, Community, and Human Connection',
        }),
        statement: fields.text({ label: 'Statement', multiline: true, defaultValue: ABOUT_STATEMENT }),
        cv: fields.file({
          label: 'CV (PDF)',
          description: 'Upload a PDF to enable the “Download CV” button.',
          directory: 'public/files',
          publicPath: '/files/',
        }),
        portrait: image('Portrait photo'),
      },
    }),
    writing: singleton({
      label: 'Writing page (intro)',
      path: 'content/writing-intro',
      format: { data: 'yaml' },
      schema: {
        heading: fields.text({ label: 'Heading', defaultValue: 'Charlotte Wang, writer' }),
        intro: fields.text({ label: 'Intro', multiline: true, defaultValue: WRITING_INTRO }),
        portrait: image('Portrait photo'),
      },
    }),
    contact: singleton({
      label: 'Contact page',
      path: 'content/contact',
      format: { data: 'yaml' },
      schema: {
        heading: fields.text({ label: 'Heading', defaultValue: 'Get in touch' }),
        blurb: fields.text({
          label: 'Blurb',
          multiline: true,
          defaultValue:
            'Get in touch with Charlotte using the form below, or reach out to her via email.',
        }),
        email: fields.text({ label: 'Email', defaultValue: 'charlottewangmusic@gmail.com' }),
        facebook: fields.url({ label: 'Facebook URL', defaultValue: 'https://www.facebook.com/charlotte.wang.5454' }),
        instagram: fields.url({ label: 'Instagram URL', defaultValue: 'https://www.instagram.com/char_l_o_t_te/' }),
        youtube: fields.url({ label: 'YouTube URL', defaultValue: 'https://www.youtube.com/@lottiethepotato1529/featured' }),
      },
    }),
  },
  collections: {
    videos: collection({
      label: 'Media — Videos',
      path: 'content/videos/*',
      slugField: 'title',
      format: { data: 'yaml' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        category: fields.select({
          label: 'Category',
          options: [
            { label: 'Conducting', value: 'conducting' },
            { label: 'Composition', value: 'composition' },
            { label: 'Singing', value: 'singing' },
            { label: 'Collaborative Piano', value: 'collaborative-piano' },
          ],
          defaultValue: 'conducting',
        }),
        youtubeUrl: fields.url({ label: 'YouTube URL' }),
        description: fields.text({ label: 'Description', multiline: true }),
        order: fields.integer({ label: 'Sort order', defaultValue: 0 }),
      },
    }),
    gallery: collection({
      label: 'Photo gallery',
      path: 'content/gallery/*',
      slugField: 'caption',
      format: { data: 'yaml' },
      schema: {
        caption: fields.slug({ name: { label: 'Caption' } }),
        photo: image('Photo'),
        order: fields.integer({ label: 'Sort order', defaultValue: 0 }),
      },
    }),
    writings: collection({
      label: 'Writing pieces',
      path: 'content/writings/*',
      slugField: 'title',
      format: { data: 'yaml' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        category: fields.select({
          label: 'Category',
          options: [
            { label: 'Poetry', value: 'poetry' },
            { label: 'Short Story', value: 'short-story' },
            { label: 'Dear Past, Dear Tomorrow', value: 'dear-past-dear-tomorrow' },
            { label: 'Proses & Blogs', value: 'prose-blog' },
          ],
          defaultValue: 'poetry',
        }),
        language: fields.select({
          label: 'Language',
          options: [
            { label: 'English', value: 'en' },
            { label: '中文', value: 'zh' },
            { label: 'Français', value: 'fr' },
          ],
          defaultValue: 'en',
        }),
        date: fields.date({ label: 'Date' }),
        excerpt: fields.text({ label: 'Excerpt', multiline: true }),
        body: fields.text({ label: 'Full text', multiline: true }),
      },
    }),
  },
});
