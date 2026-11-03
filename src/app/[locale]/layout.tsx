import React from 'react';
import type { Metadata } from 'next';
import { Locale } from '@/data/translations';
import { DirectionProvider } from '@/components/direction/DirectionProvider';
import { AudioProvider } from '@/components/AudioController';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CustomCursor } from '@/components/CustomCursor';
import { GoogleAnalytics } from '@/components/GoogleAnalytics';
import { StructuredData } from '@/components/StructuredData';
import { MigoAi } from '@/components/ai/MigoAi';
import { getOrganizationSchema, getWebSiteSchema } from '@/utils/schema';
import { createLocalizedMetadata } from '@/utils/seo';

export function generateStaticParams() {
  return [{ locale: 'fa' }, { locale: 'en' }];
}

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const isFa = params.locale === 'fa';
  return createLocalizedMetadata({
    locale: params.locale,
    path: '/',
    title: isFa
      ? 'استودیو فناوری خلاق و رایانش فضایی'
      : 'Creative Technology & Spatial XR',
  });
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  const locale = params.locale === 'en' ? 'en' : 'fa';
  const orgSchema = getOrganizationSchema(locale);
  const webSiteSchema = getWebSiteSchema(locale);

  return (
    <DirectionProvider locale={locale}>
      <AudioProvider>
        {/* Skip to Content for Screen Readers & Keyboard Access */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:start-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-brand-orange focus:text-white focus:rounded-xl focus:shadow-xl focus:font-bold text-xs"
        >
          {locale === 'fa' ? 'پرش به محتوای اصلی' : 'Skip to main content'}
        </a>

        {/* Global Navigation */}
        <Navbar />

        {/* Semantic Main Container */}
        <main id="main-content" className="flex-1">
          {children}
        </main>

        {/* Studio Footer */}
        <Footer />

        {/* Desktop Magnetic Custom Cursor */}
        <CustomCursor />

        {/* MIGO AI Autonomous In-Browser Assistant */}
        <MigoAi />

        {/* GA4 Script Container */}
        <GoogleAnalytics />

        {/* Schema.org Structured Data */}
        <StructuredData id="migo-organization-schema" data={orgSchema} />
        <StructuredData id="migo-website-schema" data={webSiteSchema} />
      </AudioProvider>
    </DirectionProvider>
  );
}
