import type { Metadata } from 'next';
import { Locale } from '@/data/translations';

export const SITE_NAME_FA = 'استودیو فناوری خلاق MIGO';
export const SITE_NAME_EN = 'MIGO Creative Technology Studio';
export const DEFAULT_DESCRIPTION_FA =
  'استودیو MIGO طراح و مجری تجربیات غوطه‌ورکننده دیجیتال، واقعیت مجازی (VR/MR)، واقعیت افزوده وب (WebAR)، بازی‌های سازمانی و فناوری‌های تعاملی نمایشگاهی.';
export const DEFAULT_DESCRIPTION_EN =
  'MIGO is a premier creative technology studio engineering virtual reality (VR/MR), WebAR, kinetic exhibition walls, serious games, and real-time 3D simulation.';

export function getBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/+$/, '');
  }
  // Default GitHub Pages V2 address
  return 'https://nima30019.github.io/migo-studio-v2';
}

export function buildCanonicalUrl(pathname: string): string {
  const base = getBaseUrl();
  const cleanPath = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return `${base}${cleanPath}`;
}

export interface LocalizedSeoProps {
  locale: Locale;
  path: string;
  title: string;
  description?: string;
  keywords?: string[];
  image?: string;
  type?: 'website' | 'article';
}

export function createLocalizedMetadata({
  locale,
  path,
  title,
  description,
  keywords,
  image = '/migo-logo.png',
  type = 'website',
}: LocalizedSeoProps): Metadata {
  const isFa = locale === 'fa';
  const siteName = isFa ? SITE_NAME_FA : SITE_NAME_EN;
  const desc = description || (isFa ? DEFAULT_DESCRIPTION_FA : DEFAULT_DESCRIPTION_EN);

  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const canonicalUrl = buildCanonicalUrl(`/${locale}${cleanPath === '/' ? '' : cleanPath}`);
  const faUrl = buildCanonicalUrl(`/fa${cleanPath === '/' ? '' : cleanPath}`);
  const enUrl = buildCanonicalUrl(`/en${cleanPath === '/' ? '' : cleanPath}`);
  const imageUrl = image.startsWith('http') ? image : `${getBaseUrl()}${image.startsWith('/') ? image : `/${image}`}`;

  const defaultKeywords = isFa
    ? [
        'واقعیت مجازی',
        'فناوری نمایشگاهی',
        'طراحی سه‌بعدی',
        'WebAR',
        'شبیه‌سازی صنعتی',
        'بازی تعاملی',
        'استودیو MIGO',
        'فناوری خلاق',
        'آزمایشگاه تجربی',
      ]
    : [
        'Virtual Reality',
        'Mixed Reality',
        'WebAR',
        'Creative Technology',
        'MIGO Studio',
        'Exhibition Tech',
        'Serious Games',
        'Interactive 3D',
        'Spatial Computing',
      ];

  const googleVerification =
    process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || 'google-site-verification-placeholder-migo-v2';
  const bingVerification =
    process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION || 'bing-site-verification-placeholder-migo-v2';

  return {
    title: `${title} | ${siteName}`,
    description: desc,
    keywords: keywords || defaultKeywords,
    authors: [{ name: 'MIGO Creative Technology Studio', url: getBaseUrl() }],
    creator: 'MIGO Studio',
    publisher: 'MIGO Studio',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: canonicalUrl,
      languages: {
        fa: faUrl,
        en: enUrl,
        'x-default': faUrl,
      },
    },
    verification: {
      google: googleVerification,
      other: {
        'msvalidate.01': bingVerification,
      },
    },
    openGraph: {
      title: `${title} | ${siteName}`,
      description: desc,
      url: canonicalUrl,
      siteName: siteName,
      locale: isFa ? 'fa_IR' : 'en_US',
      type: type,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${title} | ${siteName}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${siteName}`,
      description: desc,
      images: [imageUrl],
      creator: '@migostudio',
      site: '@migostudio',
    },
  };
}
