import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { Locale, UI_STRINGS } from '@/data/translations';
import { PROJECTS } from '@/data/projects';
import { StructuredData } from '@/components/StructuredData';
import { SpotlightCard } from '@/components/SpotlightCard';
import { DirectionAwareArrow } from '@/components/direction/DirectionAwareArrow';
import { getBreadcrumbSchema, getCreativeWorkSchema } from '@/utils/schema';
import { createLocalizedMetadata } from '@/utils/seo';

export function generateStaticParams() {
  const locales: Locale[] = ['fa', 'en'];
  const params: Array<{ locale: Locale; slug: string }> = [];
  for (const locale of locales) {
    for (const project of PROJECTS) {
      params.push({ locale, slug: project.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale; slug: string };
}): Promise<Metadata> {
  const project = PROJECTS.find((p) => p.slug === params.slug);
  if (!project) return {};

  return createLocalizedMetadata({
    locale: params.locale,
    path: `/work/${project.slug}`,
    title: project.title[params.locale],
    description: project.shortDescription[params.locale],
  });
}

export default function ProjectDetailPage({
  params,
}: {
  params: { locale: Locale; slug: string };
}) {
  const locale = params.locale === 'en' ? 'en' : 'fa';
  const isRtl = locale === 'fa';

  const project = PROJECTS.find((p) => p.slug === params.slug);
  if (!project) notFound();

  const breadcrumbs = getBreadcrumbSchema(locale, [
    { name: isRtl ? 'صفحه اصلی' : 'Home', path: '/' },
    { name: UI_STRINGS.selectedWork[locale], path: '/work' },
    { name: project.title[locale], path: `/work/${project.slug}` },
  ]);

  const creativeWorkSchema = getCreativeWorkSchema(locale, project);

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
      <StructuredData id="project-breadcrumbs" data={breadcrumbs} />
      <StructuredData id="project-creative-work" data={creativeWorkSchema} />

      {/* Hero Header */}
      <div className="max-w-4xl space-y-6">
        <div className="flex items-center gap-3 text-xs font-mono">
          <span className="px-3 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/30 text-brand-orange font-semibold">
            {project.category[locale]}
          </span>
          <span className="text-neutral-400">{project.clientSample[locale]}</span>
          <span className="text-neutral-400">•</span>
          <span className="text-neutral-400">{project.year}</span>
        </div>

        <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-tight">
          {project.title[locale]}
        </h1>

        <p className="text-lg sm:text-xl text-neutral-300 font-light leading-relaxed">
          {project.fullOverview[locale]}
        </p>
      </div>

      {/* Challenge & Solution Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Challenge */}
        <SpotlightCard className="p-8 space-y-4">
          <h2 className="font-display font-bold text-2xl text-white flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <span>{UI_STRINGS.projectChallenge[locale]}</span>
          </h2>
          <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
            {project.challenge[locale]}
          </p>
        </SpotlightCard>

        {/* Solution */}
        <SpotlightCard className="p-8 space-y-4">
          <h2 className="font-display font-bold text-2xl text-white flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span>{UI_STRINGS.creativeSolution[locale]}</span>
          </h2>
          <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
            {project.solution[locale]}
          </p>
        </SpotlightCard>
      </div>

      {/* Technical Pipeline */}
      <section className="p-8 sm:p-10 rounded-3xl bg-[#0B0E14] border border-white/[0.08] space-y-6">
        <h2 className="font-display font-bold text-2xl text-white">
          {UI_STRINGS.technicalImplementation[locale]}
        </h2>
        <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
          {project.technicalImplementation[locale]}
        </p>

        <div className="pt-4 border-t border-white/[0.06] space-y-3">
          <h3 className="text-xs font-mono uppercase tracking-wider text-brand-orange font-bold">
            {UI_STRINGS.technologiesUsed[locale]}
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, i) => (
              <span
                key={i}
                className="px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-neutral-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Measured Outcomes */}
      <section className="space-y-6">
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">
          {UI_STRINGS.outcomes[locale]}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {project.outcomes[locale].map((outcome, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl bg-[#0C0E15] border border-white/[0.08] flex items-start gap-3"
            >
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <span className="text-xs sm:text-sm text-neutral-200 leading-relaxed font-light">
                {outcome}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Box */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-brand-orange/20 via-transparent to-brand-orange/10 border border-brand-orange/30 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="font-display font-bold text-xl sm:text-2xl text-white mb-1">
            {isRtl ? 'پروژه‌ای مشابه در نظر دارید؟' : 'Planning a Similar Deployment?'}
          </h3>
          <p className="text-xs sm:text-sm text-neutral-300 font-light">
            {isRtl
              ? 'تیم مهندسی MIGO آماده ارائه مشاوره معماری فنی و تحلیل نیازمندی‌هاست.'
              : 'Our engineering leads can provide technical feasibility and preliminary architectural estimates.'}
          </p>
        </div>
        <Link
          href={`/${locale}/start-project`}
          className="px-6 py-3.5 rounded-xl text-xs font-bold text-white bg-brand-orange hover:bg-brand-orange-hover shadow-glow-orange shrink-0 transition-all"
        >
          {UI_STRINGS.startProject[locale]}
        </Link>
      </div>
    </div>
  );
}
