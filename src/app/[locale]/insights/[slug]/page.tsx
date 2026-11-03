import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Calendar, Clock, User, ArrowRight } from 'lucide-react';
import { Locale, UI_STRINGS } from '@/data/translations';
import { ARTICLES } from '@/data/articles';
import { StructuredData } from '@/components/StructuredData';
import { DirectionAwareArrow } from '@/components/direction/DirectionAwareArrow';
import { getBreadcrumbSchema, getArticleSchema } from '@/utils/schema';
import { createLocalizedMetadata } from '@/utils/seo';

export function generateStaticParams() {
  const locales: Locale[] = ['fa', 'en'];
  const params: Array<{ locale: Locale; slug: string }> = [];
  for (const locale of locales) {
    for (const article of ARTICLES) {
      params.push({ locale, slug: article.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale; slug: string };
}): Promise<Metadata> {
  const article = ARTICLES.find((a) => a.slug === params.slug);
  if (!article) return {};

  return createLocalizedMetadata({
    locale: params.locale,
    path: `/insights/${article.slug}`,
    title: article.title[params.locale],
    description: article.excerpt[params.locale],
    type: 'article',
  });
}

export default function ArticleDetailPage({
  params,
}: {
  params: { locale: Locale; slug: string };
}) {
  const locale = params.locale === 'en' ? 'en' : 'fa';
  const isRtl = locale === 'fa';

  const article = ARTICLES.find((a) => a.slug === params.slug);
  if (!article) notFound();

  const breadcrumbs = getBreadcrumbSchema(locale, [
    { name: isRtl ? 'صفحه اصلی' : 'Home', path: '/' },
    { name: UI_STRINGS.insightsHeadline[locale], path: '/insights' },
    { name: article.title[locale], path: `/insights/${article.slug}` },
  ]);

  const articleSchema = getArticleSchema(locale, article);

  return (
    <article className="pt-32 pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <StructuredData id="article-breadcrumbs" data={breadcrumbs} />
      <StructuredData id="article-schema" data={articleSchema} />

      {/* Article Header */}
      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-neutral-400">
          <span className="px-3 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/30 text-brand-orange font-semibold">
            {article.category[locale]}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-brand-orange" />
            {article.date}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-brand-orange" />
            {article.readTime[locale]}
          </span>
          <span className="flex items-center gap-1">
            <User className="w-3.5 h-3.5 text-brand-orange" />
            {article.author}
          </span>
        </div>

        <h1 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight">
          {article.title[locale]}
        </h1>

        <p className="text-lg sm:text-xl text-neutral-300 font-light leading-relaxed border-s-2 border-brand-orange ps-4">
          {article.excerpt[locale]}
        </p>
      </div>

      {/* Main Content Blocks */}
      <div className="pt-6 border-t border-white/[0.08] space-y-10 text-neutral-200 text-base sm:text-lg leading-relaxed font-light">
        {article.content[locale].map((section, idx) => (
          <section key={idx} className="space-y-4">
            {section.heading && (
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-white pt-2">
                {section.heading}
              </h2>
            )}
            {section.paragraphs.map((p, pIdx) => (
              <p key={pIdx} className="leading-relaxed">
                {p}
              </p>
            ))}
          </section>
        ))}
      </div>

      {/* Tags */}
      <div className="pt-8 border-t border-white/[0.08] flex flex-wrap gap-2">
        {article.tags.map((tag, i) => (
          <span
            key={i}
            className="px-3 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-neutral-400"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Back Link */}
      <div className="pt-6">
        <Link
          href={`/${locale}/insights`}
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-orange hover:text-white transition-colors"
        >
          <DirectionAwareArrow type="arrow" direction="backward" className="w-4 h-4" />
          <span>{isRtl ? 'بازگشت به مقالات و اخبار' : 'Back to Insights'}</span>
        </Link>
      </div>
    </article>
  );
}
