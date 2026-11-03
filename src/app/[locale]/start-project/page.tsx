import React from 'react';
import type { Metadata } from 'next';
import { Locale, UI_STRINGS } from '@/data/translations';
import { StartProjectForm } from '@/components/StartProjectForm';
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
    path: '/start-project',
    title: isFa ? 'شروع همکاری و سفارش پروژه' : 'Initiate Project & Scope Assessment',
    description: isFa
      ? 'فرم هوشمند دریافت نیازمندی‌ها، انتخاب پلتفرم واقعیت مجازی/افزوده و زمان‌بندی پروژه در استودیو MIGO.'
      : 'Interactive project onboarding and scoping wizard for VR/MR simulations, WebAR, and turnkey exhibition tech.',
  });
}

export default function StartProjectPage({ params }: { params: { locale: Locale } }) {
  const locale = params.locale === 'en' ? 'en' : 'fa';
  const isRtl = locale === 'fa';

  const breadcrumbs = getBreadcrumbSchema(locale, [
    { name: isRtl ? 'صفحه اصلی' : 'Home', path: '/' },
    { name: UI_STRINGS.startProjectTitle[locale], path: '/start-project' },
  ]);

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <StructuredData id="start-project-breadcrumbs" data={breadcrumbs} />

      {/* Header */}
      <div className="max-w-3xl mx-auto text-center space-y-4">
        <div className="inline-block px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider text-brand-orange bg-brand-orange/10 border border-brand-orange/20">
          {isRtl ? 'مسیر آغاز همکاری' : 'Project Onboarding Pipeline'}
        </div>
        <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-white tracking-tight">
          {UI_STRINGS.startProjectTitle[locale]}
        </h1>
        <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed">
          {UI_STRINGS.startProjectSubtitle[locale]}
        </p>
      </div>

      {/* Multi-step Project Wizard */}
      <StartProjectForm />
    </div>
  );
}
