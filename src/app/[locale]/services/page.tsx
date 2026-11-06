import React from 'react';
import type { Metadata } from 'next';
import { Locale, UI_STRINGS } from '@/data/translations';
import { SERVICES } from '@/data/services';
import { ServiceCard } from '@/components/ServiceCard';
import { StructuredData } from '@/components/StructuredData';
import { EventPackageBuilder } from '@/components/EventPackageBuilder';
import { EngagementModes } from '@/components/EngagementModes';
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
    path: '/services',
    title: isFa ? 'خدمات تخصصی و حوزه‌های فعالیت' : 'Specialized Services & Capabilities',
    description: isFa
      ? 'خدمات استودیو فناوری خلاق MIGO شامل توسعه واقعیت مجازی (VR/MR)، واقعیت افزوده وب (WebAR)، فناوری‌های تعاملی نمایشگاهی، بازی‌سازی و شبیه‌سازی صنعتی.'
      : 'Explore MIGO Studio engineering services across Virtual Reality, WebAR, Kinetic Exhibition Walls, Serious Games, and 3D Visualizations.',
  });
}

export default function ServicesPage({ params }: { params: { locale: Locale } }) {
  const locale = params.locale === 'en' ? 'en' : 'fa';
  const isRtl = locale === 'fa';

  const breadcrumbSchema = getBreadcrumbSchema(locale, [
    { name: isRtl ? 'صفحه اصلی' : 'Home', path: '/' },
    { name: UI_STRINGS.whatWeDo[locale], path: '/services' },
  ]);

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
      <StructuredData id="services-breadcrumbs" data={breadcrumbSchema} />

      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-block px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider text-brand-orange bg-brand-orange/10 border border-brand-orange/20">
          {isRtl ? 'حوزه‌های مهندسی خلاق' : 'Engineering Capabilities'}
        </div>
        <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-white tracking-tight">
          {UI_STRINGS.whatWeDo[locale]}
        </h1>
        <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed">
          {UI_STRINGS.whatWeDoDesc[locale]}
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {SERVICES.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>

      {/* Interactive Event Tech Package Builder (Inspired by United Games XR & Peek & Poke) */}
      <div className="pt-8 border-t border-white/[0.08]">
        <EventPackageBuilder />
      </div>

      {/* Three Modes of Engagement (Inspired by Freakuency & Bora Studios) */}
      <div className="pt-8 border-t border-white/[0.08]">
        <EngagementModes />
      </div>
    </div>
  );
}
