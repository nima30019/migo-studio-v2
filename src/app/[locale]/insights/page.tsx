import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Locale, UI_STRINGS } from '@/data/translations';
import { ARTICLES } from '@/data/articles';
import { StructuredData } from '@/components/StructuredData';
import { SpotlightCard } from '@/components/SpotlightCard';
import { DirectionAwareArrow } from '@/components/direction/DirectionAwareArrow';
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
    path: '/insights',
    title: isFa ? 'مقالات و پژوهش‌های فنی' : 'Technical Insights & Research',
    description: isFa
      ? 'مقالات تخصصی استودیو MIGO پیرامون آینده واقعیت مجازی، تکنولوژی‌های تعاملی نمایشگاهی، بازی‌های جدی و WebAR.'
      : 'Read technical engineering insights on spatial computing, WebGL performance, VR training architectures, and zero-install WebAR.',
  });
}

export default function InsightsPage({ params }: { params: { locale: Locale } }) {
  const locale = params.locale === 'en' ? 'en' : 'fa';
  const isRtl = locale === 'fa';

  const breadcrumbs = getBreadcrumbSchema(locale, [
    { name: isRtl ? 'صفحه اصلی' : 'Home', path: '/' },
    { name: UI_STRINGS.insightsHeadline[locale], path: '/insights' },
  ]);

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      <StructuredData id="insights-breadcrumbs" data={breadcrumbs} />

      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-block px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider text-brand-orange bg-brand-orange/10 border border-brand-orange/20">
          {isRtl ? 'پژوهش و یادداشت‌های فنی' : 'R&D Editorial'}
        </div>
        <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-white tracking-tight">
          {UI_STRINGS.insightsHeadline[locale]}
        </h1>
        <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed">
          {isRtl
            ? 'تحلیل‌های عمیق مهندسی، تجربیات استقرار و راهنماهای فنی در حوزه رایانش فضایی و تجربیات تعاملی.'
            : 'In-depth architectural postmortems, performance benchmarks, and insights on next-generation spatial computing.'}
        </p>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {ARTICLES.map((article) => (
          <SpotlightCard key={article.id} className="p-7 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-4">
                <span className="px-2.5 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/30 text-brand-orange font-semibold">
                  {article.category[locale]}
                </span>
                <span>{article.readTime[locale]}</span>
              </div>

              <h2 className="font-display font-bold text-xl text-white mb-3 group-hover:text-brand-orange transition-colors">
                <Link href={`/${locale}/insights/${article.slug}`}>
                  {article.title[locale]}
                </Link>
              </h2>

              <p className="text-sm text-neutral-300 font-light leading-relaxed mb-6 line-clamp-3">
                {article.excerpt[locale]}
              </p>
            </div>

            <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs">
              <span className="text-neutral-400 font-mono">{article.author}</span>
              <Link
                href={`/${locale}/insights/${article.slug}`}
                className="inline-flex items-center gap-1.5 font-bold text-white group-hover:text-brand-orange transition-colors"
              >
                <span>{UI_STRINGS.readArticle[locale]}</span>
                <DirectionAwareArrow type="arrow" className="w-3.5 h-3.5" />
              </Link>
            </div>
          </SpotlightCard>
        ))}
      </div>
    </div>
  );
}
