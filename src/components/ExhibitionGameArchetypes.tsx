'use client';

import React from 'react';
import Link from 'next/link';
import {
  Gamepad2,
  Trophy,
  Zap,
  HelpCircle,
  TrendingUp,
  Users,
  ShieldCheck,
  Wrench,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { useDirection } from './direction/DirectionProvider';
import { SpotlightCard } from './SpotlightCard';
import { DirectionAwareArrow } from './direction/DirectionAwareArrow';
import { useAudio } from './AudioController';

export function ExhibitionGameArchetypes() {
  const { locale, isRtl } = useDirection();
  const { playClick, playHover } = useAudio();

  const archetypes = [
    {
      id: 'motion-arena',
      num: '01',
      title: {
        en: 'Touchless Motion Arena',
        fa: 'میدان حرکتی بدون لمس (Motion Arena)',
      },
      tag: { en: 'LiDAR & Depth Sensor', fa: 'سنسورهای لایدار و عمق‌سنج' },
      desc: {
        en: 'Players control dynamic 3D games through full-body motion and hand gestures in front of massive LED video walls. Creates an immediate crowd gathering effect in exhibition corridors.',
        fa: 'بازدیدکنندگان با حرکات دست و بدن در برابر دیوارهای عظیم LED بازی می‌کنند. هیجان تماشای حرکات بازیکنان، جمعیت انبوهی از رهگذران سالن را دور غرفه شما جمع می‌کند.',
      },
      features: {
        en: ['Zero touch hygiene friction', 'Multi-user concurrent tracking', 'Customized 3D brand assets'],
        fa: ['عدم نیاز به لمس فیزیکی صفحه', 'ردیابی هم‌زمان چند کاربر', 'طراحی کاراکتر و اشیای سه‌بعدی طبق برند'],
      },
      icon: Gamepad2,
      accentColor: 'text-brand-orange',
    },
    {
      id: 'fortune-wheel',
      num: '02',
      title: {
        en: '3D Fortune Matrix & Lucky Wheel',
        fa: 'گردونه شانس ۳ بعدی و جوایز هوشمند',
      },
      tag: { en: 'CRM & Instant SMS', fa: 'اتصال به CRM و پیامک آنی' },
      desc: {
        en: 'A photorealistic WebGL physics wheel where spinning is gated by entering verified mobile contact info. Winning codes or discount vouchers are dispatched automatically via SMS.',
        fa: 'گردونه سه‌بعدی با فیزیک واقع‌گرایانه چرخش و نور؛ کاربر پس از ثبت شماره موبایل گردونه را می‌چرخاند و کد هدیه یا کوپن تخفیف بلافاصله برای او پیامک می‌شود.',
      },
      features: {
        en: ['Verified mobile number gate', 'Instant SMS reward dispatch', 'Live backend analytics'],
        fa: ['اعتبارسنجی شماره تماس کاربر', 'ارسال آنی پیامک حاوی کد جایزه', 'پنل گزارش‌گیری زنده لیدها'],
      },
      icon: Trophy,
      accentColor: 'text-cyan-400',
    },
    {
      id: 'apex-leaderboard',
      num: '03',
      title: {
        en: 'Apex Competitive Live Leaderboard',
        fa: 'چالش رکوردی زنده و تابلوی مسابقات',
      },
      tag: { en: 'High Crowd Energy', fa: 'هیجان و رقابت جمعی' },
      desc: {
        en: 'Short, addictive 45-second branded arcade challenges. Scores are instantly ranked on large booth displays, turning passive attendees into fierce brand competitors.',
        fa: 'بازی‌های چالشی ۴۵ ثانیه‌ای فوق‌العاده اعتیادآور؛ رکوردهای برتر در لحظه روی نمایشگر غرفه ثبت و رتبه‌بندی شده و حس رقابت شدیدی بین مدیران و مخاطبان ایجاد می‌کند.',
      },
      features: {
        en: ['Instant high-score broadcast', 'Daily reward prize rounds', 'QR code rank retrieval'],
        fa: ['نمایش زنده جدول برترین‌ها روی وال', 'مسابقات رکوردی با جوایز روزانه', 'اسکن QR کد جهت مشاهده رتبه آنلاین'],
      },
      icon: Zap,
      accentColor: 'text-purple-400',
    },
    {
      id: 'brand-trivia',
      num: '04',
      title: {
        en: 'Interactive Multi-Touch Brand Trivia',
        fa: 'کوییز و چالش اطلاعاتی برند',
      },
      tag: { en: 'Product USP Education', fa: 'آموزش مزایای رقابتی محصول' },
      desc: {
        en: 'Gamified interactive quiz stations where attendees answer rapid-fire questions about your enterprise services in exchange for points and exclusive corporate gifts.',
        fa: 'ایستگاه‌های کوئیز لمسی جذاب که نکات کلیدی و خدمات استراتژیک شرکت شما را در قالب سوالات سریع و هیجان‌انگیز به مخاطب منتقل می‌کنند.',
      },
      features: {
        en: ['Interactive branching questions', 'Dynamic visual scoring', 'Seamless contact collection'],
        fa: ['سناریوهای چندشاخه هوشمند', 'امتیازدهی گرافیکی جذاب', 'دریافت مشخصات سازمانی مخاطب'],
      },
      icon: HelpCircle,
      accentColor: 'text-emerald-400',
    },
  ];

  const businessKpis = [
    {
      value: '4x',
      title: { en: 'Longer Booth Dwell Time', fa: 'افزایش زمان ماندگاری در غرفه' },
      desc: {
        en: 'Average visitor attention surges from 25 seconds at static booths to 3.5+ minutes with interactive gameplay.',
        fa: 'میانگین زمان توقف بازدیدکننده از ۲۵ ثانیه در غرفه‌های سنتی به بیش از ۳.۵ دقیقه در غرفه تعاملی می‌رسد.',
      },
      icon: TrendingUp,
      color: 'text-brand-orange',
    },
    {
      value: '+300%',
      title: { en: 'More Qualified Lead Capture', fa: 'ثبت لید تجاری معتبر' },
      desc: {
        en: 'Attendees willingly submit verified work phone numbers and company emails to compete and claim rewards.',
        fa: 'مخاطبان با اشتیاق کامل مشخصات کاری و شماره موبایل خود را در ازای ورود به مسابقه و دریافت جایزه ثبت می‌کنند.',
      },
      icon: Users,
      color: 'text-cyan-400',
    },
    {
      value: '100%',
      title: { en: 'Offline Venue Resilience', fa: 'عملکرد ۱۰۰٪ مستقل از اینترنت' },
      desc: {
        en: 'Engineered with local caching failovers: games, scoreboards, and touch sensors run flawlessly without venue Wi-Fi.',
        fa: 'تمامی بازی‌ها و لیدربوردها به صورت لوکال اجرا می‌شوند و قطعی اینترنت نمایشگاه تاثیری در اجرای روان بازی ندارد.',
      },
      icon: ShieldCheck,
      color: 'text-purple-400',
    },
    {
      value: 'Turnkey',
      title: { en: 'Autonomous Hardware Delivery', fa: 'اجرای صفر تا صد سخت‌افزار' },
      desc: {
        en: 'MIGO provides complete turnkey execution: hardware provisioning, mounting, sensor tuning, and on-site expo standby.',
        fa: 'تامین تجهیزات، کالیبراسیون سنسورها، نصب در محل و حضور کارشناس پشتیبان در تمام ساعات نمایشگاه بر عهده تیم ماست.',
      },
      icon: Wrench,
      color: 'text-emerald-400',
    },
  ];

  return (
    <section className="space-y-16">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider text-brand-orange bg-brand-orange/10 border border-brand-orange/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isRtl ? 'موتورهای بازی نمایشگاهی آماده' : 'Pre-Engineered Exhibition Game Engines'}</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            {isRtl
              ? 'چهار فرمت پرطرفدار بازی‌های تعاملی غرفه'
              : 'Four Proven Game Archetypes That Transform Booths'}
          </h2>
          <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
            {isRtl
              ? 'نیازی به طراحی از صفر نیست؛ استودیو MIGO موتورهای بازی آماده و آزمایش‌شده‌ای در اختیار دارد که در کمتر از ۲ هفته با هویت بصری، کاراکترهای سه‌بعدی و جوایز برند شما سفارشی‌سازی می‌شوند.'
              : 'No need to reinvent the wheel. MIGO operates pre-built, battle-tested game engines tailored with your brand guidelines and 3D character assets in under two weeks.'}
          </p>
        </div>

        <Link
          href={`/${locale}/start-project?service=interactive-experiences`}
          onClick={playClick}
          onMouseEnter={playHover}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-brand-orange hover:bg-brand-orange-hover shadow-glow-orange transition-all self-start sm:self-auto shrink-0"
        >
          <span>{isRtl ? 'سفارش بازی برای غرفه شما' : 'Deploy a Booth Game'}</span>
          <DirectionAwareArrow type="up-right" className="w-4 h-4" />
        </Link>
      </div>

      {/* 2. Four Game Archetypes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {archetypes.map((arch) => {
          const Icon = arch.icon;

          return (
            <SpotlightCard
              key={arch.id}
              className="p-8 rounded-3xl border-white/[0.08] hover:border-white/[0.18] bg-gradient-to-b from-[#0F131C] to-[#090B10] flex flex-col justify-between space-y-6"
            >
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-2xl bg-white/[0.04] border border-white/[0.08] ${arch.accentColor}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="font-mono text-xs text-neutral-400 block">
                        // ARCHETYPE {arch.num}
                      </span>
                      <span className="text-xs font-mono font-bold text-neutral-300">
                        {arch.tag[locale]}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-display font-bold text-2xl text-white">
                    {arch.title[locale]}
                  </h3>
                  <p className="text-sm text-neutral-300 font-light leading-relaxed">
                    {arch.desc[locale]}
                  </p>
                </div>

                <div className="pt-2 space-y-2 border-t border-white/[0.06]">
                  {arch.features[locale].map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-neutral-300 font-light">
                      <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${arch.accentColor}`} />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </SpotlightCard>
          );
        })}
      </div>

      {/* 3. Business ROI Cards */}
      <div className="pt-6 space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-mono font-bold text-brand-orange uppercase tracking-wider">
            // {isRtl ? 'مزایای بازگشت سرمایه (ROI)' : 'The Business Case for Gamification'}
          </span>
          <h3 className="font-display font-bold text-2xl text-white">
            {isRtl
              ? 'چرا برندهای پیشرو برای غرفه نمایشگاهی بازی تعاملی می‌سازند؟'
              : 'Why Leading Enterprises Invest in Exhibition Gamification'}
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {businessKpis.map((kpi, idx) => {
            const KpiIcon = kpi.icon;

            return (
              <SpotlightCard
                key={idx}
                className="p-6 rounded-2xl bg-[#090C12] border-white/[0.08] flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`text-3xl sm:text-4xl font-extrabold font-mono ${kpi.color}`}>
                      {kpi.value}
                    </span>
                    <div className="p-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-neutral-400">
                      <KpiIcon className="w-5 h-5" />
                    </div>
                  </div>

                  <h4 className="font-display font-bold text-base text-white">
                    {kpi.title[locale]}
                  </h4>
                  <p className="text-xs text-neutral-400 font-light leading-relaxed">
                    {kpi.desc[locale]}
                  </p>
                </div>
              </SpotlightCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
