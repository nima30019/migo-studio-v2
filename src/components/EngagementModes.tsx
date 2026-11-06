'use client';

import React from 'react';
import Link from 'next/link';
import { Calendar, Cpu, Landmark, CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';
import { useDirection } from './direction/DirectionProvider';
import { SpotlightCard } from './SpotlightCard';
import { DirectionAwareArrow } from './direction/DirectionAwareArrow';
import { useAudio } from './AudioController';

export function EngagementModes() {
  const { locale, isRtl } = useDirection();
  const { playClick, playHover } = useAudio();

  const modes = [
    {
      id: 'event-activation',
      badge: { en: 'Rapid Turnaround', fa: 'تحویل و استقرار سریع' },
      title: {
        en: 'Exhibition & Event Activation',
        fa: 'اکتیویشن و بازی‌های رویدادی',
      },
      duration: { en: '3 to 7 Days Expo', fa: 'نمایشگاه‌های ۳ تا ۷ روزه' },
      desc: {
        en: 'Turnkey interactive crowd magnets engineered for high-density trade shows and corporate conventions. Deployed in days with guaranteed local offline reliability and automated lead capture.',
        fa: 'راهکارهای تعاملی و پرانرژی برای شلوغ‌ترین غرفه‌های نمایشگاهی و همایش‌ها؛ تحویل سریع در چند روز با عملکرد ۱۰۰٪ آفلاین، لیدربورد زنده و ثبت خودکار لیدهای تجاری.',
      },
      icon: Calendar,
      accentColor: 'text-brand-orange',
      badgeBg: 'bg-brand-orange/10 border-brand-orange/30 text-brand-orange',
      deliverables: {
        en: [
          'Pre-tested game engines tailored with your brand identity and 3D assets',
          'Instant lead gate syncing visitor phone numbers directly to CRM/SMS',
          'Local offline caching (zero risk of venue Wi-Fi drops or latency)',
          'Complete turnkey delivery: on-site hardware mounting and expo standby',
        ],
        fa: [
          'موتورهای بازی آزمایش‌شده و سفارشی‌سازی‌شده طبق رنگ، لوگو و کاراکتر برند شما',
          'دروازه ثبت لید آنی با ذخیره شماره موبایل و ارسال پیامک خودکار به بازدیدکننده',
          'اجرای ۱۰۰٪ محلی و آفلاین (بدون وابستگی به اینترنت ناپایدار سالن نمایشگاه)',
          'تحویل ترن‌کی در محل: نصب سنسورها، کالیبراسیون و حضور کارشناس پشتیبان در ایام رویداد',
        ],
      },
      ctaText: { en: 'Book Exhibition Activation', fa: 'سفارش اکتیویشن نمایشگاهی' },
      ctaHref: `/${locale}/start-project?mode=event`,
    },
    {
      id: 'custom-innovation',
      badge: { en: 'Bespoke Engineering', fa: 'مهندسی کاملاً اختصاصی' },
      title: {
        en: 'Custom Innovation & R&D',
        fa: 'پروژه‌های سفارشی و R&D',
      },
      duration: { en: '4 to 12 Weeks', fa: 'پروژه‌های ۴ تا ۱۲ هفته' },
      desc: {
        en: 'Zero-template creative engineering for flagship marketing campaigns, hazardous industrial training simulators, and multi-sensor kinetic spaces designed from scratch.',
        fa: 'مهندسی اختصاصی نرم‌افزار و سخت‌افزار برای کمپین‌های شاخص، شبیه‌سازهای صنعتی HSE، دوقلوهای دیجیتال و اینستالیشن‌های حرکتی چندسنسوره بدون استفاده از قالب‌های آماده.',
      },
      icon: Cpu,
      accentColor: 'text-cyan-400',
      badgeBg: 'bg-cyan-950/70 border-cyan-400/40 text-cyan-300',
      deliverables: {
        en: [
          'Custom physics loops, GLSL mathematical shaders, and 60+ FPS web builds',
          'Multi-sensor fusion: LiDAR laser curtains, Azure Kinect, and RealSense',
          'Millimeter-accurate VR/MR spatial simulation for high-risk operations',
          'Full intellectual property transfer, technical source files, and QA docs',
        ],
        fa: [
          'کدنویسی موتور فیزیک اختصاصی، شیدرهای ریاضی GLSL و بهینه‌سازی ۶۰+ فریم وب',
          'تلفیق چند سنسور: پرده‌های لیزری لایدار، دوربین‌های کینکت و کنترلرهای فیزیکی',
          'شبیه‌سازی فضایی واقعیت مجازی با دقت میلی‌متری برای مانورهای بحرانی و آموزش پرسنل',
          'انتقال کامل مالکیت معنوی، سورس‌کدهای نرم‌افزار و مستندات معماری سیستم',
        ],
      },
      ctaText: { en: 'Initiate R&D Inquiry', fa: 'درخواست امکان‌سنجی و R&D' },
      ctaHref: `/${locale}/start-project?mode=custom`,
    },
    {
      id: 'permanent-installation',
      badge: { en: 'Permanent Architecture', fa: 'چیدمان دائمی و شوروم' },
      title: {
        en: 'Permanent Showrooms & Museums',
        fa: 'چیدمان‌های دائمی معماری و موزه',
      },
      duration: { en: 'Long-Term / 24/7 Autonomy', fa: 'پایداری مداوم شبانه‌روزی' },
      desc: {
        en: 'Enduring interactive architecture for corporate flagship centers, science discovery museums, luxury showrooms, and commercial atriums engineered for continuous years of operation.',
        fa: 'معماری تعاملی ماندگار برای شوروم‌های لوکس سازمانی، موزه‌های علمی و تاریخی و لابی‌های مدرن که برای سال‌ها کارکرد بی‌وقفه بدون استهلاک طراحی می‌شوند.',
      },
      icon: Landmark,
      accentColor: 'text-purple-400',
      badgeBg: 'bg-purple-950/70 border-purple-400/40 text-purple-300',
      deliverables: {
        en: [
          'Multi-projector edge blending, transparent touch displays, and LED walls',
          'Autonomous kiosk watchdog architecture with remote telemetry monitoring',
          'Ultra-rugged industrial hardware specification built for high foot-traffic wear',
          'Scheduled maintenance contracts, content CMS updates, and 24/7 SLA support',
        ],
        fa: [
          'ویدیو مپینگ چندکاناله، نمایشگرهای لمسی شفاف و دیوارهای عظیم LED',
          'معماری نرم‌افزاری Watchdog خودکار با پایش از راه دور و بازیابی سلامت کیوسک',
          'تامین قطعات صنعتی فوق‌مقاوم مناسب برای استهلاک مداوم صدها بازدیدکننده روزانه',
          'قراردادهای نگهداری دوره‌ای، به‌روزرسانی پنل محتوا (CMS) و پشتیبانی SLA',
        ],
      },
      ctaText: { en: 'Consult for Permanent Space', fa: 'مشاوره چیدمان دائمی' },
      ctaHref: `/${locale}/start-project?mode=permanent`,
    },
  ];

  return (
    <section className="space-y-10">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider text-brand-orange bg-brand-orange/10 border border-brand-orange/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isRtl ? 'مدل‌های همکاری با استودیو' : 'Modes of Engagement'}</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            {isRtl ? 'سه روش متمایز برای همکاری با استودیو MIGO' : 'Three Tailored Ways to Work with MIGO'}
          </h2>
          <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
            {isRtl
              ? 'چه به دنبال یک بازی مگنت پرانرژی برای غرفه نمایشگاهی ۴ روزه باشید، چه یک پروژه اختصاصی R&D یا چیدمان دائمی موزه، معماری اجرایی متناسب با بودجه و زمان‌بندی شما آماده است.'
              : 'Whether you require a high-energy crowd magnet for a 4-day trade show, a ground-up R&D breakthrough, or a permanent museum centerpiece, we have an engineered delivery pipeline.'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {modes.map((mode) => {
          const Icon = mode.icon;
          return (
            <SpotlightCard
              key={mode.id}
              className="p-8 flex flex-col justify-between border-white/[0.08] hover:border-white/[0.18] bg-gradient-to-b from-[#0F1219] to-[#080A0E] transition-all"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-2xl bg-white/[0.04] border border-white/[0.08] ${mode.accentColor}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-mono font-semibold border ${mode.badgeBg}`}>
                    {mode.badge[locale]}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="text-xs font-mono text-neutral-400">
                    // {mode.duration[locale]}
                  </div>
                  <h3 className="font-display font-bold text-2xl text-white">
                    {mode.title[locale]}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                    {mode.desc[locale]}
                  </p>
                </div>

                <div className="pt-2 space-y-3 border-t border-white/[0.06]">
                  <div className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-wider">
                    {isRtl ? 'خروجی‌های کلیدی این پکیج:' : 'Key Deliverables:'}
                  </div>
                  <ul className="space-y-2.5">
                    {mode.deliverables[locale].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-neutral-300 leading-relaxed font-light">
                        <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${mode.accentColor}`} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-8">
                <Link
                  href={mode.ctaHref}
                  onClick={playClick}
                  onMouseEnter={playHover}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-white/[0.06] hover:bg-brand-orange hover:text-white border border-white/[0.1] hover:border-brand-orange transition-all duration-300 group shadow-sm"
                >
                  <span>{mode.ctaText[locale]}</span>
                  <DirectionAwareArrow type="arrow" className="w-4 h-4 ltr:group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                </Link>
              </div>
            </SpotlightCard>
          );
        })}
      </div>
    </section>
  );
}
