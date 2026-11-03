import React from 'react';
import type { Metadata } from 'next';
import { Locale, UI_STRINGS } from '@/data/translations';
import { PortfolioFilterView } from '@/components/PortfolioFilterView';
import { StructuredData } from '@/components/StructuredData';
import { getBreadcrumbSchema } from '@/utils/schema';
import { createLocalizedMetadata } from '@/utils/seo';

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const isFa = params.locale === 'fa';
  return createLocalizedMetadata({
    locale: params.locale,
    path: '/work',
    title: isFa ? 'پروژه‌های اجرایی و نمونه‌کارها' : 'Case Studies & Production Deployments',
    description: isFa
      ? 'منتخبی از تجربیات دیجیتال، اپلیکیشن‌های تعاملی واقعیت مجازی، WebAR و فناوری‌های نمایشگاهی اجرا شده توسط استودیو MIGO.'
      : 'Explore MIGO Studio portfolio of virtual reality simulators, interactive museum installations, WebAR configurators, and serious games.',
  });
}

export default function WorkPage({ params }: { params: { locale: Locale } }) {
  const locale = params.locale === 'en' ? 'en' : 'fa';
  const isRtl = locale === 'fa';

  const breadcrumbs = getBreadcrumbSchema(locale, [
    { name: isRtl ? 'صفحه اصلی' : 'Home', path: '/' },
    { name: UI_STRINGS.selectedWork[locale], path: '/work' },
  ]);

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
      <StructuredData id="work-breadcrumbs" data={breadcrumbs} />

      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-block px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider text-brand-orange bg-brand-orange/10 border border-brand-orange/20">
          {isRtl ? 'آرشیو مطالعات موردی' : 'Production Showcase'}
        </div>
        <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-white tracking-tight">
          {UI_STRINGS.selectedWork[locale]}
        </h1>
        <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed">
          {UI_STRINGS.selectedWorkDesc[locale]}
        </p>
      </div>

      {/* Interactive Filter View */}
      <PortfolioFilterView />
    </div>
  );
}
