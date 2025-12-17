import { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Abyss Studios',
  description: 'Explore our collection of immersive gaming experiences crafted by Abyss Studios.',
  openGraph: {
    title: 'About Us | Abyss Studios',
    description: 'Explore our collection of immersive gaming experiences crafted by Abyss Studios.',
    images: ['/images/newLogo.svg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us | Abyss Studios',
    description: 'Explore our collection of immersive gaming experiences crafted by Abyss Studios.',
    images: ['/images/newLogo.svg'],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#AA110A',
};

export default function GamesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 