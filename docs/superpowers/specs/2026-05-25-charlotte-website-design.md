# Charlotte Wang — Personal Website Design Spec

**Date:** 2026-05-25
**For:** Shuyao "Charlotte" Wang — conductor, composer, soprano, collaborative pianist (and writer)
**Domain:** charlottewangmusic.com (registrar TBD)
**Built by:** Tina (for a friend; Charlotte is non-technical and will edit content solo)

## Goal

An elegant personal portfolio site that presents Charlotte's musical and literary work, and that
**Charlotte can edit herself** (text + photo swaps + adding YouTube links) without touching code.

## Stack

- **Next.js** (App Router) + **TypeScript**
- **Tailwind CSS** for styling
- **Keystatic** as the content editor (git-based, free, in-repo content). Charlotte logs into an
  admin panel, edits plain form fields, drag-drops images, pastes YouTube links. Saves commit to
  GitHub → Vercel auto-rebuilds.
- **GitHub** repo (new account created in Charlotte's name so she owns it)
- **Vercel** hosting, custom domain charlottewangmusic.com

## Design language

- **Aesthetic:** warm, editorial-elegant, photo-forward, calm. References: anamariaotamendi.com
  (calm single-column, generous whitespace) + designbyveronique.com (photo-centric, layered photo
  blocks, gentle scroll motion).
- **Palette:**
  - Background cream `#F4F1EA`
  - Warm greige `#E3DED3`
  - Soft lavender accent `#C7C2D4`
  - Olive `#74723F`
  - Deep brown (text + buttons) `#3F2F21`
- **Type:** old-style serif for headings (Cormorant Garamond / EB Garamond); quiet humanist sans
  for body. Generous whitespace, large imagery, subtle fade/scroll-in animations.
- **Signature hero effect:** the studio headshot exists in **color and black-and-white** versions
  (same shot). Hero crossfades between them (B&W → color on hover/scroll). Source files in
  `assets/photos/charlotte-headshot-{bw,color}.jpg` (high-res; optimized web versions generated).

## Site map (5 pages)

1. **Home** — hero (name + color/B&W headshot effect), taglines ("Conductor, composer, soprano,
   and collaborative pianist" + the playful "who plays some viola and percussion and sometimes
   sings tenor in choir" quote), short "Meet Charlotte" intro → Read more (About), quick entry
   tiles to Media / Writing.
2. **About** — full bio; "My Story" section (placeholder for now); "Music, Community, and Human
   Connection" statement; **CV download** button (placeholder PDF until provided).
3. **Media** — sections for **Conducting · Composition · Singing · Collaborative Piano**, each a
   grid of **embedded YouTube videos** (placeholders until links provided); plus a **Photo Gallery**
   (grid + lightbox).
4. **Writing** — "Charlotte Wang, writer" bio; sections **Poetry · Short Story · Dear Past, Dear
   Tomorrow · Proses & Blogs**. Each piece is an entry opening to a readable article-style page.
   (Section naming for "Dear Past, Dear Tomorrow" to be confirmed/adjusted later.)
5. **Contact** — contact form (emails charlottewangmusic@gmail.com), email link, and social links:
   Facebook, Instagram, YouTube.

## Editable content model (Keystatic collections/singletons)

- **Singletons:** site settings (nav, footer, socials), Home, About, Writing intro, Contact.
- **Collections:** Media videos (per category: title, YouTube URL, description), Gallery photos,
  Writing pieces (title, category, body rich-text, date).
- All text fields, images, and links editable; placeholders shipped where content not yet provided.

## Content readiness (at build time)

- Ready now: professional headshots (color + B&W). Rest = polished placeholders Charlotte fills via
  the editor: CV PDF, YouTube video links, writing pieces, additional photos.

## Deployment

- Develop + preview on **localhost** first.
- Then: create Charlotte's GitHub account → push repo → connect Vercel → point
  charlottewangmusic.com DNS at Vercel (exact records depend on registrar, TBD).

## Out of scope (YAGNI)

- No backend server, database, blog comments, e-commerce, multi-language toggle, or analytics
  beyond what Vercel provides by default. Keep it simple and free.
