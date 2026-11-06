import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Sparkles,
  Zap,
  Activity,
  ShieldCheck,
} from 'lucide-react';
import { Locale, UI_STRINGS } from '@/data/translations';
import { SERVICES } from '@/data/services';
import { PROJECTS } from '@/data/projects';
import { LAB_EXPERIMENTS } from '@/data/lab';
import { ARTICLES } from '@/data/articles';
import { HeroV2 } from '@/components/HeroV2';
import { ServiceCard } from '@/components/ServiceCard';
import { ProjectCard } from '@/components/ProjectCard';
import { LabCard } from '@/components/LabCard';
import { DirectionAwareArrow } from '@/components/direction/DirectionAwareArrow';
import { SpotlightCard } from '@/components/SpotlightCard';
import { EngagementModes } from '@/components/EngagementModes';
import { createLocalizedMetadata } from '@/utils/seo';

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
      ? 'خلق تجربیات تعاملی و واقعیت مجازی'
      : 'Interactive Realities & Spatial XR',
    description: isFa
      ? 'استودیو فناوری خلاق MIGO؛ پیشگام در توسعه واقعیت مجازی (VR/MR)، واقعیت افزوده وب (WebAR)، فناوری‌های تعاملی نمایشگاهی، بازی‌سازی و شبیه‌سازی‌های پیشرفته سه‌بعدی.'
      : 'MIGO Creative Technology Studio engineers spatial computing, high-fidelity VR/MR, WebAR, kinetic exhibition walls, and simulation engines.',
  });
}

export default function HomePage({ params }: { params: { locale: Locale } }) {
  const locale = params.locale === 'en' ? 'en' : 'fa';
  const isRtl = locale === 'fa';

  const featuredProjects = PROJECTS.filter((p) => p.featured).slice(0, 3);
  const featuredLab = LAB_EXPERIMENTS.slice(0, 3);
  const latestArticles = ARTICLES.slice(0, 3);

  const marqueeKeywords = [
    'SPATIAL COMPUTING (VR/MR)',
    'ZERO-INSTALL WEBAR',
    'KINETIC EXHIBITION WALLS',
    'SERIOUS GAMES & SIMULATION',
    'TOUCHDESIGNER & LIDAR',
    'PHOTOREAL 3D CONFIGURATORS',
    'REAL-TIME GPU SHADERS',
    'UNREAL ENGINE 5 & UNITY',
    'PHYSICAL SENSOR INTEGRATION',
    'HIGH-PRECISION DIGITAL TWINS',
  ];

  return (
    <div className="space-y-24 sm:space-y-32 pb-24">
      {/* 1. Hero Experience */}
      <HeroV2 />

      {/* 2. Selected Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 sm:mb-16 gap-4">
          <div className="max-w-2xl">
            <div className="inline-block px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider text-brand-orange bg-brand-orange/10 border border-brand-orange/20 mb-3">
              {isRtl ? 'پروژه‌های اجرایی' : 'Selected Projects'}
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white">
              {UI_STRINGS.selectedWork[locale]}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-neutral-300 font-light">
              {UI_STRINGS.selectedWorkDesc[locale]}
            </p>
          </div>

          <Link
            href={`/${locale}/work`}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-orange hover:text-white transition-colors"
          >
            <span>{UI_STRINGS.viewAllWork[locale]}</span>
            <DirectionAwareArrow type="arrow" className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      {/* 3. Services Overview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 sm:mb-16 gap-4">
          <div className="max-w-2xl">
            <div className="inline-block px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider text-brand-orange bg-brand-orange/10 border border-brand-orange/20 mb-3">
              {isRtl ? 'زمینه‌های فعالیت و خدمات تخصصی' : 'Specialized Capabilities'}
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white">
              {UI_STRINGS.whatWeDo[locale]}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-neutral-300 font-light">
              {UI_STRINGS.whatWeDoDesc[locale]}
            </p>
          </div>

          <Link
            href={`/${locale}/services`}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-orange hover:text-white transition-colors"
          >
            <span>{isRtl ? 'مشاهده همه خدمات' : 'Explore All Services'}</span>
            <DirectionAwareArrow type="arrow" className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SERVICES.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      {/* 4. Interactive Capabilities */}
      <div className="space-y-12">
        <div className="w-full overflow-hidden border-y border-white/[0.08] bg-[#090B0F]/90 py-4 relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#090B0F] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#090B0F] to-transparent z-10 pointer-events-none" />
          <div className="flex w-max animate-marquee gap-8 items-center text-xs sm:text-sm font-mono font-bold tracking-widest text-neutral-400">
            <div className="flex items-center gap-8">
              {marqueeKeywords.map((word, i) => (
                <span key={`original-${i}`} className="flex items-center gap-3">
                  <span className="text-white hover:text-brand-orange transition-colors">
                    {word}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
                </span>
              ))}
            </div>
            <div className="flex items-center gap-8" aria-hidden="true">
              {marqueeKeywords.map((word, i) => (
                <span key={`clone-${i}`} className="flex items-center gap-3">
                  <span className="text-white hover:text-brand-orange transition-colors">
                    {word}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <SpotlightCard className="p-6 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl sm:text-4xl font-extrabold font-mono text-white">60 / 120</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-brand-orange/10 text-brand-orange border border-brand-orange/20">
                  FPS
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-neutral-300">
                <Zap className="w-4 h-4 text-brand-orange shrink-0" />
                <span>{isRtl ? 'نرخ فریم ریل‌تایم پایدار' : 'Locked Real-Time Framerate'}</span>
              </div>
            </SpotlightCard>

            <SpotlightCard className="p-6 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl sm:text-4xl font-extrabold font-mono text-white">&lt; 4.5</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-cyan-400/10 text-cyan-400 border border-cyan-400/20">
                  MB
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-neutral-300">
                <Activity className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{isRtl ? 'حجم بهینه بدون نصب WebAR' : 'Zero-Install WebAR Payload'}</span>
              </div>
            </SpotlightCard>

            <SpotlightCard className="p-6 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl sm:text-4xl font-extrabold font-mono text-white">100%</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-400/10 text-emerald-400 border border-emerald-400/20">
                  Turnkey
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-neutral-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{isRtl ? 'سخت‌افزار و نرم‌افزار یکپارچه' : 'Hardware + Software Turnkey'}</span>
              </div>
            </SpotlightCard>

            <SpotlightCard className="p-6 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl sm:text-4xl font-extrabold font-mono text-white">0</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-purple-400/10 text-purple-400 border border-purple-400/20">
                  Risk
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-neutral-300">
                <Sparkles className="w-4 h-4 text-purple-400 shrink-0" />
                <span>{isRtl ? 'حذف خطرات جانی در شبیه‌سازی' : 'Zero Hazard Virtual Drills'}</span>
              </div>
            </SpotlightCard>
          </div>
        </div>
      </div>

      {/* 4.5. Modes of Engagement (Inspired by Freakuency & Bora Studios) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <EngagementModes />
      </section>

      {/* 5. Experiments Lab Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SpotlightCard className="p-8 sm:p-12 border-cyan-500/30 bg-gradient-to-b from-[#09101A] to-[#07080B] shadow-[0_0_50px_rgba(0,242,254,0.1)]">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-10 pb-8 border-b border-white/[0.08]">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-400/40 text-xs font-mono text-cyan-300">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span>R&D EXPERIMENTAL LAB</span>
              </div>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-white">
                {UI_STRINGS.labHeadline[locale]}
              </h2>
              <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
                {UI_STRINGS.labDesc[locale]}
              </p>
            </div>

            <Link
              href={`/${locale}/lab`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold text-black bg-cyan-300 hover:bg-cyan-200 transition-all shadow-[0_0_20px_rgba(0,242,254,0.4)]"
            >
              <span>{UI_STRINGS.exploreLab[locale]}</span>
              <DirectionAwareArrow type="arrow" className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredLab.map((exp) => (
              <LabCard key={exp.id} experiment={exp} />
            ))}
          </div>
        </SpotlightCard>
      </section>

      {/* 6. Studio Introduction */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SpotlightCard className="p-8 sm:p-14 border-white/[0.08] bg-gradient-to-br from-[#0B0E14] via-[#090C11] to-[#07090D] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl pointer-events-none" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider text-brand-orange bg-brand-orange/10 border border-brand-orange/20">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isRtl ? 'درباره استودیو MIGO' : 'The Creative Technology Studio'}</span>
              </div>
              <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
                {isRtl
                  ? 'خلق تجربیات مدرن با گرافیک سه‌بعدی و تعاملی'
                  : 'Bridging Spatial Architecture & Real-Time Graphics'}
              </h2>
              <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
                {isRtl
                  ? 'استودیو فناوری خلاق MIGO؛ طراح و مجری تجربیات تعاملی، واقعیت مجازی و سازه‌های هوشمند نمایشگاهی است. ما با ترکیب هنر سه‌بعدی، برنامه‌نویسی نرم‌افزار و سنسورهای تعاملی، فاصله میان دنیای فیزیکی و ایده‌های نوآورانه برندها را پر می‌کنیم.'
                  : 'MIGO is an independent creative technology studio engineering immersive VR/MR environments, lightweight zero-install WebAR, and sensory exhibition architecture. We fuse hardware sensor engineering with cutting-edge real-time 3D pipelines.'}
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {[
                  'Unreal Engine 5',
                  'Unity Spatial XR',
                  'WebGPU / Three.js',
                  'TouchDesigner',
                  'LiDAR & Computer Vision',
                  'Physical Sensors',
                ].map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-mono px-3 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-neutral-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="pt-4">
                <Link
                  href={`/${locale}/about`}
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold text-white bg-white/[0.08] hover:bg-brand-orange hover:text-white border border-white/[0.12] transition-all"
                >
                  <span>{isRtl ? 'درباره فلسفه و متدولوژی مهندسی ما' : 'Discover Studio Philosophy & Approach'}</span>
                  <DirectionAwareArrow type="arrow" className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-[#0F131D]/80 border border-white/[0.06] space-y-2">
                <span className="font-mono text-3xl font-extrabold text-brand-orange">4+</span>
                <h4 className="font-display font-bold text-sm text-white">
                  {isRtl ? 'حوزه تخصصی عمیق' : 'Core Disciplines'}
                </h4>
                <p className="text-xs text-neutral-400 font-light leading-relaxed">
                  {isRtl ? 'واقعیت مجازی، وب سه‌بعدی، بازی‌سازی و سازه‌های تعاملی' : 'Spatial computing, Web3D, gaming & interactive spaces'}
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-[#0F131D]/80 border border-white/[0.06] space-y-2">
                <span className="font-mono text-3xl font-extrabold text-cyan-400">100%</span>
                <h4 className="font-display font-bold text-sm text-white">
                  {isRtl ? 'کدنویسی درون‌استودیویی' : 'In-House Production'}
                </h4>
                <p className="text-xs text-neutral-400 font-light leading-relaxed">
                  {isRtl ? 'تمام مراحل توسط تیم داخلی انجام می‌شود؛ بدون واسطه و با تضمین کیفیت' : 'Zero outsourcing, total control over framerate and hardware'}
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-[#0F131D]/80 border border-white/[0.06] space-y-2">
                <span className="font-mono text-3xl font-extrabold text-emerald-400">&lt;5MB</span>
                <h4 className="font-display font-bold text-sm text-white">
                  {isRtl ? 'بهینه‌سازی وب' : 'Ultra-Light Payloads'}
                </h4>
                <p className="text-xs text-neutral-400 font-light leading-relaxed">
                  {isRtl ? 'اجرای سبک و باز شدن آنی در مرورگر موبایل بدون معطلی' : 'Compressed textures & Draco geometry'}
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-[#0F131D]/80 border border-white/[0.06] space-y-2">
                <span className="font-mono text-3xl font-extrabold text-purple-400">24/7</span>
                <h4 className="font-display font-bold text-sm text-white">
                  {isRtl ? 'پایداری نمایشگاهی' : 'Hardware Telemetry'}
                </h4>
                <p className="text-xs text-neutral-400 font-light leading-relaxed">
                  {isRtl ? 'کارکرد مداوم، بدون قطعی و پایش هوشمند تجهیزات در طول رویداد' : 'Remote kiosk monitoring & watchdog auto-recovery'}
                </p>
              </div>
            </div>
          </div>
        </SpotlightCard>
      </section>

      {/* 7. Selected Insights */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-block px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider text-brand-orange bg-brand-orange/10 border border-brand-orange/20 mb-3">
              {isRtl ? 'یادداشت‌های فنی و مقالات' : 'Engineering Insights'}
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white">
              {UI_STRINGS.insightsHeadline[locale]}
            </h2>
          </div>

          <Link
            href={`/${locale}/insights`}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-orange hover:text-white transition-colors"
          >
            <span>{isRtl ? 'مشاهده تمام مقالات' : 'View All Articles'}</span>
            <DirectionAwareArrow type="arrow" className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestArticles.map((art) => (
            <SpotlightCard key={art.id} className="p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-3">
                  <span className="text-brand-orange">{art.category[locale]}</span>
                  <span>{art.readTime[locale]}</span>
                </div>
                <h3 className="font-display font-bold text-lg text-white mb-3 hover:text-brand-orange transition-colors">
                  <Link href={`/${locale}/insights/${art.slug}`}>
                    {art.title[locale]}
                  </Link>
                </h3>
                <p className="text-xs text-neutral-300 font-light leading-relaxed mb-6 line-clamp-3">
                  {art.excerpt[locale]}
                </p>
              </div>

              <Link
                href={`/${locale}/insights/${art.slug}`}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-white hover:text-brand-orange transition-colors"
              >
                <span>{UI_STRINGS.readArticle[locale]}</span>
                <DirectionAwareArrow type="arrow" className="w-3.5 h-3.5" />
              </Link>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* 8. Final Architectural CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SpotlightCard className="p-8 sm:p-16 text-center space-y-6 relative overflow-hidden bg-gradient-to-b from-[#121622] to-[#0A0C10]">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-tight">
              {UI_STRINGS.finalCtaHeadline[locale]}
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
              {UI_STRINGS.finalCtaDesc[locale]}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href={`/${locale}/start-project`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-bold text-white bg-brand-orange hover:bg-brand-orange-hover shadow-glow-orange hover:shadow-glow-orange-lg hover:scale-105 active:scale-95 transition-all"
            >
              <span>{UI_STRINGS.startProject[locale]}</span>
              <DirectionAwareArrow type="up-right" className="w-4 h-4" />
            </Link>

            <Link
              href={`/${locale}/contact`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-bold text-neutral-200 bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] transition-all"
            >
              <span>{UI_STRINGS.contactUs[locale]}</span>
            </Link>
          </div>
        </SpotlightCard>
      </section>
    </div>
  );
}
