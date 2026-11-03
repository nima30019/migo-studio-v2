import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Sparkles,
  Zap,
  Cpu,
  Layers,
  ShieldCheck,
  MapPin,
  ArrowRight,
} from 'lucide-react';
import { Locale, UI_STRINGS } from '@/data/translations';
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
    path: '/about',
    title: isFa ? 'درباره استودیو فناوری خلاق MIGO' : 'About MIGO Creative Technology Studio',
    description: isFa
      ? 'آشنایی با چشم‌انداز، متدولوژی مهندسی و تیم متخصص استودیو MIGO؛ پیشگام در توسعه واقعیت مجازی، WebAR، بازی‌های جدی و سیستم‌های نمایشگاهی.'
      : 'Learn about MIGO Studio: our engineering philosophy, hybrid team of shader programmers and spatial architects, and turnkey delivery model.',
  });
}

export default function AboutPage({ params }: { params: { locale: Locale } }) {
  const locale = params.locale === 'en' ? 'en' : 'fa';
  const isRtl = locale === 'fa';

  const breadcrumbs = getBreadcrumbSchema(locale, [
    { name: isRtl ? 'صفحه اصلی' : 'Home', path: '/' },
    { name: UI_STRINGS.learnMoreAboutUs[locale], path: '/about' },
  ]);

  const studioPillars = [
    {
      icon: Zap,
      title: { en: 'Performance Obsession', fa: 'وسواس در نرخ فریم و کارایی' },
      desc: {
        en: 'We do not compromise on framerate. Every shader, mesh, and draw call is optimized for locked 60+ FPS to guarantee zero motion sickness in VR.',
        fa: 'ما هرگز بر سر نرخ فریم مصالحه نمی‌کنیم. تمام شیدرها و مش‌ها برای دستیابی به ۶۰+ فریم پایدار جهت حذف کامل حالت تهوع در واقعیت مجازی بهینه‌سازی می‌شوند.',
      },
    },
    {
      icon: Cpu,
      title: { en: 'Sensory Computing & Physical Bridge', fa: 'پل ارتباطی سنسورهای فیزیکی و تصویر' },
      desc: {
        en: 'Bridging software with hardware sensors (LiDAR, Kinect, Depth cams, tactile haptics) to make digital worlds tangible.',
        fa: 'اتصال نرم‌افزار به سنسورهای سخت‌افزاری (لایدار، کینکت، دوربین‌های عمق‌سنج و تاچ فیزیکی) برای ملموس ساختن جهان‌های دیجیتال.',
      },
    },
    {
      icon: ShieldCheck,
      title: { en: 'Autonomous Turnkey Reliability', fa: 'پایداری عملیاتی ۲۴/۷ سامانه‌ها' },
      desc: {
        en: 'Our exhibition kiosks and enterprise training platforms operate autonomously for weeks without crash, reboot, or memory leakage.',
        fa: 'سامانه‌ها و کیوسک‌های نمایشگاهی ما برای هفته‌ها اجرای متوالی بدون نیاز به ریست، بدون افت حافظه و به صورت خودکار فعالیت می‌کنند.',
      },
    },
  ];

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
      <StructuredData id="about-breadcrumbs" data={breadcrumbs} />

      {/* Header & Vision */}
      <div className="max-w-4xl space-y-6">
        <div className="inline-block px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider text-brand-orange bg-brand-orange/10 border border-brand-orange/20">
          {isRtl ? 'هویت و رسالت استودیو' : 'Studio Manifesto'}
        </div>
        <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-tight">
          {UI_STRINGS.aboutPreviewHeadline[locale]}
        </h1>
        <p className="text-lg sm:text-xl text-neutral-300 font-light leading-relaxed">
          {UI_STRINGS.aboutPreviewText[locale]}
        </p>
      </div>

      {/* Core Engineering Pillars */}
      <section className="space-y-8">
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">
          {isRtl ? 'اصول بنیادین مهندسی ما' : 'Our Engineering Pillars'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {studioPillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <SpotlightCard key={i} className="p-8 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.1] text-brand-orange flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-white mb-3">
                    {pillar.title[locale]}
                  </h3>
                  <p className="text-sm text-neutral-300 font-light leading-relaxed">
                    {pillar.desc[locale]}
                  </p>
                </div>
              </SpotlightCard>
            );
          })}
        </div>
      </section>

      {/* Global Capability Banner */}
      <SpotlightCard className="p-8 sm:p-12 border-white/[0.12] bg-[#0A0D14]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-brand-orange">
              <MapPin className="w-4 h-4" />
              <span>{isRtl ? 'مرکز فرماندهی: تهران، ایران' : 'Headquarters: Tehran, Iran'}</span>
            </div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">
              {isRtl
                ? 'استقرار پروژه‌های صنعتی در سطح بین‌المللی'
                : 'Turnkey International Deployment'}
            </h2>
            <p className="text-sm text-neutral-300 font-light leading-relaxed">
              {isRtl
                ? 'تیم مهندسی MIGO پروژه‌ها را به صورت کامل، از شبیه‌سازهای مستقل واقعیت مجازی تا غرفه‌های نمایشگاهی تعاملی در خاورمیانه و سراسر جهان مستقر و پشتیبانی می‌کند.'
                : 'MIGO engineers, delivers, and remotely monitors interactive software, WebAR experiences, and custom exhibition hardware for clients worldwide.'}
            </p>
          </div>

          <div className="flex flex-col items-start sm:items-end justify-center">
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-bold text-white bg-brand-orange hover:bg-brand-orange-hover shadow-glow-orange transition-all"
            >
              <span>{UI_STRINGS.contactUs[locale]}</span>
              <DirectionAwareArrow type="up-right" className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </SpotlightCard>
    </div>
  );
}
