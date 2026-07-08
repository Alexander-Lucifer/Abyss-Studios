import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://abyssstudios.site';
  const locales = ['en', 'jp', 'zh', 'ko', 'hi'];

  // Localized routes under src/app/[locale]
  const localizedRoutes = [
    { path: '', changeFrequency: 'weekly' as const, priority: 1.0 },
    { path: '/games', changeFrequency: 'daily' as const, priority: 0.9 },
    { path: '/games/tiles-and-towers', changeFrequency: 'weekly' as const, priority: 0.8 },
    { path: '/games/mansion-of-chaos', changeFrequency: 'weekly' as const, priority: 0.8 },
    { path: '/games/finite-samsara', changeFrequency: 'weekly' as const, priority: 0.8 },
    { path: '/services', changeFrequency: 'weekly' as const, priority: 0.8 },
    { path: '/careers', changeFrequency: 'weekly' as const, priority: 0.8 },
    { path: '/careers/apply', changeFrequency: 'weekly' as const, priority: 0.8 },
    { path: '/contact', changeFrequency: 'weekly' as const, priority: 0.8 },
    { path: '/about', changeFrequency: 'weekly' as const, priority: 0.8 },
    { path: '/about/team', changeFrequency: 'daily' as const, priority: 0.4 },
    { path: '/about/life', changeFrequency: 'daily' as const, priority: 0.4 },
  ];

  const localizedEntries = localizedRoutes.flatMap(({ path, changeFrequency, priority }) => {
    return locales.map((locale) => {
      const url = `${baseUrl}/${locale}${path}`;
      
      const languages: Record<string, string> = {};
      locales.forEach((loc) => {
        languages[loc] = `${baseUrl}/${loc}${path}`;
      });

      return {
        url,
        lastModified: new Date(),
        changeFrequency,
        priority,
        alternates: {
          languages,
        },
      };
    });
  });

  // Non-localized routes under src/pages
  const nonLocalizedRoutes = [
    { path: '/privacy-policy', changeFrequency: 'yearly' as const, priority: 0.4 },
    { path: '/terms-of-service', changeFrequency: 'yearly' as const, priority: 0.4 },
  ];

  const nonLocalizedEntries = nonLocalizedRoutes.map(({ path, changeFrequency, priority }) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));

  return [...localizedEntries, ...nonLocalizedEntries];
} 