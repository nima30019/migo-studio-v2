import { MetadataRoute } from 'next';
import { getBaseUrl } from '@/utils/seo';
import { SERVICES } from '@/data/services';
import { PROJECTS } from '@/data/projects';
import { ARTICLES } from '@/data/articles';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();
  const currentDate = new Date();

  interface RouteDef {
    path: string;
    priority: number;
    changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  }

  const staticRoutes: RouteDef[] = [
    { path: '', priority: 1.0, changeFrequency: 'weekly' },
    { path: '/services', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/work', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/lab', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/about', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/insights', priority: 0.8, changeFrequency: 'daily' },
    { path: '/contact', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/start-project', priority: 0.9, changeFrequency: 'monthly' },
  ];

  const serviceRoutes: RouteDef[] = SERVICES.map((s) => ({
    path: `/services/${s.slug}`,
    priority: 0.85,
    changeFrequency: 'weekly',
  }));

  const projectRoutes: RouteDef[] = PROJECTS.map((p) => ({
    path: `/work/${p.slug}`,
    priority: 0.85,
    changeFrequency: 'monthly',
  }));

  const articleRoutes: RouteDef[] = ARTICLES.map((a) => ({
    path: `/insights/${a.slug}`,
    priority: 0.75,
    changeFrequency: 'monthly',
  }));

  const allRouteDefs = [
    ...staticRoutes,
    ...serviceRoutes,
    ...projectRoutes,
    ...articleRoutes,
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const route of allRouteDefs) {
    const faUrl = `${baseUrl}/fa${route.path}`;
    const enUrl = `${baseUrl}/en${route.path}`;

    // Persian URL
    entries.push({
      url: faUrl,
      lastModified: currentDate,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: {
        languages: {
          fa: faUrl,
          en: enUrl,
          'x-default': faUrl,
        },
      },
    });

    // English URL
    entries.push({
      url: enUrl,
      lastModified: currentDate,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: {
        languages: {
          fa: faUrl,
          en: enUrl,
          'x-default': faUrl,
        },
      },
    });
  }

  return entries;
}
