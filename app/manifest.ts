import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Charlotte Wang',
    short_name: 'Charlotte Wang',
    description:
      'Charlotte Wang — conductor, composer, soprano, and collaborator.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f4f1ea',
    theme_color: '#f4f1ea',
    icons: [
      {
        src: '/icons/brand-mark-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icons/brand-mark-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
