import { Locale } from '@/data/translations';
import { getBaseUrl } from './seo';

export function getOrganizationSchema(locale: Locale) {
  const isFa = locale === 'fa';
  const baseUrl = getBaseUrl();

  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${baseUrl}/#organization`,
    name: isFa ? 'استودیو فناوری خلاق MIGO' : 'MIGO Creative Technology Studio',
    alternateName: 'MIGO',
    url: `${baseUrl}/${locale}`,
    logo: {
      '@type': 'ImageObject',
      url: `${baseUrl}/migo-logo-transparent.png`,
      caption: 'MIGO Studio Logo',
    },
    image: `${baseUrl}/migo-logo.png`,
    description: isFa
      ? 'استودیو فناوری خلاق MIGO؛ پیشگام در توسعه واقعیت مجازی (VR/MR)، واقعیت افزوده وب (WebAR)، فناوری‌های تعاملی نمایشگاهی، بازی‌سازی و آزمایشگاه تجربیات نوآورانه.'
      : 'MIGO Creative Technology Studio engineering next-generation VR/MR, WebAR, kinetic exhibition walls, serious games, and interactive 3D simulations.',
    email: 'migogamessemnan@gmail.com',
    telephone: '+98-21-88880000',
    priceRange: '$$$$',
    knowsAbout: [
      'Virtual Reality (VR)',
      'Mixed Reality (MR)',
      'Augmented Reality (AR)',
      'WebAR',
      'Real-Time WebGL',
      'Interactive Exhibitions',
      'Game Development',
      'Serious Games',
      '3D Visualization',
      'Industrial Safety Simulation',
      'Physical Sensor Integration (Kinect, LiDAR)',
    ],
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'Worldwide',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Tehran',
      addressCountry: 'IR',
    },
    sameAs: [
      'https://linkedin.com/company/migo-studio',
      'https://instagram.com/migo.studio',
      'https://github.com/nima30019/migo-studio-v2',
    ],
  };
}

export function getWebSiteSchema(locale: Locale) {
  const isFa = locale === 'fa';
  const baseUrl = getBaseUrl();

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${baseUrl}/#website`,
    url: `${baseUrl}/${locale}`,
    name: isFa ? 'استودیو تجربیات تعاملی MIGO V2' : 'MIGO Interactive Studio V2',
    description: isFa
      ? 'استودیو فناوری خلاق MIGO؛ طراحی و مهندسی تجربیات تعاملی، سه‌بعدی و فضایی.'
      : 'MIGO Creative Technology Studio; engineering interactive, 3D, and spatial digital experiences.',
    publisher: {
      '@id': `${baseUrl}/#organization`,
    },
    inLanguage: ['fa-IR', 'en-US'],
  };
}

export function getBreadcrumbSchema(
  locale: Locale,
  items: Array<{ name: string; path: string }>
) {
  const baseUrl = getBaseUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${baseUrl}/${locale}${item.path.startsWith('/') ? item.path : `/${item.path}`}`,
    })),
  };
}

export function getServiceSchema(
  locale: Locale,
  service: {
    title: Record<Locale, string>;
    overview: Record<Locale, string>;
    slug: string;
    capabilities: Record<Locale, string[]>;
  }
) {
  const baseUrl = getBaseUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${baseUrl}/${locale}/services/${service.slug}#service`,
    name: service.title[locale],
    description: service.overview[locale],
    provider: {
      '@id': `${baseUrl}/#organization`,
    },
    serviceType: service.title.en,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: service.title[locale],
      itemListElement: service.capabilities[locale].map((cap, i) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          position: i + 1,
          name: cap,
        },
      })),
    },
  };
}

export function getFaqSchema(
  locale: Locale,
  faqs: Array<{ q: Record<Locale, string>; a: Record<Locale, string> }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q[locale],
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a[locale],
      },
    })),
  };
}

export function getCreativeWorkSchema(
  locale: Locale,
  project: {
    title: Record<Locale, string>;
    shortDescription: Record<Locale, string>;
    slug: string;
    technologies: string[];
    clientSample: Record<Locale, string>;
  }
) {
  const baseUrl = getBaseUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    '@id': `${baseUrl}/${locale}/work/${project.slug}#work`,
    name: project.title[locale],
    description: project.shortDescription[locale],
    creator: {
      '@id': `${baseUrl}/#organization`,
    },
    keywords: project.technologies.join(', '),
    publisher: {
      '@id': `${baseUrl}/#organization`,
    },
  };
}

export function getArticleSchema(
  locale: Locale,
  article: {
    title: Record<Locale, string>;
    excerpt: Record<Locale, string>;
    slug: string;
    author: string;
    date: string;
    tags: string[];
  }
) {
  const baseUrl = getBaseUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${baseUrl}/${locale}/insights/${article.slug}#article`,
    headline: article.title[locale],
    description: article.excerpt[locale],
    author: {
      '@type': 'Organization',
      name: article.author || 'MIGO Studio',
    },
    publisher: {
      '@id': `${baseUrl}/#organization`,
    },
    datePublished: article.date,
    keywords: article.tags.join(', '),
  };
}
