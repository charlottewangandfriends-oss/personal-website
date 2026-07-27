import { config, fields, collection, singleton } from '@keystatic/core';
import { ABOUT_BIO, ABOUT_STATEMENT, WRITING_INTRO } from './lib/defaults';

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

type ImagePosition =
  | 'center'
  | 'upper-center'
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';

const imagePosition = (label: string, defaultValue: ImagePosition = 'center') =>
  fields.select({
    label,
    description:
      'Choose the part of the image that must stay visible when the website trims it to the displayed shape.',
    options: [
      { label: 'Center', value: 'center' },
      { label: 'Upper center', value: 'upper-center' },
      { label: 'Top', value: 'top' },
      { label: 'Bottom', value: 'bottom' },
      { label: 'Left', value: 'left' },
      { label: 'Right', value: 'right' },
      { label: 'Top left', value: 'top-left' },
      { label: 'Top right', value: 'top-right' },
      { label: 'Bottom left', value: 'bottom-left' },
      { label: 'Bottom right', value: 'bottom-right' },
    ],
    defaultValue,
  });

const mediaCategoryOptions = [
  { label: 'Conducting', value: 'conducting' },
  { label: 'Composition', value: 'composition' },
  { label: 'Singing', value: 'singing' },
  { label: 'Collaborative Piano', value: 'collaborative-piano' },
  { label: 'Percussion & Viola', value: 'percussion-viola' },
  { label: 'Charlotte with Friends', value: 'charlotte-with-friends' },
];

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
        heroColor: image(
          'Hero photo (color)',
          'Displayed at 3:4. Use the matching black-and-white photo below for a clean crossfade.',
        ),
        heroBw: image(
          'Hero photo (black & white)',
          'Displayed at 3:4. Use the same framing as the color photo above.',
        ),
        heroPhotoPosition: imagePosition('Hero photos — crop focus'),
      },
    }),
    about: singleton({
      label: 'About — Biography',
      path: 'content/about',
      format: { data: 'yaml' },
      schema: {
        heading: fields.text({ label: 'Page heading', defaultValue: 'Charlotte Wang, conductor and more' }),
        bio: fields.text({ label: 'Biography', multiline: true, defaultValue: ABOUT_BIO }),
        cv: fields.file({
          label: 'CV (PDF)',
          description: 'Upload a PDF to enable the “Download CV” button.',
          directory: 'public/files',
          publicPath: '/files/',
        }),
        portrait: image(
          'Wide hero photo',
          'Displayed full-width and feathered into the page. Use a landscape image with the subject on the left and calm space on the right for the page title.',
        ),
        portraitPosition: imagePosition('Wide hero photo — crop focus'),
        parallaxPhoto: image(
          'Wide quote photo',
          'Displayed as a wide band. Its height changes by screen size, so choose the most important area below.',
        ),
        parallaxPhotoPosition: imagePosition('Wide quote photo — crop focus', 'upper-center'),
        parallaxQuote: fields.text({
          label: 'Quote over wide photo',
          multiline: true,
          defaultValue: 'Rehearsal rooms where people feel heard, trusted, and inspired to give their best.',
        }),
      },
    }),
    aboutStory: singleton({
      label: 'About — My Story',
      path: 'content/about-story',
      format: { data: 'yaml' },
      schema: {
        title: fields.text({
          label: 'Title',
          defaultValue: "Charlotte's Music Journey",
        }),
        body: fields.text({
          label: 'My Story',
          multiline: true,
          defaultValue: '(Coming soon.)',
        }),
        cardDescription: fields.text({
          label: 'Card description',
          multiline: true,
          defaultValue:
            "Explore Charlotte's path from Amherst College to graduate studies in choral conducting at the University of Michigan, her mentors, and her musical development.",
        }),
        cardPhoto: image('Card photo', 'Displayed at 16:10. The website trims anything outside that shape.'),
        cardPhotoPosition: imagePosition('Card photo — crop focus'),
        heroPhoto: image('Header photo', 'Displayed at 16:9. The website trims anything outside that shape.'),
        heroPhotoPosition: imagePosition('Header photo — crop focus'),
      },
    }),
    aboutCommunity: singleton({
      label: 'About — Music & Community',
      path: 'content/about-community',
      format: { data: 'yaml' },
      schema: {
        title: fields.text({
          label: 'Title',
          defaultValue: 'Music, Community, and Human Connection',
        }),
        body: fields.text({
          label: 'Statement',
          multiline: true,
          defaultValue: ABOUT_STATEMENT,
        }),
        cardDescription: fields.text({
          label: 'Card description',
          multiline: true,
          defaultValue:
            "Charlotte's conducting philosophy, building trust and inspiration in rehearsal rooms, and approaching music as a shared human experience.",
        }),
        cardPhoto: image('Card photo', 'Displayed at 16:10. The website trims anything outside that shape.'),
        cardPhotoPosition: imagePosition('Card photo — crop focus'),
        heroPhoto: image('Header photo', 'Displayed at 16:9. The website trims anything outside that shape.'),
        heroPhotoPosition: imagePosition('Header photo — crop focus'),
      },
    }),
    writing: singleton({
      label: 'Writing page (intro)',
      path: 'content/writing-intro',
      format: { data: 'yaml' },
      schema: {
        heading: fields.text({ label: 'Heading', defaultValue: 'Charlotte Wang, writer' }),
        intro: fields.text({ label: 'Intro', multiline: true, defaultValue: WRITING_INTRO }),
        portrait: image('Portrait photo', 'Displayed at 4:5. The website trims anything outside that shape.'),
        portraitPosition: imagePosition('Portrait — crop focus'),
        categoriesEyebrow: fields.text({ label: 'Categories label', defaultValue: 'Categories' }),
        categoriesHeading: fields.text({
          label: 'Categories section heading',
          defaultValue: 'Explore Writing Works',
        }),
        poetryLabel: fields.text({ label: 'Poetry — display title', defaultValue: 'Poetry' }),
        poetryDescription: fields.text({
          label: 'Poetry — description',
          multiline: true,
          defaultValue: 'Poetry in English, Chinese, and French.',
        }),
        poetryImage: image(
          'Poetry — card image',
          'Displayed at 16:9. The website trims anything outside that shape.',
        ),
        poetryImagePosition: imagePosition('Poetry — crop focus'),
        shortStoryLabel: fields.text({ label: 'Short Story — display title', defaultValue: 'Short Story' }),
        shortStoryDescription: fields.text({
          label: 'Short Story — description',
          multiline: true,
          defaultValue: 'Short fiction exploring memory, identity, and human connection.',
        }),
        shortStoryImage: image(
          'Short Story — card image',
          'Displayed at 16:9. The website trims anything outside that shape.',
        ),
        shortStoryImagePosition: imagePosition('Short Story — crop focus'),
        memoirLabel: fields.text({
          label: 'Dear Past, Dear Tomorrow — display title',
          defaultValue: 'Dear Past, Dear Tomorrow',
        }),
        memoirDescription: fields.text({
          label: 'Dear Past, Dear Tomorrow — description',
          multiline: true,
          defaultValue: "Selections and reflections from Charlotte's memoir project.",
        }),
        memoirImage: image(
          'Dear Past, Dear Tomorrow — card image',
          'Displayed at 16:9. The website trims anything outside that shape.',
        ),
        memoirImagePosition: imagePosition('Dear Past, Dear Tomorrow — crop focus'),
        proseLabel: fields.text({ label: 'Prose & Blogs — display title', defaultValue: 'Prose & Blogs' }),
        proseDescription: fields.text({
          label: 'Prose & Blogs — description',
          multiline: true,
          defaultValue: 'Essays, reflections, and occasional notes.',
        }),
        proseImage: image(
          'Prose & Blogs — card image',
          'Displayed at 16:9. The website trims anything outside that shape.',
        ),
        proseImagePosition: imagePosition('Prose & Blogs — crop focus'),
      },
    }),
    media: singleton({
      label: 'Media page & category cards',
      path: 'content/media',
      format: { data: 'yaml' },
      schema: {
        heading: fields.text({ label: 'Page heading', defaultValue: 'Watch & Listen' }),
        intro: fields.text({
          label: 'Page introduction',
          multiline: true,
          defaultValue: "Explore Charlotte's musical works by category below.",
        }),
        conductingLabel: fields.text({ label: 'Conducting — display title', defaultValue: 'Conducting' }),
        conductingDescription: fields.text({
          label: 'Conducting — description',
          multiline: true,
          defaultValue: 'Conducting performances, rehearsals, and musical collaborations.',
        }),
        conductingImage: image(
          'Conducting — card image',
          'Displayed at 16:10. The website trims anything outside that shape.',
        ),
        conductingImagePosition: imagePosition('Conducting — crop focus'),
        compositionLabel: fields.text({ label: 'Composition — display title', defaultValue: 'Composition' }),
        compositionDescription: fields.text({
          label: 'Composition — description',
          multiline: true,
          defaultValue: "Original compositions and performances of Charlotte's music.",
        }),
        compositionImage: image(
          'Composition — card image',
          'Displayed at 16:10. The website trims anything outside that shape.',
        ),
        compositionImagePosition: imagePosition('Composition — crop focus'),
        singingLabel: fields.text({ label: 'Singing — display title', defaultValue: 'Singing' }),
        singingDescription: fields.text({
          label: 'Singing — description',
          multiline: true,
          defaultValue: 'Solo and ensemble vocal performances.',
        }),
        singingImage: image(
          'Singing — card image',
          'Displayed at 16:10. The website trims anything outside that shape.',
        ),
        singingImagePosition: imagePosition('Singing — crop focus'),
        pianoLabel: fields.text({
          label: 'Collaborative Piano — display title',
          defaultValue: 'Collaborative Piano',
        }),
        pianoDescription: fields.text({
          label: 'Collaborative Piano — description',
          multiline: true,
          defaultValue: 'Collaborative piano performances with singers and instrumentalists.',
        }),
        pianoImage: image(
          'Collaborative Piano — card image',
          'Displayed at 16:10. The website trims anything outside that shape.',
        ),
        pianoImagePosition: imagePosition('Collaborative Piano — crop focus'),
        percussionViolaLabel: fields.text({
          label: 'Percussion & Viola — display title',
          defaultValue: 'Percussion & Viola',
        }),
        percussionViolaDescription: fields.text({
          label: 'Percussion & Viola — description',
          multiline: true,
          defaultValue:
            'Performances on percussion and viola in orchestral, chamber, and collaborative settings.',
        }),
        percussionViolaImage: image(
          'Percussion & Viola — card image',
          'Displayed at 16:10. The website trims anything outside that shape.',
        ),
        percussionViolaImagePosition: imagePosition('Percussion & Viola — crop focus'),
        friendsLabel: fields.text({
          label: 'Charlotte with Friends — display title',
          defaultValue: 'Charlotte with Friends',
        }),
        friendsDescription: fields.text({
          label: 'Charlotte with Friends — description',
          multiline: true,
          defaultValue: 'Performances and creative collaborations with friends and fellow musicians.',
        }),
        friendsImage: image(
          'Charlotte with Friends — card image',
          'Displayed at 16:10. The website trims anything outside that shape.',
        ),
        friendsImagePosition: imagePosition('Charlotte with Friends — crop focus'),
      },
    }),
    compositionFeature: singleton({
      label: 'Composition — Requiem',
      path: 'content/composition-feature',
      format: { data: 'yaml' },
      schema: {
        featureEyebrow: fields.text({
          label: 'Composition page — small label',
          defaultValue: 'Featured work',
        }),
        featureTitle: fields.text({
          label: 'Composition page — work title',
          defaultValue: 'Requiem: Ceaseless Life',
        }),
        featureSummary: fields.text({
          label: 'Composition page — short introduction',
          description: 'Shown in the standalone Requiem section before the other composition videos.',
          multiline: true,
        }),
        featureLinkLabel: fields.text({
          label: 'Composition page — link label',
          defaultValue: 'Explore the Requiem',
        }),
        detailEyebrow: fields.text({
          label: 'Requiem page — small label',
          defaultValue: 'Composition',
        }),
        detailIntroduction: fields.text({
          label: 'Requiem page — introduction',
          multiline: true,
        }),
        aboutHeading: fields.text({
          label: 'About section — heading',
          defaultValue: 'About the work',
        }),
        aboutBody: fields.text({
          label: 'About section — text',
          description: 'Separate paragraphs with a blank line.',
          multiline: true,
        }),
        featuredVideo: fields.relationship({
          label: 'Featured video',
          description: 'Choose an existing entry from Media — Videos. Editing that video there updates this page too.',
          collection: 'videos',
        }),
        librettoCredit: fields.text({
          label: 'Requiem page — libretto credit',
          defaultValue: 'Libretto by Haoran Tong',
        }),
        librettoUrl: fields.text({
          label: 'Libretto source document',
          description:
            'Optional reference for editors. The public website links to the internal libretto page instead.',
        }),
        librettoBody: fields.text({
          label: 'Libretto page — full text',
          description:
            'Paste the full libretto here. Keep verse lines on separate lines and use a blank line between stanzas.',
          multiline: true,
        }),
        librettoLinkLabel: fields.text({
          label: 'Internal libretto link label',
          defaultValue: 'Read the libretto',
        }),
        premiereHeading: fields.text({
          label: 'Premiere concert — heading',
          defaultValue: 'Premiere concert',
        }),
        premiereBody: fields.text({
          label: 'Premiere concert — text',
          multiline: true,
        }),
        programPdf: fields.file({
          label: 'Premiere concert — program PDF',
          description: 'Upload a PDF to show the download button on the Requiem page.',
          directory: 'public/files/programs',
          publicPath: '/files/programs/',
        }),
        programUrl: fields.url({
          label: 'Premiere concert — external program link',
          description: 'Optional. Use this for a Google Doc or another hosted program. It takes priority over the uploaded PDF.',
        }),
        programButtonLabel: fields.text({
          label: 'Program superlink label',
          defaultValue: 'Download concert program',
        }),
        collaborationHeading: fields.text({
          label: 'Collaboration section — heading',
          defaultValue: 'And what?',
        }),
        collaborationBody: fields.text({
          label: 'Collaboration section — text',
          description: 'Use this space for future performances, commissions, or collaboration ideas.',
          multiline: true,
        }),
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
      columns: ['title', 'category', 'order'],
      format: { data: 'yaml' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        category: fields.select({
          label: 'Category',
          options: mediaCategoryOptions,
          defaultValue: 'conducting',
        }),
        youtubeUrl: fields.url({ label: 'YouTube URL' }),
        description: fields.text({ label: 'Description', multiline: true }),
        order: fields.integer({ label: 'Sort order', defaultValue: 0 }),
      },
    }),
    mediaSections: collection({
      label: 'Media — Introduction sections',
      path: 'content/media-sections/*',
      slugField: 'title',
      format: { data: 'yaml' },
      schema: {
        title: fields.slug({ name: { label: 'Section heading' } }),
        category: fields.select({
          label: 'Show this section under',
          description: 'This section will appear before the videos in the selected Media category.',
          options: mediaCategoryOptions,
          defaultValue: 'conducting',
        }),
        eyebrow: fields.text({
          label: 'Small label above heading',
          description: 'Optional. For example: About the work, Selected projects, or In rehearsal.',
        }),
        body: fields.text({
          label: 'Body text',
          description: 'Optional. Separate paragraphs with a blank line.',
          multiline: true,
        }),
        sectionImage: image(
          'Section image',
          'Optional. Displayed at 4:3; the website trims anything outside that shape.',
        ),
        sectionImagePosition: imagePosition('Section image — crop focus'),
        imageAlt: fields.text({
          label: 'Image description (accessibility)',
          description: 'Briefly describe the image for visitors using screen readers.',
        }),
        imageCaption: fields.text({
          label: 'Image caption',
          description: 'Optional caption shown below the image.',
        }),
        layout: fields.select({
          label: 'Layout',
          options: [
            { label: 'Text left, image right', value: 'image-right' },
            { label: 'Image left, text right', value: 'image-left' },
            { label: 'Wide image below text', value: 'wide-image' },
          ],
          defaultValue: 'image-right',
        }),
        order: fields.integer({
          label: 'Sort order',
          description: 'Lower numbers appear first.',
          defaultValue: 0,
        }),
      },
    }),
    gallery: collection({
      label: 'Media — Category photos',
      path: 'content/gallery/*',
      slugField: 'caption',
      format: { data: 'yaml' },
      schema: {
        caption: fields.slug({ name: { label: 'Caption' } }),
        category: fields.select({
          label: 'Show this photo under',
          description: 'The photo will appear automatically in this Media category.',
          options: mediaCategoryOptions,
          defaultValue: 'conducting',
        }),
        photo: image(
          'Photo',
          'The category thumbnail is displayed at 4:3; the lightbox shows the full image.',
        ),
        photoPosition: imagePosition('Thumbnail — crop focus'),
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
