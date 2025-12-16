import { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: 'Game Library | Abyss Studios',
  description: 'Explore our collection of immersive gaming experiences crafted by Abyss Studios.',
  openGraph: {
    title: 'Game Library | Abyss Studios',
    description: 'Explore our collection of immersive gaming experiences crafted by Abyss Studios.',
    images: ['/images/Signature.svg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Game Library | Abyss Studios',
    description: 'Explore our collection of immersive gaming experiences crafted by Abyss Studios.',
    images: ['/images/Signature.svg'],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#DC143C',
};

export default function GamesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 