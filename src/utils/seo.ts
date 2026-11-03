import type { Metadata } from 'next';
import { Locale } from '@/data/translations';

export const SITE_NAME_FA = 'استودیو MIGO';
export const SITE_NAME_EN = 'MIGO Studio';
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

  const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
  const bingVerification = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION;

  const verification: Metadata['verification'] = {};
  if (googleVerification && !googleVerification.includes('placeholder')) {
    verification.google = googleVerification;
  }
  if (bingVerification && !bingVerification.includes('placeholder')) {
    verification.other = { 'msvalidate.01': bingVerification };
  }
  const hasVerification = Object.keys(verification).length > 0;

  return {
    title: `${title} | ${siteName}`,
    description: desc,
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
    verification: hasVerification ? verification : undefined,
    openGraph: {
      title: `${title} | ${siteName}`,
      description: desc,
      url: canonicalUrl,
      siteName: isFa ? 'استودیو فناوری خلاق MIGO' : 'MIGO Creative Technology Studio',
      locale: isFa ? 'fa_IR' : 'en_US',
      type: type,
      images: [
        {
          url: imageUrl,
          width: image === '/migo-logo.png' ? 1024 : 1200,
          height: image === '/migo-logo.png' ? 682 : 630,
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
