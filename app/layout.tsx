import type { Metadata } from 'next';
import { Cormorant_Garamond, Mulish } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const mulish = Mulish({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-mulish',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://charlottewangmusic.com'),
  title: {
    default: 'Charlotte Wang — Conductor and More',
    template: '%s — Charlotte Wang',
  },
  description:
    'Shuyao “Charlotte” Wang is a conductor, composer, soprano, and collaborative pianist whose work bridges choral, orchestral, and literary imagination.',
  openGraph: {
    title: 'Charlotte Wang — Conductor and More',
    description:
      'Conductor, composer, soprano, and collaborative pianist whose work bridges choral, orchestral, and literary imagination.',
    url: 'https://charlottewangmusic.com',
    siteName: 'Charlotte Wang',
    images: [
      {
        url: '/image.png',
        width: 1200,
        height: 630,
        alt: 'Charlotte Wang — Conductor & More',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Charlotte Wang — Conductor & More',
    description:
      'Conductor, composer, soprano, and collaborative pianist whose work bridges choral, orchestral, and literary imagination.',
    images: ['/image.png'],
  },
  icons: {
    icon: '/image.png',
    apple: '/image.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${mulish.variable}`}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
