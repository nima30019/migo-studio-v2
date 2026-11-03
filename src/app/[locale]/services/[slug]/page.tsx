import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  Glasses,
  Scan,
  Gamepad2,
  Sparkles,
  Box,
  Cpu,
  CheckCircle2,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react';
import { Locale, UI_STRINGS } from '@/data/translations';
import { SERVICES, ServiceItem } from '@/data/services';
import { StructuredData } from '@/components/StructuredData';
import { SpotlightCard } from '@/components/SpotlightCard';
import { DirectionAwareArrow } from '@/components/direction/DirectionAwareArrow';
import {
  getBreadcrumbSchema,
  getServiceSchema,
  getFaqSchema,
} from '@/utils/schema';
import { createLocalizedMetadata } from '@/utils/seo';

const ICON_MAP: Record<string, LucideIcon> = {
  Glasses,
  Scan,
  Gamepad2,
  Sparkles,
  Box,
  Cpu,
};

function findService(slug: string) {
  return SERVICES.find((s) => s.slug === slug || s.aliases?.includes(slug));
}

export function generateStaticParams() {
  const locales: Locale[] = ['fa', 'en'];
  const params: Array<{ locale: Locale; slug: string }> = [];
  for (const locale of locales) {
    for (const service of SERVICES) {
      params.push({ locale, slug: service.slug });
      if (service.aliases) {
        for (const alias of service.aliases) {
          params.push({ locale, slug: alias });
        }
      }
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale; slug: string };
}): Promise<Metadata> {
  const service = findService(params.slug);
  if (!service) return {};

  return createLocalizedMetadata({
    locale: params.locale,
    path: `/services/${service.slug}`,
    title: service.title[params.locale],
    description: service.shortDescription[params.locale],
  });
}

export default function ServiceDetailPage({
  params,
}: {
  params: { locale: Locale; slug: string };
}) {
  const locale = params.locale === 'en' ? 'en' : 'fa';
  const isRtl = locale === 'fa';

  const service = findService(params.slug);
  if (!service) notFound();

  const IconComponent = ICON_MAP[service.icon] || Sparkles;

  const breadcrumbs = getBreadcrumbSchema(locale, [
    { name: isRtl ? 'صفحه اصلی' : 'Home', path: '/' },
    { name: UI_STRINGS.whatWeDo[locale], path: '/services' },
    { name: service.title[locale], path: `/services/${service.slug}` },
  ]);

  const serviceSchema = getServiceSchema(locale, service);
  const faqSchema = getFaqSchema(locale, service.faqs);

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
      <StructuredData id="service-breadcrumbs" data={breadcrumbs} />
      <StructuredData id="service-schema" data={serviceSchema} />
      <StructuredData id="service-faq-schema" data={faqSchema} />

      {/* Hero Header */}
      <div className="max-w-4xl space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/30 text-xs font-mono text-brand-orange">
          <IconComponent className="w-4 h-4" />
          <span>{service.badge[locale]}</span>
        </div>

        <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-tight">
          {service.title[locale]}
        </h1>

        <p className="text-lg sm:text-xl text-neutral-300 font-light leading-relaxed">
          {service.overview[locale]}
        </p>

        <div className="pt-2">
          <Link
            href={`/${locale}/start-project`}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-white bg-brand-orange hover:bg-brand-orange-hover shadow-glow-orange transition-all text-sm"
          >
            <span>{isRtl ? 'استعلام فنی و سفارش این خدمت' : 'Request Architecture Consultation'}</span>
            <DirectionAwareArrow type="up-right" className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Capabilities & Specifications */}
      <section className="space-y-8">
        <div className="space-y-2">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">
            {UI_STRINGS.capabilities[locale]}
          </h2>
          <p className="text-sm text-neutral-400 font-light">
            {isRtl ? 'مشخصات فنی و استانداردهای پیاده‌سازی' : 'Engineered Deliverables & Benchmarks'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {service.capabilities[locale].map((cap, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl bg-[#0C0E14] border border-white/[0.08] flex items-start gap-3.5"
            >
              <CheckCircle2 className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
              <span className="text-sm text-neutral-200 leading-relaxed">{cap}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Real-world Use Cases */}
      <section className="space-y-8">
        <div className="space-y-2">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">
            {UI_STRINGS.useCases[locale]}
          </h2>
          <p className="text-sm text-neutral-400 font-light">
            {isRtl ? 'نمونه کاربردهای عملیاتی در صنایع مختلف' : 'Enterprise & Industrial Applications'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {service.useCases.map((uc, i) => (
            <SpotlightCard key={i} className="p-6 flex flex-col justify-between">
              <div>
                <h3 className="font-display font-bold text-lg text-white mb-2.5">
                  {uc.title[locale]}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                  {uc.desc[locale]}
                </p>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* Technologies Stack */}
      <section className="p-8 rounded-3xl bg-[#0A0D13] border border-white/[0.08] space-y-6">
        <h2 className="font-display font-bold text-xl sm:text-2xl text-white">
          {UI_STRINGS.technologiesUsed[locale]}
        </h2>
        <div className="flex flex-wrap gap-2.5">
          {service.technologies.map((tech, i) => (
            <span
              key={i}
              className="px-4 py-2 rounded-xl bg-white/[0.05] border border-white/[0.1] text-xs font-mono text-neutral-200"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* Technical FAQ Accordion */}
      {service.faqs.length > 0 && (
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">
              {UI_STRINGS.faq[locale]}
            </h2>
          </div>

          <div className="space-y-4">
            {service.faqs.map((faq, i) => (
              <details
                key={i}
                className="group rounded-2xl bg-[#0C0E14] border border-white/[0.08] p-5 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer items-center justify-between text-base font-bold text-white hover:text-brand-orange transition-colors">
                  <span>{faq.q[locale]}</span>
                  <span className="shrink-0 font-mono text-brand-orange text-lg transition duration-300 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-sm text-neutral-300 leading-relaxed font-light pt-3 border-t border-white/[0.06]">
                  {faq.a[locale]}
                </p>
              </details>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
