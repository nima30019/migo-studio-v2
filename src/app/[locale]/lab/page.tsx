import React from 'react';
import type { Metadata } from 'next';
import { Locale, UI_STRINGS } from '@/data/translations';
import { LabInteractiveSandbox } from '@/components/LabInteractiveSandbox';
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
    path: '/lab',
    title: isFa ? 'آزمایشگاه تجربی و شیدرهای ریل‌تایم' : 'Experiments Lab & Real-Time Shaders',
    description: isFa
      ? 'آزمایشگاه فناوری‌های تجربی استودیو MIGO؛ شیدرهای تعاملی WebGL، شبیه‌ساز ابر نقاط LiDAR، تایپوگرافی حرکتی و کاوشگر WebAR.'
      : 'Explore MIGO Studio Experiments Lab: real-time GPU simplex noise shaders, LiDAR point cloud streaming, kinetic typography, and zero-install WebAR.',
  });
}

export default function LabPage({ params }: { params: { locale: Locale } }) {
  const locale = params.locale === 'en' ? 'en' : 'fa';
  const isRtl = locale === 'fa';

  const breadcrumbs = getBreadcrumbSchema(locale, [
    { name: isRtl ? 'صفحه اصلی' : 'Home', path: '/' },
    { name: UI_STRINGS.labHeadline[locale], path: '/lab' },
  ]);

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      <StructuredData id="lab-breadcrumbs" data={breadcrumbs} />

      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider text-cyan-300 bg-cyan-950/60 border border-cyan-400/40">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span>{isRtl ? 'آزمایشگاه تحقیق و توسعه (R&D)' : 'R&D Experiments Lab'}</span>
        </div>
        <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-white tracking-tight">
          {UI_STRINGS.labHeadline[locale]}
        </h1>
        <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed">
          {UI_STRINGS.labDesc[locale]}
        </p>
      </div>

      {/* Interactive Sandbox */}
      <LabInteractiveSandbox />
    </div>
  );
}
