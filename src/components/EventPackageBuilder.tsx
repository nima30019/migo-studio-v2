'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Check,
  Plus,
  Gamepad2,
  Scan,
  Trophy,
  HelpCircle,
  QrCode,
  Glasses,
  Zap,
  Users,
  ShieldCheck,
  Send,
  RotateCcw,
} from 'lucide-react';
import { useDirection } from './direction/DirectionProvider';
import { SpotlightCard } from './SpotlightCard';
import { DirectionAwareArrow } from './direction/DirectionAwareArrow';
import { useAudio } from './AudioController';

interface ModuleOption {
  id: string;
  title: { en: string; fa: string };
  badge: { en: string; fa: string };
  desc: { en: string; fa: string };
  icon: React.ElementType;
  setupDays: number;
  highlightKpi: { en: string; fa: string };
  category: string;
}

export function EventPackageBuilder() {
  const { locale, isRtl } = useDirection();
  const { playClick, playHover, playSuccess } = useAudio();

  const MODULES: ModuleOption[] = [
    {
      id: 'motion-arena',
      title: {
        en: 'Touchless Motion Arena (LiDAR / Kinect)',
        fa: 'بازی‌های حرکتی بدون لمس (سنسور لایدار و کینکت)',
      },
      badge: { en: 'Crowd Magnet', fa: 'جذب جمعیت و شلوغی غرفه' },
      desc: {
        en: 'Visitors control real-time 3D games through full-body movement without touching screens. Ideal for packed exhibition aisles.',
        fa: 'بازدیدکنندگان با حرکات دست و بدن در برابر مانیتور یا دیوار LED بازی می‌کنند، بدون نیاز به دست زدن به صفحه؛ بهترین روش برای جلب توجه رهگذران و شلوغ کردن غرفه.',
      },
      icon: Gamepad2,
      setupDays: 5,
      highlightKpi: { en: '4x Dwell Time', fa: '۴ برابر ماندگاری در غرفه' },
      category: 'motion',
    },
    {
      id: 'fortune-wheel',
      title: {
        en: '3D Fortune Matrix & Lucky Prize Wheel',
        fa: 'گردونه شانس سه‌بعدی و قرعه‌کشی دیجیتال',
      },
      badge: { en: 'High Lead Capture', fa: 'دریافت شماره تماس مخاطبان' },
      desc: {
        en: 'Photorealistic WebGL physics wheel tied to verified mobile phone input and instant automated SMS voucher dispatch.',
        fa: 'یک گردونه شانس سه‌بعدی جذاب؛ کاربر ابتدا شماره موبایل خود را وارد می‌کند، سپس گردونه می‌چرخد و بلافاصله کد هدیه یا پیامک برای او ارسال می‌شود.',
      },
      icon: Trophy,
      setupDays: 4,
      highlightKpi: { en: '85%+ Lead Opt-in', fa: 'ثبت شماره تماس بیش از ۸۵٪' },
      category: 'gamification',
    },
    {
      id: 'live-leaderboard',
      title: {
        en: 'Apex Competitive Live Leaderboard',
        fa: 'مسابقات رکوردی با تابلوی امتیازات زنده (لیدربورد)',
      },
      badge: { en: 'High Retention', fa: 'ایجاد رقابت و هیجان' },
      desc: {
        en: 'High-energy 45-second challenges with live rankings broadcast across the booth LED wall, driving repeated visitor returns.',
        fa: 'مسابقات کوتاه و پرهیجان ۴۵ ثانیه‌ای؛ رکوردهای برتر به صورت زنده روی نمایشگر بزرگ غرفه نمایش داده می‌شوند و افراد را برای ثبت رکورد بهتر ترغیب می‌کنند.',
      },
      icon: Zap,
      setupDays: 5,
      highlightKpi: { en: 'Competitive Rush', fa: 'ایجاد صف و رقابت' },
      category: 'gamification',
    },
    {
      id: 'brand-trivia',
      title: {
        en: 'Interactive Multi-Touch Brand Trivia',
        fa: 'مسابقه و کوییز اطلاعاتی روی مانیتور لمسی',
      },
      badge: { en: 'Education & USP', fa: 'معرفی خدمات و محصولات' },
      desc: {
        en: 'Engaging touchscreen quiz mechanics that educate visitors on key product advantages and value propositions.',
        fa: 'یک بازی جذاب چندگزینه‌ای روی مانیتور لمسی؛ مزایا و خدمات شرکت شما را به شکلی سرگرم‌کننده به بازدیدکنندگان معرفی می‌کند.',
      },
      icon: HelpCircle,
      setupDays: 3,
      highlightKpi: { en: 'High Brand Recall', fa: 'ماندگاری پیام برند در ذهن' },
      category: 'kiosk',
    },
    {
      id: 'webar-portal',
      title: {
        en: 'Zero-Install WebAR 3D Product Portal',
        fa: 'واقعیت افزوده وب بدون نیاز به نصب برنامه (WebAR)',
      },
      badge: { en: 'Viral Mobile Share', fa: 'مشاهده سه‌بعدی روی گوشی' },
      desc: {
        en: 'Instant 3D product view launched via QR scan directly in Safari and Chrome with PBR lighting and real-world scale.',
        fa: 'مشتری تنها با اسکن یک QR کد با دوربین گوشی، مدل سه‌بعدی محصولات شما را با ابعاد واقعی در محیط خانه یا نمایشگاه مشاهده می‌کند.',
      },
      icon: QrCode,
      setupDays: 4,
      highlightKpi: { en: 'Zero Friction', fa: 'اجرای سریع بدون نصب برنامه' },
      category: 'spatial',
    },
    {
      id: 'vr-quest-station',
      title: {
        en: 'Standalone VR Rig (Meta Quest 3)',
        fa: 'ایستگاه واقعیت مجازی با هدست مستقل (Meta Quest 3)',
      },
      badge: { en: 'Ultimate Immersion', fa: 'تجربه عمیق و هیجان‌انگیز' },
      desc: {
        en: 'High-fidelity standalone virtual walkthroughs or hazardous factory drills with zero cables and dedicated spectator casting screens.',
        fa: 'تورهای مجازی و شبیه‌سازی‌های آموزشی با هدست‌های بی‌سیم، به همراه پخش زنده تصویر عینک روی تلویزیون برای تماشای سایر حاضرین.',
      },
      icon: Glasses,
      setupDays: 6,
      highlightKpi: { en: '100% Wow Factor', fa: 'جذابیت فوق‌العاده برای مخاطب' },
      category: 'spatial',
    },
  ];

  // Default selection: motion-arena & fortune-wheel
  const [selectedIds, setSelectedIds] = useState<string[]>(['motion-arena', 'fortune-wheel']);

  const toggleModule = (id: string) => {
    playClick();
    setSelectedIds((prev) =>
      prev.includes(id) ? (prev.length > 1 ? prev.filter((item) => item !== id) : prev) : [...prev, id]
    );
  };

  const handleReset = () => {
    playClick();
    setSelectedIds(['motion-arena', 'fortune-wheel']);
  };

  // Metrics computation
  const selectedModules = MODULES.filter((m) => selectedIds.includes(m.id));
  const estimatedDays = Math.max(...selectedModules.map((m) => m.setupDays), 5) + 3;

  return (
    <section className="space-y-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider text-cyan-300 bg-cyan-950/60 border border-cyan-400/40">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>{isRtl ? 'پکیج‌ساز هوشمند غرفه نمایشگاهی' : 'Interactive Exhibition Tech Builder'}</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            {isRtl
              ? 'انتخاب و ساخت پکیج فناوری غرفه شما'
              : 'Build Your Custom Exhibition Tech Activation'}
          </h2>
          <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
            {isRtl
              ? 'امکانات موردنیاز غرفه خود را انتخاب کنید؛ زمان آماده‌سازی و نحوه جذب بازدیدکنندگان به صورت خودکار محاسبه می‌شود.'
              : 'Select the interactive components for your exhibition stand. Review estimated turnaround, lead mechanics, and submit a tailored brief in one click.'}
          </p>
        </div>

        <button
          onClick={handleReset}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono text-neutral-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] transition-colors self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{isRtl ? 'بازنشانی انتخاب‌ها' : 'Reset Modules'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Module Selection Grid (Left 8 Cols) */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {MODULES.map((mod) => {
            const Icon = mod.icon;
            const isSelected = selectedIds.includes(mod.id);

            return (
              <div
                key={mod.id}
                onClick={() => toggleModule(mod.id)}
                onMouseEnter={playHover}
                className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 border flex flex-col justify-between select-none relative overflow-hidden group ${
                  isSelected
                    ? 'bg-[#101726] border-cyan-400/70 shadow-[0_0_25px_rgba(0,242,254,0.15)] ring-1 ring-cyan-400/50'
                    : 'bg-[#0B0D13] border-white/[0.08] hover:border-white/[0.2] hover:bg-[#0E1118]'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div
                      className={`p-2.5 rounded-xl border transition-colors ${
                        isSelected
                          ? 'bg-cyan-500/20 border-cyan-400/50 text-cyan-300'
                          : 'bg-white/[0.04] border-white/[0.08] text-neutral-400 group-hover:text-white'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white/[0.05] border border-white/[0.08] text-neutral-300">
                        {mod.badge[locale]}
                      </span>
                      <div
                        className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${
                          isSelected
                            ? 'bg-cyan-400 text-black shadow-glow-cyan'
                            : 'bg-white/[0.06] border border-white/[0.1] text-neutral-400 group-hover:text-white'
                        }`}
                      >
                        {isSelected ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Plus className="w-3.5 h-3.5" />}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="font-display font-bold text-base text-white group-hover:text-cyan-300 transition-colors">
                      {mod.title[locale]}
                    </h3>
                    <p className="text-xs text-neutral-400 font-light leading-relaxed">
                      {mod.desc[locale]}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono">
                  <span className="text-neutral-400">
                    {isRtl ? 'شاخص عملکرد:' : 'Core KPI:'}
                  </span>
                  <span className="text-brand-orange font-bold">
                    {mod.highlightKpi[locale]}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dynamic Package Summary Panel (Right 4 Cols) */}
        <div className="lg:col-span-4 sticky top-28">
          <SpotlightCard className="p-7 rounded-3xl border-cyan-500/40 bg-gradient-to-b from-[#0E1422] to-[#080B12] shadow-2xl space-y-6">
            <div className="space-y-2 pb-5 border-b border-white/[0.08]">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-400">
                // {isRtl ? 'خلاصه پکیج غرفه' : 'Booth Architecture Summary'}
              </span>
              <h3 className="font-display font-extrabold text-2xl text-white">
                {isRtl ? 'پکیج اختصاصی غرفه شما' : 'Your Configured Package'}
              </h3>
              <p className="text-xs text-neutral-300 font-light">
                {isRtl
                  ? `${selectedIds.length} قابلیت برای غرفه شما انتخاب شده است.`
                  : `${selectedIds.length} interactive modules selected for on-site activation.`}
              </p>
            </div>

            {/* Selected Modules List */}
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-wider block">
                {isRtl ? 'امکانات انتخاب‌شده:' : 'Active Modules:'}
              </span>
              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                {selectedModules.map((m) => (
                  <div
                    key={m.id}
                    className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.06] text-xs text-neutral-200"
                  >
                    <span className="truncate max-w-[200px]">{m.title[locale]}</span>
                    <span className="text-[10px] font-mono text-cyan-400 shrink-0 font-bold">
                      ✓
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Calculated Metrics */}
            <div className="p-4 rounded-2xl bg-[#090D17] border border-white/[0.08] space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between text-neutral-300">
                <span className="flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-brand-orange" />
                  <span>{isRtl ? 'مدت زمان آماده‌سازی و نصب:' : 'Estimated Turnaround:'}</span>
                </span>
                <span className="font-bold text-white">
                  {estimatedDays} {isRtl ? 'روز کاری' : 'Business Days'}
                </span>
              </div>

              <div className="flex items-center justify-between text-neutral-300">
                <span className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{isRtl ? 'دریافت شماره تماس بازدیدکنندگان:' : 'Lead Capture System:'}</span>
                </span>
                <span className="font-bold text-emerald-400">
                  {isRtl ? 'اتصال خودکار به پیامک و CRM' : 'Automated (SMS/CRM)'}
                </span>
              </div>

              <div className="flex items-center justify-between text-neutral-300">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                  <span>{isRtl ? 'پایداری در سالن نمایشگاه:' : 'On-Site Reliability:'}</span>
                </span>
                <span className="font-bold text-purple-300">
                  {isRtl ? '۱۰۰٪ آفلاین (بدون نیاز به اینترنت)' : '100% Offline Cache'}
                </span>
              </div>
            </div>

            {/* Action CTA */}
            <div className="space-y-3 pt-2">
              <Link
                href={`/${locale}/start-project?package=${selectedIds.join(',')}`}
                onClick={playClick}
                onMouseEnter={playHover}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold text-sm text-black bg-cyan-300 hover:bg-cyan-200 transition-all shadow-[0_0_25px_rgba(0,242,254,0.35)] group hover:scale-[1.02] active:scale-95"
              >
                <Send className="w-4 h-4 text-black" />
                <span>{isRtl ? 'دریافت پیش‌فاکتور و مشاوره این پکیج' : 'Submit Configured Brief'}</span>
                <DirectionAwareArrow type="up-right" className="w-4 h-4" />
              </Link>

              <p className="text-[10px] text-neutral-400 text-center font-light leading-relaxed">
                {isRtl
                  ? 'تیم MIGO ظرف ۲۴ ساعت پیش‌فاکتور، زمان‌بندی دقیق و مشاوره را در اختیارتان قرار می‌دهد.'
                  : 'MIGO technical leads will review your configured modules and schedule a discovery call within 24 hours.'}
              </p>
            </div>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
}
